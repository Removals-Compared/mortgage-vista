import { NextResponse } from "next/server";
import { calculatorEmailSchema } from "@/lib/validations";

export const runtime = "nodejs";

/**
 * Email calculator results to the user (and capture as a lead).
 *
 * --- WIRING REAL EMAIL DELIVERY ---
 * See app/api/contact/route.ts for the Resend setup. The email here should
 * include a formatted summary of the calculator inputs and outputs.
 *
 * Recommended: also POST a copy to your CRM as a low-intent lead.
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

  // TODO: send a formatted results email — see file header.
  console.log(
    `[calculator-result] ${parsed.data.resultsType} -> ${parsed.data.email}`,
    parsed.data.payload,
  );

  return NextResponse.json({ ok: true });
}
