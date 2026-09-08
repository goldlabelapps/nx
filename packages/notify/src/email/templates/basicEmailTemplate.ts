import type { BasicEmailTemplateProps } from '../types';

const DEFAULTS = {
  heading: 'Hello',
  ctaLabel: 'Go',
  productName: 'Goldlabel',
  sentUsingUrl: 'https://goldlabel.pro',
  sentUsingLabel: 'NX°',
  websiteUrl: 'https://goldlabel.pro',
  websiteLabel: 'goldlabel.pro',
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeUrl(url: string, fallback: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    // Invalid URL falls through to fallback.
  }

  return fallback;
}

function resolveAssetUrl(url: string, fallbackBase: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    try {
      const parsed = new URL(url, fallbackBase);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.toString();
      }
    } catch {
      // Invalid URL falls through to fallback.
    }
  }

  return fallbackBase;
}

function stripMailtoLinks(html: string): string {
  return html
    .replace(/<a\b[^>]*href=(['"])(mailto:[^'"]+)\1[^>]*>(.*?)<\/a>/gi, '$3')
    .replace(/<a\b[^>]*href=(mailto:[^\s>]+)[^>]*>(.*?)<\/a>/gi, '$2');
}

export function buildBasicEmailHtml(props: BasicEmailTemplateProps): string {
  const body = props.body.trim();
  if (!body) {
    throw new Error('body is required for the email template.');
  }

  const bodyHtml = stripMailtoLinks(body);
  const ctaLabel = escapeHtml(props.ctaLabel ?? DEFAULTS.ctaLabel);
  const productName = escapeHtml(props.productName ?? DEFAULTS.productName);
  const practitionerName = props.practitionerName ? escapeHtml(props.practitionerName) : '';
  const practitionerAvatarUrl = props.practitionerAvatarUrl
    ? escapeHtml(resolveAssetUrl(props.practitionerAvatarUrl, DEFAULTS.websiteUrl))
    : '';
  const clinicName = escapeHtml(props.clinicName ?? props.websiteLabel ?? DEFAULTS.websiteLabel);
  const websiteUrlRaw = safeUrl(props.websiteUrl ?? DEFAULTS.websiteUrl, DEFAULTS.websiteUrl);
  const websiteUrl = escapeHtml(websiteUrlRaw);
  const ctaUrl = props.ctaUrl ? escapeHtml(resolveAssetUrl(props.ctaUrl, DEFAULTS.websiteUrl)) : '';

  const sentUsingUrl = escapeHtml(safeUrl(props.sentUsingUrl ?? DEFAULTS.sentUsingUrl, DEFAULTS.sentUsingUrl));
  const sentUsingLabel = escapeHtml(props.sentUsingLabel ?? DEFAULTS.sentUsingLabel);

  const headerBlock = clinicName || practitionerAvatarUrl
    ? `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                                        <tr>
                                            ${practitionerAvatarUrl ? `<td style="padding:0 10px 0 0;vertical-align:middle;">
                                                <img src="${practitionerAvatarUrl}" alt="${practitionerName || clinicName || productName}" width="83" height="83" style="display:block;width:83px;height:83px;border-radius:50%;object-fit:cover;" />
                                            </td>` : ''}
                                            <td style="vertical-align:middle;text-align:left;">
                                                <a href="${websiteUrl}" style="color:#1a1a1a;text-decoration:none;font-size:24px;font-weight:400;line-height:1.2;">
                                                    ${clinicName}
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>`
    : '';

  const ctaBlock = ctaUrl ? `<table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 36px auto;">
                            <tr>
                                <td align="center" style="background-color:#2C2C2A;border-radius:8px;">
                                    <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:16px 40px;font-size:17px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
                                        ${ctaLabel}
                                    </a>
                                </td>
                            </tr>
                        </table>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0;">
                    <tr>
                        <td align="center" style="padding:18px 24px 10px 24px;background-color:#ffffff;border-bottom:1px solid #e8e8e8;">
                            ${headerBlock}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px 24px 12px 24px;">
                            <div style="margin:0 0 28px 0;font-size:15px;color:#555555;line-height:1.6;text-align:center;">
                                ${bodyHtml}
                            </div>
                            ${ctaBlock}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:18px 24px;border-top:1px solid #e8e8e8;background-color:#f7f7f4;text-align:center;">
                            <p style="margin:0 0 6px 0;font-size:12px;color:#888888;">
                                Sent by 
                                <a href="${websiteUrl}" style="color:#888888;text-decoration:none;">
                                    <strong style="color:#555555;">
                                        ${productName}
                                    </strong>
                                </a> 
                                using 
                                <a href="${sentUsingUrl}" style="color:#888888;text-decoration:none;">
                                    <strong style="color:#555555;">
                                        ${sentUsingLabel}
                                    </strong>
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
