import { z } from "zod";

export const CallDispositionSchema = z.enum([
  "CONNECTED",
  "NO_ANSWER",
  "BUSY",
  "FAILED",
]);

export const CandidateInterestSchema = z.enum([
  "INTERESTED",
  "NOT_INTERESTED",
  "UNDECIDED",
  "NOT_APPLICABLE",
]);

export const AvailabilityStatusSchema = z.enum([
  "AVAILABLE",
  "UNAVAILABLE",
  "NOTICE_PERIOD",
  "UNKNOWN",
]);

export const StructuredCallResultSchema = z.object({
  call_disposition: CallDispositionSchema,
  candidate_interest: CandidateInterestSchema,
  employment_status: z.enum(["LOOKING_FOR_WORK", "EMPLOYED_SATISFIED", "NOT_WORKING", "UNKNOWN"]).default("UNKNOWN"),
  availability_status: AvailabilityStatusSchema,
  available_from: z.string().nullable().optional(),
  experience_years: z.number().min(0).nullable().optional(),
  salary_expectation_min: z.number().positive().nullable().optional(),
  location_acceptable: z.boolean().nullable().optional(),
  shift_acceptable: z.boolean().nullable().optional(),
  interview_interest: z.boolean().default(false),
  callback_requested: z.boolean().default(false),
  callback_time: z.string().datetime().nullable().optional(),
  refusal_reason: z.string().nullable().optional(),
  preferred_language: z.string().default("hi-IN"),
  human_assistance_required: z.boolean().default(false),
  extraction_confidence: z.number().min(0).max(1).default(1.0),
});

export type StructuredCallResult = z.infer<typeof StructuredCallResultSchema>;

export const SarvamOutboundPayloadSchema = z.object({
  attempt_id: z.string(),
  status: z.string(),
  duration_seconds: z.number().default(0),
  agent_variables: z.record(z.any()).optional(),
  transcript: z.string().optional(),
  telephony_details: z.object({
    caller_id: z.string().optional(),
    destination: z.string(),
    connection_id: z.string().optional(),
  }).optional(),
});

export type SarvamOutboundPayload = z.infer<typeof SarvamOutboundPayloadSchema>;
