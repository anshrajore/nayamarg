import { VoiceProvider, NormalizedCallEvent } from "@nayamarg/providers";

export interface UncertainAttempt {
  attemptId: string;
  providerAttemptId?: string;
  campaignId: string;
  createdAt: Date;
  status: "UNKNOWN" | "DISPATCHING";
}

/**
 * Reconciliation Engine (Section 5.6 & 15.1)
 * Resolves uncertain call outcomes without repeating side effects
 */
export class AttemptReconciler {
  constructor(private readonly voiceProvider: VoiceProvider) {}

  async reconcileUncertainAttempt(attempt: UncertainAttempt): Promise<{
    resolved: boolean;
    finalEvent?: NormalizedCallEvent;
    action: "UPDATE_STATE" | "ABANDON_SAFE" | "WAIT_PROVIDER";
  }> {
    if (!attempt.providerAttemptId) {
      // Never reached provider or network timeout prior to attempt_id generation
      const ageMinutes = (Date.now() - attempt.createdAt.getTime()) / 60000;
      if (ageMinutes > 5) {
        return {
          resolved: true,
          action: "ABANDON_SAFE",
        };
      }
      return { resolved: false, action: "WAIT_PROVIDER" };
    }

    try {
      const status = await this.voiceProvider.getCallStatus(attempt.providerAttemptId);
      return {
        resolved: true,
        finalEvent: status,
        action: "UPDATE_STATE",
      };
    } catch (err) {
      return {
        resolved: false,
        action: "WAIT_PROVIDER",
      };
    }
  }
}
