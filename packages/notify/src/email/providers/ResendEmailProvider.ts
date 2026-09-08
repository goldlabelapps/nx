import type { NotificationProvider, NotificationRequest, NotificationResult } from '../../index';
import { sendTemplatedEmail } from '../sendTemplatedEmail';
import type { BasicEmailTemplateProps } from '../types';

export class ResendEmailProvider implements NotificationProvider {
  readonly channel = 'email' as const;

  constructor(
    private readonly config?: {
      apiKey?: string;
      defaultSenderName?: string;
      fromAddress?: string;
    },
  ) {}

  async send<TData>(request: NotificationRequest<TData>): Promise<NotificationResult> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataProps = (request.data || {}) as Record<string, any>;

    const templateProps: BasicEmailTemplateProps = {
      body: request.body || dataProps.body || '',
      heading: request.subject || dataProps.heading,
      ctaLabel: dataProps.ctaLabel,
      ctaUrl: dataProps.ctaUrl,
      productName: dataProps.productName,
      websiteUrl: dataProps.websiteUrl,
    };

    const data = await sendTemplatedEmail({
      apiKey: this.config?.apiKey,
      payload: {
        to: request.to,
        subject: request.subject || 'Notification',
        body: request.body,
        template: request.template,
        templateProps,
      },
      defaultSenderName: this.config?.defaultSenderName,
      fromAddress: this.config?.fromAddress,
    });

    return {
      channel: 'email',
      acceptedAt: new Date().toISOString(),
      providerMessageId: data?.id,
    };
  }
}
