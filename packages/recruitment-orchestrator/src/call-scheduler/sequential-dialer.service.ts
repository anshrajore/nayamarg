import { RankedCandidate } from "../candidate-ranking/ranking.service";
import { CampaignLease } from "@nayamarg/workflow-engine";

export interface QueuedCall {
  queueId: string;
  campaignId: string;
  candidate: RankedCandidate["candidate"];
  rank: number;
  score: number;
  distanceKm: number;
  status: "QUEUED" | "DIALING" | "COMPLETED" | "SKIPPED" | "FAILED";
  attemptNumber: number;
  leaseExpiresAt?: Date;
  fencingToken?: number;
}

export class SequentialDialerService {
  private queue: Map<string, QueuedCall[]> = new Map(); // campaignId -> calls
  private activeLeases: Map<string, CampaignLease> = new Map(); // campaignId -> active lease
  private monotonicTokenCounter: number = 0;

  public initializeQueue(campaignId: string, rankedCandidates: RankedCandidate[]): void {
    const calls: QueuedCall[] = rankedCandidates.map((rc, idx) => ({
      queueId: `q_${campaignId}_${String(idx + 1).padStart(3, "0")}`,
      campaignId,
      candidate: rc.candidate,
      rank: rc.rank,
      score: rc.totalScore,
      distanceKm: rc.distanceKm,
      status: "QUEUED",
      attemptNumber: 0,
    }));
    this.queue.set(campaignId, calls);
  }

  /**
   * Acquires the exclusive dialer lease for a campaign with concurrency c = 1.
   * If a call is currently active and not expired, returns null.
   */
  public acquireNextCall(
    campaignId: string,
    workerId: string,
    leaseDurationSeconds: number = 180,
    currentTime: Date = new Date()
  ): { call: QueuedCall; lease: CampaignLease } | null {
    // 1. Verify if an active lease already exists
    const currentLease = this.activeLeases.get(campaignId);
    if (currentLease && currentLease.leaseExpiresAt > currentTime) {
      // Slot is occupied, enforce c = 1
      return null;
    }

    // 2. Find next QUEUED candidate
    const campaignQueue = this.queue.get(campaignId) || [];
    const nextCall = campaignQueue.find((c) => c.status === "QUEUED");
    if (!nextCall) {
      return null;
    }

    // 3. Issue lease and fencing token
    this.monotonicTokenCounter += 1;
    const fencingToken = this.monotonicTokenCounter;
    const leaseExpiresAt = new Date(currentTime.getTime() + leaseDurationSeconds * 1000);

    const lease: CampaignLease = {
      campaignId,
      leasedByWorkerId: workerId,
      activeCallAttemptId: nextCall.queueId,
      leaseExpiresAt,
      fencingToken,
    };

    nextCall.status = "DIALING";
    nextCall.attemptNumber += 1;
    nextCall.leaseExpiresAt = leaseExpiresAt;
    nextCall.fencingToken = fencingToken;

    this.activeLeases.set(campaignId, lease);

    return { call: nextCall, lease };
  }

  /**
   * Releases dialer lease upon call completion, unlocking the queue for the next candidate.
   */
  public completeCall(
    campaignId: string,
    queueId: string,
    fencingToken: number,
    finalStatus: "COMPLETED" | "FAILED" | "SKIPPED"
  ): boolean {
    const lease = this.activeLeases.get(campaignId);
    if (lease && lease.fencingToken !== fencingToken) {
      // Stale or split-brain worker lease reject
      return false;
    }

    const campaignQueue = this.queue.get(campaignId) || [];
    const call = campaignQueue.find((c) => c.queueId === queueId);
    if (call) {
      call.status = finalStatus;
    }

    // Release lease
    this.activeLeases.delete(campaignId);
    return true;
  }

  public getQueue(campaignId: string): QueuedCall[] {
    return this.queue.get(campaignId) || [];
  }

  public getActiveLease(campaignId: string): CampaignLease | undefined {
    return this.activeLeases.get(campaignId);
  }
}
