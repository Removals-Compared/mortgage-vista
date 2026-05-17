import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";

export const runtime = "nodejs";

/**
 * Newsletter subscription endpoint.
 *
 * --- WIRING A REAL ESP ---
 * Pick one of:
 *   Mailchimp:   `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `MAILCHIMP_SERVER`
 *   ConvertKit:  `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`
 *   Resend Audiences: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`
 *
 * Document the chosen provider's keys in your README and `.env.example`,
 * then replace the `// TODO: subscribe email` block below with the
 * provider's REST call.
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

  // TODO: subscribe email via the chosen ESP. See file header.
  console.log("[newsletter] subscribed:", parsed.data.email);

  return NextResponse.json({ ok: true });
}
