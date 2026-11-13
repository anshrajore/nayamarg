import {
  JobIntelligenceService,
  JobRequirementSnapshot,
  VacancySlotModel,
} from "./job-intelligence/job-intelligence.service";
import {
  SpatialMatcherService,
  CandidateProfile,
} from "./candidate-discovery/spatial-matcher.service";
import { RankingService, RankedCandidate } from "./candidate-ranking/ranking.service";
import {
  ContactEligibilityService,
  CandidateContactHistory,
} from "./contact-eligibility/eligibility.service";
import {
  CampaignManagerService,
  RecruitmentCampaign,
} from "./campaign-manager/campaign.service";
import {
  SequentialDialerService,
  QueuedCall,
} from "./call-scheduler/sequential-dialer.service";
import { VoiceAgentService, InitiatedCallSession } from "./voice-adapter/voice-agent.service";
import {
  ResponseParserService,
  ParsedVoiceResponse,
} from "./response-intelligence/response-parser.service";
import {
  CandidateStateService,
  CandidateApplicationRecord,
} from "./candidate-state/candidate-state.service";
import {
  VacancySlotManagerService,
  VacancyCapacityStatus,
} from "./vacancy-manager/vacancy-slot-manager.service";
import { FollowUpService, FollowUpRecord } from "./follow-up/follow-up.service";
import {
  EmployerReportService,
  EmployerRecruitmentReport,
  QualifiedCandidateReportItem,
} from "./reporting/employer-report.service";
import { ReconciliationService } from "./reconciliation/reconciliation.service";
import { PipelineCounts } from "@nayamarg/domain";

export interface OrchestratorState {
  jobSnapshot: JobRequirementSnapshot;
  slots: VacancySlotModel[];
  campaign: RecruitmentCampaign;
  applications: Map<string, CandidateApplicationRecord>;
  qualifiedCandidates: QualifiedCandidateReportItem[];
  pipelineCounts: PipelineCounts;
  capacityStatus: VacancyCapacityStatus;
}

export class AutonomousRecruitmentOrchestrator {
  public jobIntelligence: JobIntelligenceService;
  public spatialMatcher: SpatialMatcherService;
  public ranking: RankingService;
  public eligibility: ContactEligibilityService;
  public campaignManager: CampaignManagerService;
  public dialer: SequentialDialerService;
  public voiceAgent: VoiceAgentService;
  public responseParser: ResponseParserService;
  public candidateState: CandidateStateService;
  public slotManager: VacancySlotManagerService;
  public followUp: FollowUpService;
  public reporting: EmployerReportService;
  public reconciliation: ReconciliationService;

  // Active state storage
  private state: OrchestratorState | null = null;
  private candidatePool: CandidateProfile[] = [];
  private contactHistories: Map<string, CandidateContactHistory> = new Map();
  private suppressions: Set<string> = new Set();

  constructor() {
    this.jobIntelligence = new JobIntelligenceService();
    this.spatialMatcher = new SpatialMatcherService();
    this.ranking = new RankingService();
    this.eligibility = new ContactEligibilityService();
    this.campaignManager = new CampaignManagerService();
    this.dialer = new SequentialDialerService();
    this.voiceAgent = new VoiceAgentService();
    this.responseParser = new ResponseParserService();
    this.candidateState = new CandidateStateService();
    this.slotManager = new VacancySlotManagerService();
    this.followUp = new FollowUpService();
    this.reporting = new EmployerReportService();
    this.reconciliation = new ReconciliationService(this.dialer, this.slotManager);
  }

  /**
   * 1. Ingests employer hiring request and initializes discrete vacancy accounting slots.
   */
  public publishJobAndInitialize(hiringRequestId: string, rawInput: unknown): OrchestratorState {
    const { snapshot, slots } = this.jobIntelligence.validateAndSnapshot(hiringRequestId, rawInput);
    const campaign = this.campaignManager.createCampaign(hiringRequestId, snapshot.vacanciesCount);
    this.slotManager.initializeSlots(hiringRequestId, slots);

    const initialCounts: PipelineCounts = {
      interested: 0,
      shortlisted: 0,
      interviewed: 0,
      offered: 0,
    };

    const capacityStatus = this.slotManager.evaluateCapacity(hiringRequestId, initialCounts);

    this.state = {
      jobSnapshot: snapshot,
      slots,
      campaign,
      applications: new Map(),
      qualifiedCandidates: [],
      pipelineCounts: initialCounts,
      capacityStatus,
    };

    return this.state;
  }

