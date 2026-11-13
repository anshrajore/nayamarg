export interface FollowUpRecord {
  id: string;
  campaignId: string;
  candidateId: string;
  reason: "CALLBACK_REQUESTED" | "NO_ANSWER_RETRY" | "BUSY_RETRY";
  attemptNumber: number;
  scheduledFor: Date;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}

export class FollowUpService {
  private followUps: Map<string, FollowUpRecord[]> = new Map(); // campaignId -> records

  public scheduleCallback(
    campaignId: string,
    candidateId: string,
    callbackTime: Date
  ): FollowUpRecord {
    const record: FollowUpRecord = {
      id: `fup_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      campaignId,
      candidateId,
      reason: "CALLBACK_REQUESTED",
      attemptNumber: 1,
      scheduledFor: callbackTime,
      status: "PENDING",
      createdAt: new Date(),
    };

    const list = this.followUps.get(campaignId) || [];
    list.push(record);
    this.followUps.set(campaignId, list);

    return record;
  }

  public scheduleRetry(
    campaignId: string,
    candidateId: string,
    currentAttempt: number,
    retryReason: "NO_ANSWER_RETRY" | "BUSY_RETRY" = "NO_ANSWER_RETRY"
  ): FollowUpRecord | null {
    if (currentAttempt >= 3) {
      return null; // Max attempts reached
    }

    // Exponential backoff delay: attempt 1 -> 2 hours; attempt 2 -> 24 hours
    const delayHours = currentAttempt === 1 ? 2 : 24;
    const scheduledFor = new Date(Date.now() + delayHours * 60 * 60 * 1000);

    const record: FollowUpRecord = {
      id: `retry_${Date.now()}_${candidateId}`,
      campaignId,
      candidateId,
      reason: retryReason,
      attemptNumber: currentAttempt + 1,
      scheduledFor,
      status: "PENDING",
      createdAt: new Date(),
    };

    const list = this.followUps.get(campaignId) || [];
    list.push(record);
    this.followUps.set(campaignId, list);

    return record;
  }

  public getDueFollowUps(campaignId: string, currentTime: Date = new Date()): FollowUpRecord[] {
    const list = this.followUps.get(campaignId) || [];
    return list.filter((f) => f.status === "PENDING" && f.scheduledFor <= currentTime);
  }
}
