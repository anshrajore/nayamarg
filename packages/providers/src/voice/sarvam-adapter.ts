import { VoiceProvider, OutboundCallInput, OutboundCallResult, NormalizedCallEvent } from "./voice-provider.interface";
import { StructuredCallResult } from "@nayamarg/contracts";

export interface SarvamConfig {
  apiKey: string;
  orgId: string;
  workspaceId: string;
  baseUrl?: string;
  isMockMode?: boolean;
}

export class SarvamVoiceAdapter implements VoiceProvider {
  public readonly name = "SARVAM";
  private readonly baseUrl: string;

  constructor(private readonly config: SarvamConfig) {
    this.baseUrl = config.baseUrl || "https://api.sarvam.ai";
  }

  async createOutboundCall(input: OutboundCallInput): Promise<OutboundCallResult> {
    if (this.config.isMockMode || !this.config.apiKey) {
      // Mock / Local Dev simulation
      return {
        providerAttemptId: `srv_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        acceptedAt: new Date().toISOString(),
        status: "ACCEPTED",
        rawProviderPayload: { mode: "mock", input },
      };
    }

    const endpoint = `${this.baseUrl}/api/outbounds/v1/orgs/${this.config.orgId}/workspaces/${this.config.workspaceId}/outbounds`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Subscription-Key": this.config.apiKey,
      },
      body: JSON.stringify({
        agent_id: input.agentId,
        destination_phone: input.phoneNumber,
        language_code: input.language,
        webhook_url: input.webhookUrl,
        user_variables: input.contextVariables,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sarvam Outbound Call Creation Failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return {
      providerAttemptId: data.attempt_id,
      acceptedAt: new Date().toISOString(),
      status: "ACCEPTED",
      rawProviderPayload: data,
    };
  }

  async getCallStatus(providerAttemptId: string): Promise<NormalizedCallEvent> {
    if (this.config.isMockMode || providerAttemptId.startsWith("srv_mock_")) {
      return {
        providerAttemptId,
        eventTimestamp: new Date().toISOString(),
        disposition: "CONNECTED",
        durationSeconds: 84,
        transcript: "Candidate confirmed 3 years machine operation experience in Nashik, available to join next Monday.",
        structuredResult: {
          call_disposition: "CONNECTED",
          candidate_interest: "INTERESTED",
          employment_status: "LOOKING_FOR_WORK",
          availability_status: "AVAILABLE",
          available_from: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
          experience_years: 3,
          salary_expectation_min: 16500,
          location_acceptable: true,
          shift_acceptable: true,
          interview_interest: true,
          callback_requested: false,
          preferred_language: "hi-IN",
          human_assistance_required: false,
          extraction_confidence: 0.96,
        },
        rawPayload: { mode: "mock_reconciled" },
      };
    }

    const endpoint = `${this.baseUrl}/api/analytics/v1/orgs/${this.config.orgId}/attempts/${providerAttemptId}`;
    const response = await fetch(endpoint, {
      headers: { "API-Subscription-Key": this.config.apiKey },
    });
    const data = await response.json();
    return this.normalizeWebhook(data);
  }

  async normalizeWebhook(payload: any): Promise<NormalizedCallEvent> {
    const dispositionMap: Record<string, "CONNECTED" | "NO_ANSWER" | "BUSY" | "FAILED"> = {
      connected: "CONNECTED",
      completed: "CONNECTED",
      no_answer: "NO_ANSWER",
      busy: "BUSY",
      failed: "FAILED",
    };

    const disposition = dispositionMap[payload.status?.toLowerCase()] || "FAILED";
    const userVars = payload.agent_variables || payload.user_variables || {};

    let structuredResult: StructuredCallResult | undefined;
    if (disposition === "CONNECTED") {
      structuredResult = {
        call_disposition: "CONNECTED",
        candidate_interest: userVars.interested === false ? "NOT_INTERESTED" : "INTERESTED",
        employment_status: userVars.employment_status || "LOOKING_FOR_WORK",
        availability_status: userVars.available === false ? "UNAVAILABLE" : "AVAILABLE",
        available_from: userVars.available_from || null,
        experience_years: typeof userVars.experience_years === "number" ? userVars.experience_years : 2,
        salary_expectation_min: typeof userVars.salary_min === "number" ? userVars.salary_min : undefined,
        location_acceptable: userVars.location_ok ?? true,
        shift_acceptable: userVars.shift_ok ?? true,
        interview_interest: userVars.agree_interview ?? true,
        callback_requested: Boolean(userVars.callback_requested),
        preferred_language: userVars.language || "hi-IN",
        human_assistance_required: Boolean(userVars.human_needed),
        extraction_confidence: 0.95,
      };
    }

    return {
      providerAttemptId: payload.attempt_id || payload.interaction_id,
      eventTimestamp: payload.timestamp || new Date().toISOString(),
      disposition,
      durationSeconds: payload.duration_seconds || payload.duration || 0,
      transcript: payload.transcript || payload.conversation_text,
      structuredResult,
      rawPayload: payload,
    };
  }
}
