import { siteConfig } from "@/config/site";
import { escapeHtml } from "@/lib/mail";

type ResultsType = "repayment" | "affordability" | "stamp-duty";
type Kind = "gbp" | "gbp2" | "years" | "percent" | "number" | "yesno";

const FIELDS: Record<ResultsType, { title: string; rows: [string, string, Kind][] }> = {
  repayment: {
    title: "Monthly repayment",
    rows: [
      ["propertyPrice", "Property price", "gbp"],
      ["deposit", "Deposit", "gbp"],
      ["term", "Term", "years"],
      ["rate", "Interest rate", "percent"],
      ["interestOnly", "Interest only", "yesno"],
      ["monthly", "Estimated monthly payment", "gbp2"],
    ],
  },
  affordability: {
    title: "Affordability",
    rows: [
      ["income1", "Income (applicant 1)", "gbp"],
      ["income2", "Income (applicant 2)", "gbp"],
      ["outgoings", "Monthly outgoings", "gbp"],
      ["credit", "Credit commitments", "gbp"],
      ["dependants", "Dependants", "number"],
      ["maxBorrowing", "Estimated maximum borrowing", "gbp"],
    ],
  },
  "stamp-duty": {
    title: "Stamp Duty",
    rows: [
      ["price", "Property price", "gbp"],
      ["firstTimeBuyer", "First-time buyer", "yesno"],
      ["additional", "Additional property", "yesno"],
      ["nonResident", "Non-UK resident", "yesno"],
      ["total", "Estimated Stamp Duty", "gbp"],
    ],
  },
};

function fmt(v: unknown, kind: Kind): string | null {
  if (v === undefined || v === null || v === "") return null;
  if (kind === "yesno") return v === true || v === "true" ? "Yes" : "No";
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  switch (kind) {
    case "gbp":
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(n);
    case "gbp2":
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(n);
    case "years":
      return `${n} years`;
    case "percent":
      return `${n}%`;
    default:
      return String(n);
  }
}

export function buildCalculatorEmail(
  type: ResultsType,
  payload: Record<string, unknown>,
): { subject: string; text: string; html: string } {
  const def = FIELDS[type];
  // Only known keys are rendered; anything else in the payload is ignored.
  const rows = def.rows
    .map(([key, label, kind]) => [label, fmt(payload[key], kind)] as const)
    .filter((r): r is readonly [string, string] => r[1] !== null);

  const disclaimer =
    "This is an illustration based on the figures you entered. It is not a personal recommendation or a mortgage offer, and lenders' criteria and rates change. Speak to one of our advisers for advice tailored to you.";
  const warning = siteConfig.regulatory.repossessionWarning;
  const subject = `Your ${def.title.toLowerCase()} results from ${siteConfig.shortName}`;

  const text = [
    `Here are your ${def.title.toLowerCase()} results from ${siteConfig.name}.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    disclaimer,
    "",
    warning,
    "",
    `${siteConfig.name} · ${siteConfig.contact.email}`,
  ].join("\n");

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111; max-width: 560px;">
      <h2 style="margin: 0 0 6px;">Your ${escapeHtml(def.title.toLowerCase())} results</h2>
      <p style="margin: 0 0 16px; color: #555;">From ${escapeHtml(siteConfig.name)}</p>
      <table style="border-collapse: collapse; width: 100%;">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding: 6px 12px 6px 0; color: #555; border-bottom: 1px solid #eee;">${escapeHtml(k)}</td><td style="padding: 6px 0; text-align: right; border-bottom: 1px solid #eee;"><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin: 18px 0 8px; color: #555; font-size: 13px;">${escapeHtml(disclaimer)}</p>
      <p style="margin: 0 0 14px; font-size: 13px;"><strong>${escapeHtml(warning)}</strong></p>
      <p style="margin: 0; color: #777; font-size: 12px;">${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.contact.email)}</p>
    </div>`;

  return { subject, text, html };
}
