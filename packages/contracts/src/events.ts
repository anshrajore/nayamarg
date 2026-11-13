import { z } from "zod";

export const DomainEventEnvelopeSchema = z.object({
  event_id: z.string().uuid(),
  event_type: z.string(),
  schema_version: z.number().int().default(1),
  occurred_at: z.string().datetime(),
  tenant_id: z.string().uuid().nullable().optional(),
  aggregate_type: z.string(),
  aggregate_id: z.string().uuid(),
  correlation_id: z.string().uuid(),
  causation_id: z.string().uuid().nullable().optional(),
  payload: z.record(z.any()),
});

export type DomainEventEnvelope = z.infer<typeof DomainEventEnvelopeSchema>;

export const SystemEventTypes = {
  // Identity
  USER_REGISTERED: "identity.user.registered",
  ORGANIZATION_VERIFIED: "organization.verified",

  // Recruitment
  REQUEST_SUBMITTED: "recruitment.request.submitted",
  REQUEST_APPROVED: "recruitment.request.approved",
  MATCHING_COMPLETED: "recruitment.matching.completed",
  CANDIDATE_SHORTLISTED: "recruitment.candidate.shortlisted",
  INTERVIEW_SCHEDULED: "recruitment.interview.scheduled",
  OFFER_EXTENDED: "recruitment.offer.extended",
  VACANCY_RESERVED: "recruitment.vacancy.reserved",
  VACANCY_FILLED: "recruitment.vacancy.filled",
  POSITION_FILLED: "recruitment.position.filled",
  PIPELINE_READY: "recruitment.pipeline.ready",

  // Voice
  CAMPAIGN_CREATED: "voice.campaign.created",
  CAMPAIGN_STARTED: "voice.campaign.started",
  CALL_REQUESTED: "voice.call.requested",
  CALL_CONNECTED: "voice.call.connected",
  CALL_COMPLETED: "voice.call.completed",
  CALL_FAILED: "voice.call.failed",
  INBOUND_COMPLETED: "voice.inbound.completed",

  // SMS
  SMS_REQUESTED: "sms.message.requested",
  SMS_ACCEPTED: "sms.message.accepted",
  SMS_DELIVERED: "sms.message.delivered",
  SMS_FAILED: "sms.message.failed",

  // Operations
  EXECUTION_FAILED: "automation.execution.failed",
  EXECUTION_COMPLETED: "automation.execution.completed",
  CONSENT_WITHDRAWN: "compliance.consent.withdrawn",
  CONTACT_SUPPRESSED: "compliance.contact.suppressed",
  PROVIDER_DEGRADED: "provider.health.degraded",
} as const;
