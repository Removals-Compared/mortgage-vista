import { NextResponse } from "next/server";
import { calculatorEmailSchema } from "@/lib/validations";
import { getDb, insertRow } from "@/lib/db";
import { mailTo, sendMail } from "@/lib/mail";
import {
  buildCalculatorEmail,
  buildCalculatorLeadNotice,
} from "@/lib/calculator-email";

export const runtime = "nodejs";

// Per-hour caps so this endpoint can't be used to spam an address (or burn
// the mailbox's daily sending limit). Only enforced when the database is up.
const MAX_PER_ADDRESS_PER_HOUR = 3;
const MAX_TOTAL_PER_HOUR = 100;

/**
 * Email calculator results to the visitor, and keep the address as a
 * low-intent lead in Neon.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = calculatorEmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }
  const { email, resultsType, payload } = parsed.data;

  // The calculators send a handful of numbers; refuse anything bigger.
  const payloadJson = JSON.stringify(payload);
  if (payloadJson.length > 2000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 422 });
  }

  const db = getDb();
  if (db) {
    try {
      const [c] = await db.query<{ per_address: number; total: number }>(
        `SELECT count(*) FILTER (WHERE lower(email) = lower($1))::int AS per_address,
                count(*)::int AS total
           FROM calculator_leads
          WHERE created_at > now() - interval '1 hour'`,
        [email],
      );
      if (
        c &&
        (c.per_address >= MAX_PER_ADDRESS_PER_HOUR ||
          c.total >= MAX_TOTAL_PER_HOUR)
      ) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 },
        );
      }
    } catch (err) {
      console.error("[calculator-result] throttle check failed", err);
    }
  }

  // Keep the lead whether or not the email goes out.
  let leadId: string | null = null;
  if (db) {
    try {
      leadId = await insertRow(db, "calculator_leads", {
        email,
        results_type: resultsType,
        payload: payloadJson,
      });
    } catch (err) {
      console.error("[calculator-result] database insert failed", err);
    }
  }

  const mail = buildCalculatorEmail(resultsType, payload);
  try {
    await sendMail({ to: email, ...mail });
  } catch (err) {
    console.error("[calculator-result] email failed", err);
    return NextResponse.json(
      { error: "We couldn't send your results right now. Please try again." },
      { status: 502 },
    );
  }

  // Let the advisers know (best-effort: never fails the visitor's request).
  const to = mailTo();
  if (to) {
    try {
      await sendMail({
        to,
        replyTo: email,
        ...buildCalculatorLeadNotice(resultsType, email, payload),
      });
    } catch (err) {
      console.error("[calculator-result] adviser notification failed", err);
    }
  }

  if (db && leadId) {
    try {
      await db.query("UPDATE calculator_leads SET emailed = true WHERE id = $1", [
        leadId,
      ]);
    } catch {
      /* cosmetic flag only */
    }
  }

  return NextResponse.json({ ok: true });
}
