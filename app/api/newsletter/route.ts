import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { getDb, insertRow } from "@/lib/db";
import { mailTo, sendMail } from "@/lib/mail";
import {
  callout,
  detailsTable,
  emailShell,
  escapeHtml,
  paragraph,
} from "@/lib/email-template";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

// Stop a bot from flooding the advisers' inbox: past this many new sign-ups
// in an hour they are still saved, but no more alert emails go out.
const MAX_ALERTS_PER_HOUR = 20;

/**
 * Newsletter subscription endpoint.
 *
 * Sign-ups are stored in Neon (one row per address, repeat sign-ups are a
 * no-op) and each NEW address is emailed to MAIL_TO. If storage is unavailable
 * the alert email is the only record, so it is always sent in that case.
 * There is no ESP wired up: export the table to send newsletters.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const email = parsed.data.email.trim();

  let stored = false;
  let isNew = false;
  const db = getDb();
  if (db) {
    try {
      const id = await insertRow(db, "newsletter_subscribers", { email }, {
        onConflictDoNothing: true,
      });
      stored = true;
      isNew = id !== null; // null: this address had already signed up
    } catch (err) {
      console.error("[newsletter] database insert failed", err);
    }
  }

  // Alert the advisers about a new sign-up (or keep the only record if the
  // database was unavailable).
  let emailed = false;
  const to = mailTo();
  if (to && (isNew || !stored)) {
    let allowed = true;
    if (db && stored) {
      try {
        const [c] = await db.query<{ n: number }>(
          `SELECT count(*)::int AS n FROM newsletter_subscribers
            WHERE created_at > now() - interval '1 hour'`,
        );
        allowed = !c || c.n <= MAX_ALERTS_PER_HOUR;
      } catch {
        /* if the check fails, send the alert */
      }
    }
    if (allowed) {
      const note = stored
        ? "Saved in the database."
        : "NOT saved in the database (storage failed or is not configured). This email is the only record.";
      try {
        await sendMail({
          to,
          replyTo: email,
          subject: `[${siteConfig.shortName}] New newsletter subscriber`,
          text: `New newsletter sign-up: ${email}\n\n${note}`,
          html: emailShell({
            preheader: `${email} subscribed to the newsletter`,
            heading: "New newsletter subscriber",
            subheading: `${email} signed up on the website`,
            body:
              callout(escapeHtml(note), stored ? "ok" : "warn") +
              detailsTable([["Email", email]]),
            footer: paragraph(
              `Sent automatically by the ${escapeHtml(siteConfig.shortName)} website.`,
              { muted: true, small: true },
            ).replace("margin:0 0 16px", "margin:0"),
          }),
        });
        emailed = true;
      } catch (err) {
        console.error("[newsletter] alert email failed", err);
      }
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { error: "We couldn't save your sign-up right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
