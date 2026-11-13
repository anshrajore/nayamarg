import { SarvamVoiceAdapter, OutboundCallInput } from "@nayamarg/providers";
import { CandidateProfile } from "../candidate-discovery/spatial-matcher.service";
import { JobRequirementSnapshot } from "../job-intelligence/job-intelligence.service";

export interface InitiatedCallSession {
  sessionId: string;
  candidateId: string;
  phoneNumber: string;
  sarvamCallId: string;
  promptLanguage: string;
  contextVariables: Record<string, string | number>;
  dispatchedAt: Date;
}

export class VoiceAgentService {
  private adapter: SarvamVoiceAdapter;

  constructor(apiKey: string = process.env.SARVAM_API_KEY || "mock_sarvam_key") {
    this.adapter = new SarvamVoiceAdapter({
      apiKey,
      orgId: "org_nayamarg_prod",
      workspaceId: "ws_recruitment_v2",
      isMockMode: true,
    });
  }

  public prepareCallPayload(
    candidate: CandidateProfile,
    job: JobRequirementSnapshot,
    campaignId: string
  ): OutboundCallInput {
    const salaryFormatted = `₹${job.compensation.minMonthlySalary.toLocaleString("en-IN")} se ₹${job.compensation.maxMonthlySalary.toLocaleString("en-IN")}`;

    const contextVariables: Record<string, any> = {
      candidate_name: candidate.name,
      job_title: job.title,
      job_location: `${job.location.city}, ${job.location.state}`,
      salary_range: salaryFormatted,
      min_salary: job.compensation.minMonthlySalary,
      max_salary: job.compensation.maxMonthlySalary,
      shift_type: job.shiftDetails.shiftType,
      joining_days: job.shiftDetails.joiningTimelineDays,
      campaign_id: campaignId,
    };

    return {
      attemptId: `att_${Date.now()}_${candidate.id}`,
      phoneNumber: candidate.phoneNumber,
      agentId: "sarvam-nayamarg-recruiter-v2",
      agentVersion: 1,
      language: candidate.preferredLanguage === "mr" ? "mr-IN" : "hi-IN",
      contextVariables,
      webhookUrl: "https://api.nayamarg.in/api/v1/webhooks/voice/sarvam",
    };
  }

  public async triggerOutboundCall(
    candidate: CandidateProfile,
    job: JobRequirementSnapshot,
    campaignId: string
  ): Promise<InitiatedCallSession> {
    const payload = this.prepareCallPayload(candidate, job, campaignId);
    const callResult = await this.adapter.createOutboundCall(payload);

    return {
      sessionId: `sess_${Date.now()}_${candidate.id}`,
      candidateId: candidate.id,
      phoneNumber: candidate.phoneNumber,
      sarvamCallId: callResult.providerAttemptId,
      promptLanguage: payload.language,
      contextVariables: payload.contextVariables,
      dispatchedAt: new Date(),
    };
  }
}
