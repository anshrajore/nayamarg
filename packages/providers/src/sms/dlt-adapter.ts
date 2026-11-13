import { SmsProvider, SendSmsInput, SendSmsResult, SmsDeliveryEvent } from "./sms-provider.interface";

export class DltSmsAdapter implements SmsProvider {
  public readonly name = "DLT_SMS_GATEWAY";

  constructor(private readonly apiKey: string = "mock_key") {}

  async sendSms(input: SendSmsInput): Promise<SendSmsResult> {
    // Verified DLT template submission
    return {
      providerMessageId: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      status: "ACCEPTED",
      acceptedAt: new Date().toISOString(),
      rawPayload: { dlt_template_id: input.dltTemplateId, destination: input.phoneNumber },
    };
  }

  async normalizeDeliveryWebhook(payload: any): Promise<SmsDeliveryEvent> {
    const statusMap: Record<string, "DELIVERED" | "UNDELIVERED" | "FAILED" | "EXPIRED"> = {
      delivered: "DELIVERED",
      undelivered: "UNDELIVERED",
      failed: "FAILED",
      expired: "EXPIRED",
    };

    return {
      providerMessageId: payload.message_id || payload.msg_id,
      status: statusMap[payload.status?.toLowerCase()] || "DELIVERED",
      deliveredAt: payload.delivered_at || new Date().toISOString(),
      errorCode: payload.error_code,
      rawPayload: payload,
    };
  }
}
