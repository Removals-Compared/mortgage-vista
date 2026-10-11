/**
 * Site navigation structure. Update once and it propagates to header,
 * footer, mobile menu, and sitemap.
 */

export const services = [
  {
    slug: "first-time-buyer-mortgages",
    title: "First-Time Buyer Mortgages",
    short: "First-Time Buyer",
    summary: "Schemes, deposits, lenders that say yes to first-timers.",
    icon: "Home",
  },
  {
    slug: "remortgages",
    title: "Remortgages",
    short: "Remortgaging",
    summary: "Switch deals, release equity, or consolidate at the right time.",
    icon: "Repeat",
  },
  {
    slug: "buy-to-let-mortgages",
    title: "Buy-to-Let Mortgages",
    short: "Buy-to-Let",
    summary: "Portfolio landlords, first-time landlords and limited-company SPVs.",
    icon: "Building2",
  },
  {
    slug: "self-employed-mortgages",
    title: "Self-Employed Mortgages",
    short: "Self-Employed",
    summary: "Sole traders, contractors, and company directors with one year's accounts.",
    icon: "Briefcase",
  },
  {
    slug: "bad-credit-mortgages",
    title: "Bad Credit Mortgages",
    short: "Bad Credit",
    summary: "Defaults, CCJs, late payments. Specialist lenders who look at the full picture.",
    icon: "ShieldCheck",
  },
  // Commercial mortgages and equity release are intentionally not listed:
  // the firm does not currently hold the FCA permissions to advise on them.
  // Add them back here (and ensure the serviceContent entries are correct)
  // once those permissions are confirmed.
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculators" },
  { href: "#services", label: "Services", dropdown: services },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav = {
  Services: services.map((s) => ({ href: `/services/${s.slug}`, label: s.short })),
  Tools: [
    { href: "/calculator", label: "Mortgage Calculator" },
    { href: "/calculator#affordability", label: "Affordability Check" },
    { href: "/calculator#stamp-duty", label: "Stamp Duty Calculator" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/complaints-procedure", label: "Complaints Procedure" },
    { href: "/regulatory-disclosure", label: "Regulatory Disclosure" },
  ],
};
