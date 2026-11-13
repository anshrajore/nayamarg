import { StructuredCallResult, CallDispositionSchema } from "@nayamarg/contracts";

export interface OutboundCallInput {
  attemptId: string;
  phoneNumber: string;
  agentId: string;
  agentVersion: number;
  language: string;
  contextVariables: Record<string, any>;
  webhookUrl: string;
}

export interface OutboundCallResult {
  providerAttemptId: string;
  acceptedAt: string;
  status: "ACCEPTED" | "REJECTED";
  rawProviderPayload?: any;
}

export interface NormalizedCallEvent {
  providerAttemptId: string;
  eventTimestamp: string;
  disposition: "CONNECTED" | "NO_ANSWER" | "BUSY" | "FAILED";
  durationSeconds: number;
  transcript?: string;
  structuredResult?: StructuredCallResult;
  rawPayload: any;
}

export interface VoiceProvider {
  name: string;
  createOutboundCall(input: OutboundCallInput): Promise<OutboundCallResult>;
  getCallStatus(providerAttemptId: string): Promise<NormalizedCallEvent>;
  normalizeWebhook(payload: unknown, headers?: Record<string, string>): Promise<NormalizedCallEvent>;
}
