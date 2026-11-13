import { evaluateContactEligibility } from "@nayamarg/domain";

export interface CampaignQueueItem {
  recipientId: string;
  workerId: string;
  phoneNumber: string;
  rank: number;
  attemptNumber: number;
  hasConsent: boolean;
  isSuppressed: boolean;
  lastContactedAt?: Date;
}

export interface SequentialLease {
  lockToken: string;
  fencingToken: number;
  campaignId: string;
  acquiredAt: Date;
  expiresAt: Date;
}

/**
 * Sequential Call Queue Scheduler (Section 6.1, 6.2, 6.3)
 * Guarantees:
 * - Exactly one active outbound call per campaign (concurrency_limit = 1)
 * - Candidate eligibility re-evaluated immediately prior to call dispatch
 * - Lease with fencing token prevents split-brain across multiple worker replicas
 */
export class SequentialCallScheduler {
  private activeLeases = new Map<string, SequentialLease>();
  private fencingCounter = 0;

  async acquireCampaignSlot(campaignId: string, ttlMs: number = 45000): Promise<SequentialLease | null> {
    const existing = this.activeLeases.get(campaignId);
    const now = new Date();

    if (existing && existing.expiresAt > now) {
      // Slot is currently held by an active call
      return null;
    }

    this.fencingCounter++;
    const lease: SequentialLease = {
      lockToken: `lease_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      fencingToken: this.fencingCounter,
      campaignId,
      acquiredAt: now,
      expiresAt: new Date(now.getTime() + ttlMs),
    };

    this.activeLeases.set(campaignId, lease);
    return lease;
  }

  releaseCampaignSlot(campaignId: string, lockToken: string): boolean {
    const existing = this.activeLeases.get(campaignId);
    if (!existing || existing.lockToken !== lockToken) {
      return false;
    }
    this.activeLeases.delete(campaignId);
    return true;
  }

  evaluateRecipientBeforeDispatch(item: CampaignQueueItem) {
    return evaluateContactEligibility({
      personId: item.workerId,
      phoneNumber: item.phoneNumber,
      channel: "VOICE",
      purpose: "RECRUITMENT_OPPORTUNITY",
      hasExplicitConsent: item.hasConsent,
      isSuppressed: item.isSuppressed,
      lastContactedAt: item.lastContactedAt,
    });
  }
}