  /**
   * 2. Sets up candidate pool and evaluates contact histories.
   */
  public registerCandidatePool(
    candidates: CandidateProfile[],
    histories?: Record<string, CandidateContactHistory>
  ): void {
    this.candidatePool = candidates;
    if (histories) {
      for (const [id, history] of Object.entries(histories)) {
        this.contactHistories.set(id, history);
      }
    }
  }

  /**
   * 3. Discovers matching workers within geospatial radius, filters eligibility, and ranks them.
   */
  public discoverAndRank(currentTime: Date = new Date()): RankedCandidate[] {
    if (!this.state) {
      throw new Error("No active job publication found. Call publishJobAndInitialize first.");
    }

    // Step A: PostGIS Geodesic Radius Search (e.g. 25km of Nashik)
    const discovered = this.spatialMatcher.discoverWithinRadius(
      this.candidatePool,
      this.state.jobSnapshot.location.coordinates,
      this.state.jobSnapshot.location.radiusKm,
      100 // Discover batch
    );

    this.state.campaign.totalDiscovered = discovered.length;

    // Step B: Pre-flight Telecom & Consent Eligibility Gate
    const eligibleMatches = discovered.filter((item) => {
      if (this.suppressions.has(item.candidate.phoneNumber)) {
        return false;
      }

      const history = this.contactHistories.get(item.candidate.id) || {
        candidateId: item.candidate.id,
        phoneNumber: item.candidate.phoneNumber,
        hasValidConsent: true,
        isSuppressed: false,
        totalAttempts: 0,
      };

      const evalResult = this.eligibility.evaluate(history, currentTime);
      return evalResult.eligible;
    });

    this.state.campaign.totalEligible = eligibleMatches.length;

    // Step C: nayamarg-match-v1 multi-factor scoring & ranking
    const ranked = this.ranking.rankCandidates(eligibleMatches, this.state.jobSnapshot);

    // Step D: Initialize sequential queue and start campaign
    this.dialer.initializeQueue(this.state.campaign.id, ranked);
    this.state.campaign = this.campaignManager.startCampaign(this.state.campaign);

    // Initialize application state for all discovered candidates
    for (const r of ranked) {
      const app = this.candidateState.createApplication(
        this.state.jobSnapshot.hiringRequestId,
        r.candidate.id
      );
      this.state.applications.set(r.candidate.id, app);
    }

    return ranked;
  }

  /**
   * 4. Sequential dialer trigger: acquires lease (c=1) and initiates Sarvam AI call.
   */
  public async stepOutreach(
    workerId: string = "worker-primary-1",
    currentTime: Date = new Date()
  ): Promise<{ call: QueuedCall; session: InitiatedCallSession } | null> {
    if (!this.state || this.state.campaign.status !== "RUNNING") {
      return null;
    }

    // Check if pipeline is already saturated
    if (this.state.capacityStatus.isPipelineSaturated) {
      this.state.campaign = this.campaignManager.markPipelineReady(this.state.campaign);
      return null;
    }

    // Acquire exclusive sequential calling lease (c = 1)
    const acquired = this.dialer.acquireNextCall(this.state.campaign.id, workerId, 180, currentTime);
    if (!acquired) {
      return null;
    }

    const { call } = acquired;

    // Transition application status: MATCHED -> CONTACT_PENDING -> CONTACTED
    let app = this.state.applications.get(call.candidate.id);
    if (app) {
      app = this.candidateState.transition(app, "CONTACT_PENDING", "Dialer lease acquired");
      app = this.candidateState.transition(app, "CONTACTED", "Sarvam Voice agent ringing");
      this.state.applications.set(call.candidate.id, app);
    }

    // Update campaign metrics
    this.state.campaign.totalDialed += 1;

    // Trigger Sarvam Outbound Voice Agent
    const session = await this.voiceAgent.triggerOutboundCall(
      call.candidate,
      this.state.jobSnapshot,
      this.state.campaign.id
    );

    return { call, session };
  }

