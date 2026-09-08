import { Resend } from 'resend';
import { EmailConfigurationError, EmailProviderError, EmailValidationError } from './errors';
import { buildBasicEmailHtml } from './templates/basicEmailTemplate';
import type { BasicEmailTemplateProps, SendTemplatedEmailOptions } from './types';

export async function sendTemplatedEmail(options: SendTemplatedEmailOptions) {
  const apiKey = options.apiKey || process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new EmailConfigurationError('RESEND_API_KEY is not configured.');
  }

  const { payload } = options;
  if (!payload.to || (Array.isArray(payload.to) && payload.to.length === 0)) {
    throw new EmailValidationError('Recipient (to) is required.');
  }
  if (!payload.subject) {
    throw new EmailValidationError('Subject is required.');
  }

  const defaultSenderName = options.defaultSenderName || 'Goldlabel';
  const fromAddress = options.fromAddress || 'onboarding@goldlabel.pro';
  const from = payload.from || `${defaultSenderName} <${fromAddress}>`;

  const templateProps = (payload.templateProps || {}) as BasicEmailTemplateProps;
  if (!templateProps.body && payload.body) {
    templateProps.body = payload.body;
  }

  const html = buildBasicEmailHtml(templateProps);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: payload.to,
      subject: payload.subject,
      html,
    });

    if (result.error) {
      throw new EmailProviderError(result.error.message, result.error);
    }

    return result.data;
  } catch (err) {
    if (err instanceof EmailProviderError || err instanceof EmailValidationError || err instanceof EmailConfigurationError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Unknown email provider error';
    throw new EmailProviderError(message, err);
  }
}
