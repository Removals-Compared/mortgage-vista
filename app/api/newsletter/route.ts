import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { getDb, insertRow } from "@/lib/db";
import { mailTo, sendMail } from "@/lib/mail";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

/**
 * Newsletter subscription endpoint.
 *
 * Sign-ups are stored in Neon (one row per address, repeat sign-ups are a
 * no-op). If storage is unavailable, the address is emailed to MAIL_TO so it
 * is not lost. There is no ESP wired up: export the table to send newsletters.
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
  const db = getDb();
  if (db) {
    try {
      await insertRow(db, "newsletter_subscribers", { email }, {
        onConflictDoNothing: true,
      });
      stored = true;
    } catch (err) {
      console.error("[newsletter] database insert failed", err);
    }
  }

  // Fallback so a sign-up is never silently lost.
  let emailed = false;
  if (!stored) {
    const to = mailTo();
    if (to) {
      try {
        await sendMail({
          to,
          subject: `[${siteConfig.shortName}] New newsletter subscriber`,
          text: `New newsletter sign-up: ${email}\n\n(The database was unavailable, so this email is the only record.)`,
        });
        emailed = true;
      } catch (err) {
        console.error("[newsletter] fallback email failed", err);
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