  /**
   * 5. Webhook processor: handles call completion, parses response, updates state machine & pipeline.
   */
  public handleCallWebhook(
    queueId: string,
    fencingToken: number,
    rawPayload: {
      callStatus: "COMPLETED" | "NO_ANSWER" | "BUSY" | "FAILED";
      durationSeconds: number;
      structuredResult?: unknown;
      transcript?: string;
      confidence?: number;
    }
  ): ParsedVoiceResponse {
    if (!this.state) {
      throw new Error("No active orchestrator state");
    }

    const campaignId = this.state.campaign.id;
    const queue = this.dialer.getQueue(campaignId);
    const call = queue.find((c) => c.queueId === queueId);

    if (!call) {
      throw new Error(`Queue item ${queueId} not found`);
    }

    // 1. Release sequential calling lease
    this.dialer.completeCall(
      campaignId,
      queueId,
      fencingToken,
      rawPayload.callStatus === "COMPLETED" ? "COMPLETED" : "FAILED"
    );

    // 2. Parse and validate structured output
    const parsed = this.responseParser.parseCallCompletion(
      queueId,
      call.candidate.id,
      rawPayload
    );

    // 3. Update candidate contact history
    const history = this.contactHistories.get(call.candidate.id) || {
      candidateId: call.candidate.id,
      phoneNumber: call.candidate.phoneNumber,
      hasValidConsent: true,
      isSuppressed: false,
      totalAttempts: 0,
    };
    history.totalAttempts += 1;
    history.lastContactedAt = new Date();
    this.contactHistories.set(call.candidate.id, history);

    // 4. Update campaign answered counters
    if (rawPayload.callStatus === "COMPLETED") {
      this.state.campaign.totalAnswered += 1;
    }

    // 5. Branch decision outcome
    let app = this.state.applications.get(call.candidate.id);

    switch (parsed.decision) {
      case "INTERESTED": {
        this.state.campaign.totalInterested += 1;
        if (app) {
          app = this.candidateState.transition(app, "INTERESTED", "Candidate expressed interest in call");
          app = this.candidateState.transition(app, "QUALIFIED", "Voice qualification criteria confirmed");
          app.qualificationConfirmed = true;
          this.state.applications.set(call.candidate.id, app);
        }

        // Add to qualified candidates report list
        this.state.qualifiedCandidates.push({
          candidateId: call.candidate.id,
          name: call.candidate.name,
          matchScore: call.score,
          distanceKm: call.distanceKm,
          experienceMonths: call.candidate.experienceMonths,
          expectedSalary: parsed.structuredData?.salary_expectation_min || call.candidate.expectedSalary,
          shiftPreference: call.candidate.shiftPreference,
          availableInDays: call.candidate.availableFromDays,
          callNotes: parsed.structuredData?.refusal_reason || undefined,
          contactedAt: new Date(),
        });

        // Increment pipeline count
        this.state.pipelineCounts.interested += 1;
        break;
      }

      case "SALARY_MISMATCH":
      case "NOT_INTERESTED": {
        this.state.campaign.totalDeclined += 1;
        if (app) {
          app = this.candidateState.transition(app, "NOT_INTERESTED", `Candidate declined: ${parsed.decision}`);
          app.declineReason = parsed.decision;
          this.state.applications.set(call.candidate.id, app);
        }
        break;
      }

      case "CALLBACK_REQUESTED": {
        this.state.campaign.totalCallbacksScheduled += 1;
        const cbDate = parsed.structuredData?.callback_time
          ? new Date(parsed.structuredData.callback_time)
          : new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours later fallback

        this.followUp.scheduleCallback(campaignId, call.candidate.id, cbDate);
        if (app) {
          app = this.candidateState.transition(app, "CALLBACK_REQUESTED", "Callback requested by candidate");
          this.state.applications.set(call.candidate.id, app);
        }
        break;
      }

      case "OPT_OUT": {
        this.suppressions.add(call.candidate.phoneNumber);
        if (app) {
          app = this.candidateState.transition(app, "SUPPRESSED", "Candidate requested opt-out");
          this.state.applications.set(call.candidate.id, app);
        }
        break;
      }

      case "NO_ANSWER":
      case "BUSY": {
        // Schedule bounded retry
        this.followUp.scheduleRetry(campaignId, call.candidate.id, call.attemptNumber);
        // Candidate remains in CONTACTED / pending retry
        break;
      }

      case "FAILED":
      default: {
        break;
      }
    }

    // 6. Recalculate vacancy capacity & check stopping conditions
    this.state.capacityStatus = this.slotManager.evaluateCapacity(
      this.state.jobSnapshot.hiringRequestId,
      this.state.pipelineCounts
    );

    if (this.state.capacityStatus.isPipelineSaturated) {
      this.state.campaign = this.campaignManager.markPipelineReady(this.state.campaign);
    }

    return parsed;
  }

