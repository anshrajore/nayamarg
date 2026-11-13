import { z } from "zod";

export const FailureClassificationSchema = z.enum([
  "TRANSIENT_SYSTEM",
  "PERMANENT_VALIDATION",
  "EXTERNAL_PROVIDER",
  "BUSINESS_OUTCOME",
  "COMPLIANCE_SUPPRESSION",
  "MANUAL_INTERVENTION_REQUIRED",
  "DATA_QUALITY",
]);

export type FailureClassification = z.infer<typeof FailureClassificationSchema>;

export const SystemFailureSchema = z.object({
  id: z.string().uuid(),
  failure_code: z.string(),
  classification: FailureClassificationSchema,
  source_module: z.string(),
  correlation_id: z.string().uuid(),
  incident_id: z.string().uuid().nullable().optional(),
  status: z.enum(["OPEN", "ASSIGNED", "RECOVERING", "RESOLVED", "IGNORED"]),
  retry_count: z.number().int().default(0),
  max_retries: z.number().int().default(3),
  error_details: z.record(z.any()),
  suggested_runbook: z.string().optional(),
  resolution_notes: z.string().nullable().optional(),
  created_at: z.string().datetime(),
});

export type SystemFailure = z.infer<typeof SystemFailureSchema>;
