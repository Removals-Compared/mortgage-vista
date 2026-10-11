import { siteConfig } from "@/config/site";
import {
  button,
  callout,
  contactEmail,
  detailsTable,
  emailShell,
  escapeHtml,
  highlightCard,
  paragraph,
  regulatoryStatement,
  sectionHeading,
  standardFooter,
} from "@/lib/email-template";

type ResultsType = "repayment" | "affordability" | "stamp-duty";
type Kind = "gbp" | "gbp2" | "years" | "percent" | "number" | "yesno";

const FIELDS: Record<
  ResultsType,
  {
    title: string;
    intro: string;
    /** The key result, shown large at the top. */
    headline: { key: string; label: string; kind: Kind };
    rows: [string, string, Kind][];
  }
> = {
  repayment: {
    title: "Monthly repayment",
    intro: "Here is the monthly repayment you worked out on our calculator.",
    headline: { key: "monthly", label: "Estimated monthly payment", kind: "gbp2" },
    rows: [
      ["propertyPrice", "Property price", "gbp"],
      ["deposit", "Deposit", "gbp"],
      ["term", "Term", "years"],
      ["rate", "Interest rate", "percent"],
      ["interestOnly", "Interest only", "yesno"],
    ],
  },
  affordability: {
    title: "Affordability",
    intro: "Here is the borrowing estimate you worked out on our calculator.",
    headline: { key: "maxBorrowing", label: "Estimated maximum borrowing", kind: "gbp" },
    rows: [
      ["income1", "Income (applicant 1)", "gbp"],
      ["income2", "Income (applicant 2)", "gbp"],
      ["outgoings", "Monthly outgoings", "gbp"],
      ["credit", "Credit commitments", "gbp"],
      ["dependants", "Dependants", "number"],
    ],
  },
  "stamp-duty": {
    title: "Stamp Duty",
    intro: "Here is the Stamp Duty estimate you worked out on our calculator.",
    headline: { key: "total", label: "Estimated Stamp Duty", kind: "gbp" },
    rows: [
      ["price", "Property price", "gbp"],
      ["firstTimeBuyer", "First-time buyer", "yesno"],
      ["additional", "Additional property", "yesno"],
      ["nonResident", "Non-UK resident", "yesno"],
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

const DISCLAIMER =
  "This is an illustration based on the figures you entered. It is not a personal recommendation or a mortgage offer, and lenders' criteria and rates change. Speak to one of our advisers for advice tailored to you.";

export function buildCalculatorEmail(
  type: ResultsType,
  payload: Record<string, unknown>,
): { subject: string; text: string; html: string } {
  const def = FIELDS[type];
  // Only known keys are rendered; anything else in the payload is ignored.
  const rows = def.rows
    .map(([key, label, kind]) => [label, fmt(payload[key], kind)] as const)
    .filter((r): r is readonly [string, string] => r[1] !== null);
  const headlineValue = fmt(payload[def.headline.key], def.headline.kind);

  const warning = siteConfig.regulatory.repossessionWarning;
  const subject = `Your ${def.title.toLowerCase()} results from ${siteConfig.shortName}`;
  const to = contactEmail();
  const statement = regulatoryStatement();

  const text = [
    `Here are your ${def.title.toLowerCase()} results from ${siteConfig.name}.`,
    "",
    ...(headlineValue ? [`${def.headline.label}: ${headlineValue}`, ""] : []),
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    DISCLAIMER,
    "",
    warning,
    "",
    `Questions? Email an adviser: ${to}`,
    "",
    `${siteConfig.name}`,
    ...(statement ? ["", statement] : []),
  ].join("\n");

  const body = [
    paragraph(escapeHtml(def.intro)),
    headlineValue ? highlightCard(def.headline.label, headlineValue) : "",
    rows.length ? sectionHeading("Your figures") + detailsTable(rows) : "",
    paragraph(
      "Want to talk it through? One of our advisers can look at your circumstances and search the whole market for you. The first conversation is free.",
    ).replace("margin:0 0 16px", "margin:26px 0 0"),
    button(
      `mailto:${to}?subject=${encodeURIComponent(`${def.title} enquiry`)}`,
      "Email an adviser",
    ),
    callout(escapeHtml(DISCLAIMER), "info").replace("margin:0 0 22px", "margin:26px 0 0"),
  ].join("");

  const html = emailShell({
    preheader: headlineValue
      ? `${def.headline.label}: ${headlineValue}. Your ${def.title.toLowerCase()} results.`
      : `Your ${def.title.toLowerCase()} results.`,
    heading: `Your ${def.title.toLowerCase()} results`,
    subheading: `From ${siteConfig.name}`,
    body,
    footer: standardFooter(),
  });

  return { subject, text, html };
}

/** Short internal notice for the advisers' inbox when someone uses a
 *  calculator's "email me my results" box (a low-intent lead). */
export function buildCalculatorLeadNotice(
  type: ResultsType,
  visitorEmail: string,
  payload: Record<string, unknown>,
): { subject: string; text: string; html: string } {
  const def = FIELDS[type];
  const headlineValue = fmt(payload[def.headline.key], def.headline.kind);
  const rows: [string, string][] = [
    ["Email", visitorEmail],
    ["Calculator", def.title],
    ...(headlineValue ? ([[def.headline.label, headlineValue]] as [string, string][]) : []),
    ...def.rows
      .map(([key, label, kind]) => [label, fmt(payload[key], kind)] as const)
      .filter((r): r is readonly [string, string] => r[1] !== null)
      .map((r) => [r[0], r[1]] as [string, string]),
  ];

  const subject = `[${siteConfig.shortName}] Calculator lead: ${visitorEmail}`;
  const text = [
    `Someone emailed themselves their ${def.title.toLowerCase()} results.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "They have been sent their results. Reply to this email to contact them: their address is set as Reply-To.",
  ].join("\n");
  const html = emailShell({
    preheader: `${visitorEmail} used the ${def.title.toLowerCase()} calculator`,
    heading: "New calculator lead",
    subheading: `${visitorEmail} emailed themselves their ${def.title.toLowerCase()} results`,
    body:
      detailsTable(rows) +
      paragraph(
        "They have already been sent their results. Reply to this email to contact them: their address is set as Reply-To.",
        { muted: true, small: true },
      ).replace("margin:0 0 16px", "margin:22px 0 0"),
    footer: paragraph(`Sent automatically by the ${escapeHtml(siteConfig.shortName)} website.`, {
      muted: true,
      small: true,
    }).replace("margin:0 0 16px", "margin:0"),
  });
  return { subject, text, html };
}
