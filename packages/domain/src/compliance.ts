/**
 * Telecom & Regulatory Compliance (TRAI / DLT)
 * Section 11 of Specification
 */

export interface ContactEligibilityCheckInput {
  personId: string;
  phoneNumber: string;
  channel: "VOICE" | "SMS";
  purpose: "RECRUITMENT_OPPORTUNITY" | "INTERVIEW_NOTIFICATION" | "TRANSACTIONAL";
  hasExplicitConsent: boolean;
  isSuppressed: boolean;
  dndStatus?: "REGISTERED" | "CLEAR";
  lastContactedAt?: Date;
  dailyContactCount?: number;
  currentTime?: Date;
}

export interface EligibilityResult {
  isEligible: boolean;
  reason?: string;
  code: "APPROVED" | "OUTSIDE_HOURS" | "CONSENT_REQUIRED" | "SUPPRESSED" | "COOLDOWN_ACTIVE" | "FREQUENCY_EXCEEDED";
}

export function evaluateContactEligibility(input: ContactEligibilityCheckInput): EligibilityResult {
  const now = input.currentTime ?? new Date();

  // 1. Suppression check (Highest priority)
  if (input.isSuppressed) {
    return {
      isEligible: false,
      code: "SUPPRESSED",
      reason: "User has explicitly opted out or is globally suppressed.",
    };
  }

  // 2. Consent check
  if (!input.hasExplicitConsent && input.purpose !== "TRANSACTIONAL") {
    return {
      isEligible: false,
      code: "CONSENT_REQUIRED",
      reason: "Explicit user consent is missing or expired for this communication channel and purpose.",
    };
  }

  // 3. TRAI Calling Window Check (09:00 to 19:00 IST)
  // Convert to Indian Standard Time (UTC + 5:30)
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const istMinutesTotal = utcHours * 60 + utcMinutes + 330;
  const istHours = Math.floor(istMinutesTotal / 60) % 24;

  if (input.channel === "VOICE" && (istHours < 9 || istHours >= 19)) {
    return {
      isEligible: false,
      code: "OUTSIDE_HOURS",
      reason: `Calls permitted strictly between 09:00 and 19:00 IST. Current hour in IST: ${istHours}`,
    };
  }

  // 4. Frequency Limit (Max 3 calls/day per candidate across platform)
  if ((input.dailyContactCount ?? 0) >= 3) {
    return {
      isEligible: false,
      code: "FREQUENCY_EXCEEDED",
      reason: "Maximum daily contact frequency limit reached (3 attempts/day).",
    };
  }

  // 5. Cooldown limit (At least 30 minutes between attempts)
  if (input.lastContactedAt) {
    const elapsedMinutes = (now.getTime() - input.lastContactedAt.getTime()) / (1000 * 60);
    if (elapsedMinutes < 30) {
      return {
        isEligible: false,
        code: "COOLDOWN_ACTIVE",
        reason: `Candidate cooldown active. ${Math.round(30 - elapsedMinutes)} minutes remaining.`,
      };
    }
  }

  return {
    isEligible: true,
    code: "APPROVED",
  };
}
