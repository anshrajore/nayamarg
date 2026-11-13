import { evaluateContactEligibility, ContactEligibilityCheckInput } from "@nayamarg/domain";

export interface CandidateContactHistory {
  candidateId: string;
  phoneNumber?: string;
  hasValidConsent: boolean;
  isSuppressed: boolean;
  suppressionReason?: string;
  lastContactedAt?: Date;
  totalAttempts: number;
}

export interface EligibilityEvaluation {
  eligible: boolean;
  reason?: string;
  canRetryLater: boolean;
  nextEligibleAt?: Date;
}

export class ContactEligibilityService {
  public evaluate(
    history: CandidateContactHistory,
    currentDate: Date = new Date()
  ): EligibilityEvaluation {
    const input: ContactEligibilityCheckInput = {
      personId: history.candidateId,
      phoneNumber: history.phoneNumber || "+919000000000",
      channel: "VOICE",
      purpose: "RECRUITMENT_OPPORTUNITY",
      hasExplicitConsent: history.hasValidConsent,
      isSuppressed: history.isSuppressed,
      lastContactedAt: history.lastContactedAt,
      dailyContactCount: history.totalAttempts,
      currentTime: currentDate,
    };

    const res = evaluateContactEligibility(input);

    return {
      eligible: res.isEligible,
      reason: res.reason,
      canRetryLater: res.code === "OUTSIDE_HOURS" || res.code === "COOLDOWN_ACTIVE",
      nextEligibleAt: history.lastContactedAt
        ? new Date(history.lastContactedAt.getTime() + 30 * 60 * 1000)
        : undefined,
    };
  }
}
