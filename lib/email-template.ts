import { siteConfig } from "@/config/site";
import { LOGO_CID } from "@/lib/email-logo";

/**
 * Branded HTML email layout (black header with the logo, gold accent, white
 * card). Pure functions, no I/O. Table-based with inline styles because mail
 * clients ignore most modern CSS. Brand colours mirror app/globals.css.
 */
const C = {
  black: "#010101",
  ink: "#0a0a0a",
  gold: "#ebab23",
  goldLight: "#fbe9b8",
  muted: "#52525b",
  soft: "#a1a1aa",
  surface: "#fafafa",
  border: "#e4e4e7",
  page: "#f4f4f5",
  success: "#10b981",
  warn: "#b45309",
};
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** The address visitors are told to write to: the mailbox that receives
 *  enquiries (MAIL_TO), falling back to the address in config/site.ts. */
export function contactEmail(): string {
  return process.env.MAIL_TO || siteConfig.contact.email;
}

/** Optional "name, company number, registered office" line for email footers. */
export function companyLine(): string | null {
  const r = siteConfig.regulatory as Record<string, unknown>;
  const c = r.company as
    | { name?: string; number?: string; registeredOffice?: string }
    | undefined;
  if (!c || !c.name || !c.number || !c.registeredOffice) return null;
  return `${c.name}. Company Registration Number: ${c.number}. Registered Office: ${c.registeredOffice}.`;
}

/** Optional firm-status line (set in config/site.ts by the compliance review). */
export function regulatoryStatement(): string | null {
  const r = siteConfig.regulatory as Record<string, unknown>;
  return typeof r.statement === "string" && r.statement ? r.statement : null;
}

export type EmailRow = readonly [label: string, value: string];

/** Label/value rows with thin dividers. */
export function detailsTable(rows: readonly EmailRow[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows
    .map(
      ([k, v], i) =>
        `<tr><td style="padding:11px 12px 11px 0;font-family:${FONT};font-size:14px;color:${C.muted};${
          i < rows.length - 1 ? `border-bottom:1px solid ${C.border};` : ""
        }">${escapeHtml(k)}</td><td align="right" style="padding:11px 0;font-family:${FONT};font-size:14px;font-weight:600;color:${C.ink};${
          i < rows.length - 1 ? `border-bottom:1px solid ${C.border};` : ""
        }">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

/** The one big number, with a gold edge. */
export function highlightCard(label: string, value: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 26px;"><tr><td style="background:${C.surface};border:1px solid ${C.border};border-left:5px solid ${C.gold};border-radius:8px;padding:20px 22px;"><div style="font-family:${FONT};font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:${C.muted};">${escapeHtml(label)}</div><div style="font-family:${FONT};font-size:36px;line-height:1.15;font-weight:800;color:${C.black};margin-top:6px;">${escapeHtml(value)}</div></td></tr></table>`;
}

/** Gold call-to-action button (bulletproof: a padded link inside a cell). */
export function button(href: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 6px;"><tr><td style="background:${C.gold};border-radius:8px;"><a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:15px;font-weight:700;color:${C.black};text-decoration:none;">${escapeHtml(text)}</a></td></tr></table>`;
}

/** A tinted callout box. */
export function callout(html: string, tone: "ok" | "warn" | "info" = "info"): string {
  const edge = tone === "ok" ? C.success : tone === "warn" ? C.warn : C.gold;
  const bg = tone === "ok" ? "#ecfdf5" : tone === "warn" ? "#fffbeb" : C.goldLight;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr><td style="background:${bg};border-left:4px solid ${edge};border-radius:6px;padding:12px 16px;font-family:${FONT};font-size:14px;line-height:1.5;color:${C.ink};">${html}</td></tr></table>`;
}

export function paragraph(text: string, opts?: { muted?: boolean; small?: boolean }): string {
  return `<p style="margin:0 0 16px;font-family:${FONT};font-size:${opts?.small ? 13 : 15}px;line-height:1.6;color:${opts?.muted ? C.muted : C.ink};">${text}</p>`;
}

export function sectionHeading(text: string): string {
  return `<h2 style="margin:26px 0 8px;font-family:${FONT};font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:${C.muted};font-weight:700;">${escapeHtml(text)}</h2>`;
}

type Shell = {
  /** Hidden preview line shown beside the subject in inboxes. */
  preheader: string;
  heading: string;
  subheading?: string;
  /** Pre-built, already-escaped HTML. */
  body: string;
  /** Pre-built, already-escaped HTML for the grey footer. */
  footer: string;
};

export function emailShell(o: Shell): string {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(o.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${escapeHtml(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${C.border};border-radius:12px;overflow:hidden;">
<tr><td align="center" style="background:${C.black};padding:28px 24px 24px;border-bottom:4px solid ${C.gold};"><img src="cid:${LOGO_CID}" width="190" alt="${escapeHtml(siteConfig.shortName)}" style="display:block;width:190px;max-width:100%;height:auto;border:0;"></td></tr>
<tr><td style="padding:34px 32px 6px;"><h1 style="margin:0;font-family:${FONT};font-size:26px;line-height:1.25;font-weight:800;color:${C.black};">${escapeHtml(o.heading)}</h1>${
    o.subheading
      ? `<p style="margin:8px 0 0;font-family:${FONT};font-size:15px;line-height:1.5;color:${C.muted};">${escapeHtml(o.subheading)}</p>`
      : ""
  }</td></tr>
<tr><td style="padding:22px 32px 34px;">${o.body}</td></tr>
<tr><td style="background:${C.surface};border-top:1px solid ${C.border};padding:22px 32px;">${o.footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Standard grey footer: warning, firm line, optional regulatory statement. */
export function standardFooter(opts?: { warning?: boolean }): string {
  const parts: string[] = [];
  if (opts?.warning !== false) {
    parts.push(
      `<p style="margin:0 0 12px;font-family:${FONT};font-size:13px;line-height:1.5;font-weight:700;color:${C.ink};">${escapeHtml(siteConfig.regulatory.repossessionWarning)}</p>`,
    );
  }
  parts.push(
    `<p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.5;color:${C.muted};">${escapeHtml(siteConfig.name)} &middot; <a href="mailto:${escapeHtml(contactEmail())}" style="color:${C.muted};">${escapeHtml(contactEmail())}</a></p>`,
  );
  const company = companyLine();
  if (company) {
    parts.push(
      `<p style="margin:12px 0 0;font-family:${FONT};font-size:11px;line-height:1.5;color:${C.soft};">${escapeHtml(company)}</p>`,
    );
  }
  const statement = regulatoryStatement();
  if (statement) {
    parts.push(
      `<p style="margin:12px 0 0;font-family:${FONT};font-size:11px;line-height:1.5;color:${C.soft};">${escapeHtml(statement)}</p>`,
    );
  }
  return parts.join("");
}
