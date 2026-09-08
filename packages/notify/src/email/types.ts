export interface BasicEmailTemplateProps {
  heading?: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
  productName?: string;
  practitionerName?: string;
  practitionerAvatarUrl?: string;
  clinicName?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  sentUsingUrl?: string;
  sentUsingLabel?: string;
}

export interface EmailPayload {
  to: string | string[];
  subject: string;
  body?: string;
  template?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateProps?: BasicEmailTemplateProps | Record<string, any>;
  from?: string;
}

export interface SendTemplatedEmailOptions {
  apiKey?: string;
  payload: EmailPayload;
  defaultSenderName?: string;
  fromAddress?: string;
}
