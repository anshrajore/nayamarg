import {
  StructuredCallResult,
  StructuredCallResultSchema,
  CandidateInterestSchema,
  CallDispositionSchema,
} from "@nayamarg/contracts";

export type CallDecisionOutcome =
  | "INTERESTED"
  | "NOT_INTERESTED"
  | "SALARY_MISMATCH"
  | "CALLBACK_REQUESTED"
  | "OPT_OUT"
  | "NO_ANSWER"
  | "BUSY"
  | "FAILED";

export interface ParsedVoiceResponse {
  callAttemptId: string;
  candidateId: string;
  callOutcome: "COMPLETED" | "NO_ANSWER" | "BUSY" | "FAILED";
  durationSeconds: number;
  decision: CallDecisionOutcome;
  structuredData?: StructuredCallResult;
  transcriptSnippet?: string;
  rawConfidence: number;
}

export class ResponseParserService {
  public parseCallCompletion(
    callAttemptId: string,
    candidateId: string,
    rawPayload: {
      callStatus: "COMPLETED" | "NO_ANSWER" | "BUSY" | "FAILED";
      durationSeconds: number;
      structuredResult?: unknown;
      transcript?: string;
      confidence?: number;
    }
  ): ParsedVoiceResponse {
    // 1. If call did not connect
    if (rawPayload.callStatus === "NO_ANSWER") {
      return {
        callAttemptId,
        candidateId,
        callOutcome: "NO_ANSWER",
        durationSeconds: rawPayload.durationSeconds || 0,
        decision: "NO_ANSWER",
        rawConfidence: 1.0,
      };
    }

    if (rawPayload.callStatus === "BUSY") {
      return {
        callAttemptId,
        candidateId,
        callOutcome: "BUSY",
        durationSeconds: rawPayload.durationSeconds || 0,
        decision: "BUSY",
        rawConfidence: 1.0,
      };
    }

    if (rawPayload.callStatus === "FAILED") {
      return {
        callAttemptId,
        candidateId,
        callOutcome: "FAILED",
        durationSeconds: rawPayload.durationSeconds || 0,
        decision: "FAILED",
        rawConfidence: 0.0,
      };
    }

    // 2. Normalize and validate structured response with Zod
    let structured: StructuredCallResult | undefined;
    const rawObj = (rawPayload.structuredResult || {}) as any;

    // Support both snake_case (Schema) and camelCase inputs
    const normalizedInput = {
      call_disposition: rawObj.call_disposition || "CONNECTED",
      candidate_interest:
        rawObj.candidate_interest ||
        (rawObj.isInterested === true
          ? "INTERESTED"
          : rawObj.isInterested === false
          ? "NOT_INTERESTED"
          : "UNDECIDED"),
      employment_status: rawObj.employment_status || "LOOKING_FOR_WORK",
      availability_status: rawObj.availability_status || "AVAILABLE",
      available_from: rawObj.available_from || (rawObj.availableFromDays ? `${rawObj.availableFromDays} days` : null),
      salary_expectation_min: rawObj.salary_expectation_min || rawObj.expectedSalaryMonthly || null,
      location_acceptable: rawObj.location_acceptable ?? true,
      shift_acceptable: rawObj.shift_acceptable ?? true,
      interview_interest: rawObj.interview_interest ?? rawObj.isInterested ?? false,
      callback_requested: rawObj.callback_requested ?? (Boolean(rawObj.callbackRequestedAt) || false),
      callback_time: rawObj.callback_time || rawObj.callbackRequestedAt || null,
      refusal_reason: rawObj.refusal_reason || rawObj.notes || null,
      preferred_language: rawObj.preferred_language || "hi-IN",
      human_assistance_required: rawObj.human_assistance_required ?? false,
      extraction_confidence: rawObj.extraction_confidence ?? rawPayload.confidence ?? 0.95,
    };

    const parsed = StructuredCallResultSchema.safeParse(normalizedInput);
    if (parsed.success) {
      structured = parsed.data;
    }

    // 3. Determine business decision
    let decision: CallDecisionOutcome = "NOT_INTERESTED";

    if (structured) {
      if (structured.callback_requested) {
        decision = "CALLBACK_REQUESTED";
      } else if (structured.candidate_interest === "INTERESTED" || structured.interview_interest) {
        decision = "INTERESTED";
      } else if (
        structured.refusal_reason?.toLowerCase().includes("salary") ||
        structured.refusal_reason?.toLowerCase().includes("paise") ||
        structured.refusal_reason?.toLowerCase().includes("25000") ||
        structured.refusal_reason?.toLowerCase().includes("mismatch")
      ) {
        decision = "SALARY_MISMATCH";
      } else if (
        structured.refusal_reason?.toLowerCase().includes("stop") ||
        structured.refusal_reason?.toLowerCase().includes("opt out")
      ) {
        decision = "OPT_OUT";
      } else {
        decision = "NOT_INTERESTED";
      }
    }

    return {
      callAttemptId,
      candidateId,
      callOutcome: "COMPLETED",
      durationSeconds: rawPayload.durationSeconds,
      decision,
      structuredData: structured,
      transcriptSnippet: rawPayload.transcript?.slice(0, 300),
      rawConfidence: rawPayload.confidence ?? 0.95,
    };
  }
}
