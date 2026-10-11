import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { LOGO_CID, LOGO_PNG_BASE64 } from "@/lib/email-logo";

export { escapeHtml } from "@/lib/email-template";

/**
 * Outbound email over SMTP (Gmail app password, or any SMTP provider).
 * Env: SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465),
 * SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO.
 */
let cached: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (cached !== undefined) return cached;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.warn("[mail] SMTP_USER or SMTP_PASS not set, email disabled.");
    cached = null;
    return cached;
  }
  const port = Number(process.env.SMTP_PORT ?? 465);
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return cached;
}

export function mailConfigured(): boolean {
  return getTransporter() !== null;
}

export const mailTo = () => process.env.MAIL_TO ?? "";
export const mailFrom = () =>
  process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "";

export type MailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

/** Sends one email. Throws if email is not configured or the send fails.
 *  The logo is attached inline whenever the HTML references it. */
export async function sendMail(input: MailInput): Promise<void> {
  const t = getTransporter();
  if (!t) throw new Error("Email is not configured");
  const attachments = input.html?.includes(`cid:${LOGO_CID}`)
    ? [
        {
          filename: "mortgage-vista-logo.png",
          content: Buffer.from(LOGO_PNG_BASE64, "base64"),
          cid: LOGO_CID,
          contentType: "image/png",
          contentDisposition: "inline" as const,
        },
      ]
    : undefined;
  await t.sendMail({ from: mailFrom(), ...input, attachments });
}
