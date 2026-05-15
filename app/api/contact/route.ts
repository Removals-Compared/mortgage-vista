import { NextResponse } from "next/server";
import { contactSchema, quickQuoteSchema } from "@/lib/validations";

export const runtime = "nodejs";

/**
 * Contact form submission endpoint.
 *
 * Accepts BOTH the multi-step contact form (contactSchema) and the quick
 * quote form (quickQuoteSchema). Inspect the `source` field on the body
 * to tell them apart.
 *
 * --- WIRING REAL EMAIL DELIVERY ---
 * 1. `npm install resend`
 * 2. Add to `.env.local`:
 *      RESEND_API_KEY=re_xxxxxxxxxxxx
 *      MAIL_FROM=enquiries@yourdomain.co.uk
 *      MAIL_TO=advisers@yourdomain.co.uk
 * 3. Replace the `// TODO: send email` block below with:
 *      const { Resend } = await import("resend");
 *      const resend = new Resend(process.env.RESEND_API_KEY!);
 *      await resend.emails.send({
 *        from: process.env.MAIL_FROM!,
 *        to: process.env.MAIL_TO!,
 *        replyTo: parsed.data.email,
 *        subject: `New enquiry — ${parsed.data.firstName ?? parsed.data.name}`,
 *        text: JSON.stringify(parsed.data, null, 2),
 *      });
 * 4. Optionally also push the lead to your CRM (HubSpot, Pipedrive, etc.)
 *    via a second fetch here.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill in the hidden field. Pretend success.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  // Try strict schema first, then quick-quote.
  const detailed = contactSchema.safeParse(body);
  const quick = quickQuoteSchema.safeParse(body);
  if (!detailed.success && !quick.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: detailed.error.issues },
      { status: 422 },
    );
  }

  const data = detailed.success ? detailed.data : quick.data;

  // TODO: send email — see file header above.
  console.log("[contact] new enquiry", data);

  return NextResponse.json({ ok: true });
}