  /**
   * 6. Offer step: reserves a discrete vacancy slot.
   */
  public reserveSlotForOffer(candidateId: string): VacancySlotModel | null {
    if (!this.state) return null;
    const reserved = this.slotManager.reserveSlot(
      this.state.jobSnapshot.hiringRequestId,
      candidateId,
      48 // 48-hour reservation lease
    );

    if (reserved) {
      this.state.pipelineCounts.offered += 1;
      this.state.capacityStatus = this.slotManager.evaluateCapacity(
        this.state.jobSnapshot.hiringRequestId,
        this.state.pipelineCounts
      );
      let app = this.state.applications.get(candidateId);
      if (app) {
        if (app.status === "QUALIFIED") {
          app = this.candidateState.transition(app, "SHORTLISTED", "Candidate shortlisted for offer");
        }
        if (app.status === "SHORTLISTED") {
          app = this.candidateState.transition(app, "INTERVIEW_SCHEDULED", "Interview scheduled");
        }
        if (app.status === "INTERVIEW_SCHEDULED") {
          app = this.candidateState.transition(app, "INTERVIEWED", "Interview completed");
        }
        if (app.status === "INTERVIEWED") {
          app = this.candidateState.transition(app, "OFFER_MADE", "Job offer extended to candidate");
        }
        this.state.applications.set(candidateId, app);
      }
    }

    return reserved;
  }

  /**
   * 7. Joining step: locks vacancy slot to FILLED. If all slots filled, marks campaign COMPLETED.
   */
  public confirmCandidateJoining(candidateId: string): VacancySlotModel | null {
    if (!this.state) return null;
    const filledSlot = this.slotManager.confirmJoining(
      this.state.jobSnapshot.hiringRequestId,
      candidateId
    );

    if (filledSlot) {
      let app = this.state.applications.get(candidateId);
      if (app) {
        if (app.status === "OFFER_MADE") {
          app = this.candidateState.transition(app, "OFFER_ACCEPTED", "Candidate accepted offer");
        }
        if (app.status === "OFFER_ACCEPTED") {
          app = this.candidateState.transition(app, "JOINED", "Candidate joining confirmed and verified");
        }
        this.state.applications.set(candidateId, app);
      }

      this.state.slots = this.slotManager.getSlots(this.state.jobSnapshot.hiringRequestId);
      this.state.capacityStatus = this.slotManager.evaluateCapacity(
        this.state.jobSnapshot.hiringRequestId,
        this.state.pipelineCounts
      );
      const allFilled = this.state.slots.every((s) => s.status === "FILLED");
      if (allFilled) {
        this.state.campaign = this.campaignManager.completeCampaign(this.state.campaign);
      }
    }

    return filledSlot;
  }

  /**
   * 8. Generates comprehensive employer progress report.
   */
  public generateEmployerReport(): EmployerRecruitmentReport {
    if (!this.state) {
      throw new Error("No active orchestrator state");
    }

    return this.reporting.generateReport(
      this.state.jobSnapshot,
      this.state.campaign,
      this.state.capacityStatus,
      this.state.slots,
      this.state.qualifiedCandidates
    );
  }

  public getState(): OrchestratorState | null {
    return this.state;
  }
}
