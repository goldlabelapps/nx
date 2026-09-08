import { Resend } from "resend";

const DEFAULT_OWNER_EMAIL = "owner@goldlabel.pro";
const SANDBOX_TEST_EMAIL = "goldlabel.apps@gmail.com";
const DEFAULT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "GoldLabel <onboarding@goldlabel.pro>";

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not configured.");
  }
  return new Resend(apiKey);
}

export interface SendEmailOptions {
  to?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

/**
 * Sends an email using the Resend API.
 */
export async function sendEmail(options: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = options.to || DEFAULT_OWNER_EMAIL;
  const fromEmail = options.from || DEFAULT_FROM_EMAIL;

  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY is not configured. Simulating email dispatch to ${recipient}:`,
      { subject: options.subject, text: options.text }
    );
    return {
      data: { id: "simulated-email-" + Date.now() },
      error: null,
    };
  }

  const resend = new Resend(apiKey);
  let result = await resend.emails.send({
    from: fromEmail,
    to: recipient,
    subject: options.subject,
    html: options.html || (options.text ? `<p>${options.text}</p>` : ""),
    text: options.text,
  });

  // If using unverified domain in sandbox mode, fallback gracefully to verified testing email
  if (
    result.error &&
    result.error.message &&
    result.error.message.includes("You can only send testing emails to your own email address")
  ) {
    console.warn(
      `[email] Resend Sandbox limit encountered for ${recipient}. Retrying with verified address (${SANDBOX_TEST_EMAIL})...`
    );
    result = await resend.emails.send({
      from: "GoldLabel <onboarding@resend.dev>",
      to: SANDBOX_TEST_EMAIL,
      subject: `[Sandbox Forward -> ${recipient}] ${options.subject}`,
      html: options.html || (options.text ? `<p>${options.text}</p>` : ""),
      text: options.text,
    });
  }

  return result;
}

export interface NewUserEventData {
  uid: string;
  email: string | null;
  displayName?: string | null;
  createdAt?: string;
}

/**
 * Sends a notification email when a new user is created.
 */
export async function sendNewUserNotification(user: NewUserEventData) {
  const userIdentifier = user.email || user.displayName || user.uid;
  const subject = `[New User] New user registered: ${userIdentifier}`;

  const html = `
    <div style="font-family: sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #111;">🎉 New User Registration</h2>
      <p>A new user has just registered on the platform:</p>
      <ul>
        <li><strong>User ID:</strong> <code>${user.uid}</code></li>
        <li><strong>Email:</strong> ${user.email || "N/A"}</li>
        <li><strong>Display Name:</strong> ${user.displayName || "N/A"}</li>
        <li><strong>Created At:</strong> ${user.createdAt || new Date().toISOString()}</li>
      </ul>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #777;">Sent via Resend from Template App</p>
    </div>
  `;

  return sendEmail({
    to: DEFAULT_OWNER_EMAIL,
    subject,
    html,
    text: `New user registered: ${userIdentifier} (UID: ${user.uid}, Email: ${user.email || "N/A"})`,
  });
}
