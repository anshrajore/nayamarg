export interface SendSmsInput {
  messageId: string;
  phoneNumber: string;
  dltTemplateId: string;
  templateVariables: string[];
  renderedMessage: string;
}

export interface SendSmsResult {
  providerMessageId: string;
  status: "ACCEPTED" | "REJECTED";
  acceptedAt: string;
  rawPayload?: any;
}

export interface SmsDeliveryEvent {
  providerMessageId: string;
  status: "DELIVERED" | "UNDELIVERED" | "FAILED" | "EXPIRED";
  deliveredAt?: string;
  errorCode?: string;
  rawPayload: any;
}

export interface SmsProvider {
  name: string;
  sendSms(input: SendSmsInput): Promise<SendSmsResult>;
  normalizeDeliveryWebhook(payload: unknown): Promise<SmsDeliveryEvent>;
}
