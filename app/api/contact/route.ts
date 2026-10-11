import { NextResponse } from "next/server";
import { contactSchema, quickQuoteSchema } from "@/lib/validations";
import { getDb, insertRow } from "@/lib/db";
import { mailTo, sendMail } from "@/lib/mail";
import {
  callout,
  detailsTable,
  emailShell,
  escapeHtml,
  paragraph,
  sectionHeading,
} from "@/lib/email-template";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

type Enquiry = {
  enquiryType: string | null;
  name: string;
  email: string;
  phone: string | null;
  postcode: string | null;
  propertyValue: number | null;
  loanRequired: number | null;
  message: string | null;
};

const gbp = (n: number | null) =>
  n == null
    ? "-"
    : new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(n);

/**
 * Contact form submission endpoint.
 *
 * Accepts BOTH the multi-step contact form (contactSchema) and the quick
 * quote form (quickQuoteSchema); the `source` field on the body says which.
 *
 * Every enquiry is saved to Neon and emailed to MAIL_TO. Either one is enough
 * for the visitor to see success; if both fail we return an error so the form
 * tells them to try again instead of silently losing the lead.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot. Bots fill in the hidden field. Pretend success.
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

  let enquiry: Enquiry;
  let details: unknown;
  if (detailed.success) {
    const d = detailed.data;
    details = d;
    enquiry = {
      enquiryType: d.enquiryType,
      name: `${d.firstName} ${d.lastName}`.trim(),
      email: d.email,
      phone: d.phone || null,
      postcode: d.postcode.trim().toUpperCase(),
      propertyValue: d.propertyValue ?? null,
      loanRequired: d.loanRequired ?? null,
      message: d.notes || null,
    };
  } else if (quick.success) {
    const q = quick.data;
    details = q;
    enquiry = {
      enquiryType: null,
      name: q.name,
      email: q.email,
      phone: q.phone || null,
      postcode: null,
      propertyValue: null,
      loanRequired: null,
      message: q.enquiry,
    };
  } else {
    return NextResponse.json(
      { error: "Validation failed", issues: detailed.error.issues },
      { status: 422 },
    );
  }

  const raw = (typeof body === "object" && body !== null ? body : {}) as Record<
    string,
    unknown
  >;
  const source =
    typeof raw.source === "string" && raw.source
      ? raw.source.slice(0, 40)
      : detailed.success
        ? "contact-page"
        : "quick-quote";
  const context =
    typeof raw.context === "string" && raw.context
      ? raw.context.slice(0, 200)
      : null;

  // 1. Store in Neon (best-effort).
  let enquiryId: string | null = null;
  let stored = false;
  const db = getDb();
  if (db) {
    try {
      enquiryId = await insertRow(db, "enquiries", {
        source,
        enquiry_type: enquiry.enquiryType,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        postcode: enquiry.postcode,
        property_value: enquiry.propertyValue,
        loan_required: enquiry.loanRequired,
        message: enquiry.message,
        context,
        consent: true, // both schemas refuse the submission without it
        details: JSON.stringify(details),
      });
      stored = true;
    } catch (err) {
      console.error("[contact] database insert failed", err);
    }
  }

  // 2. Email the advisers.
  const to = mailTo();
  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone ?? "-"],
    ["Enquiry type", enquiry.enquiryType ?? "-"],
    ["Postcode", enquiry.postcode ?? "-"],
    ["Property value", gbp(enquiry.propertyValue)],
    ["Loan required", gbp(enquiry.loanRequired)],
    ["Source", context ? `${source} (${context})` : source],
  ];
  const storageNote = stored
    ? "Saved in the database."
    : "NOT saved in the database (storage failed or is not configured). This email is the only copy.";
  const text = [
    `New enquiry via the ${siteConfig.shortName} website`,
    "",
    storageNote,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    enquiry.message ?? "(none)",
    "",
    "Reply to this email to respond directly: the visitor's address is set as Reply-To.",
  ].join("\n");
  const html = emailShell({
    preheader: `${enquiry.name} (${enquiry.email})${enquiry.enquiryType ? `, ${enquiry.enquiryType}` : ""}`,
    heading: "New enquiry",
    subheading: `${enquiry.name} sent a message through the website`,
    body: [
      callout(escapeHtml(storageNote), stored ? "ok" : "warn"),
      detailsTable(rows),
      sectionHeading("Message"),
      `<p style="margin:0 0 6px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:15px;line-height:1.6;color:#0a0a0a;white-space:pre-wrap;">${escapeHtml(enquiry.message ?? "(none)")}</p>`,
      paragraph("Reply to this email to respond directly: the visitor's address is set as Reply-To.", {
        muted: true,
        small: true,
      }).replace("margin:0 0 16px", "margin:22px 0 0"),
    ].join(""),
    footer: paragraph(
      `Sent automatically by the ${escapeHtml(siteConfig.shortName)} website.`,
      { muted: true, small: true },
    ).replace("margin:0 0 16px", "margin:0"),
  });

  let emailed = false;
  if (to) {
    try {
      await sendMail({
        to,
        replyTo: enquiry.email,
        subject: `[${siteConfig.shortName}] New enquiry: ${enquiry.name}`,
        text,
        html,
      });
      emailed = true;
    } catch (err) {
      console.error("[contact] email failed", err);
    }
  } else {
    console.error("[contact] MAIL_TO is not set");
  }

  if (emailed && stored && enquiryId && db) {
    try {
      await db.query("UPDATE enquiries SET notified = true WHERE id = $1", [
        enquiryId,
      ]);
    } catch {
      /* cosmetic flag only */
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      {
        error:
          "We couldn't send your enquiry right now. Please try again, or contact us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
