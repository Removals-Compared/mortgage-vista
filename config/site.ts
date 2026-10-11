/**
 * Single source of truth for company contact details, legal info,
 * and brand metadata. Update these placeholders with the client's
 * real details before going live.
 */

export const siteConfig = {
  name: "Mortgage Vista Limited",
  shortName: "Mortgage Vista",
  description:
    "Whole-of-market UK mortgage brokers. Free initial consultations, expert advice on first-time buyer, remortgage, buy-to-let, self-employed and bad credit mortgages.",
  url: "https://www.mortgagevista.co.uk", // TODO: update with live domain
  ogImage: "/og-image.png",

  contact: {
    /* TODO: replace placeholders with the client's real details */
    phone: "[CLIENT TO PROVIDE]",
    phoneHref: "tel:+440000000000",
    email: "hello@mortgagevista.co.uk",
    whatsapp: "447000000000",
    addressLine1: "[CLIENT TO PROVIDE]",
    addressLine2: "[CLIENT TO PROVIDE]",
    city: "London",
    postcode: "[CLIENT TO PROVIDE]",
    country: "United Kingdom",
  },

  hours: [
    { day: "Mon – Fri", time: "9:00 – 18:00" },
    { day: "Saturday", time: "10:00 – 14:00" },
    { day: "Sunday", time: "By appointment" },
  ],

  social: {
    linkedin: "https://www.linkedin.com/company/mortgage-vista", // TODO
    facebook: "https://www.facebook.com/mortgagevista", // TODO
    instagram: "https://www.instagram.com/mortgagevista", // TODO
  },

  /**
   * FCA & regulatory placeholders.
   * IMPORTANT: do not invent an FRN. Replace with the client's real
   * Firm Reference Number issued by the Financial Conduct Authority.
   */
  regulatory: {
    fcaFrn: "[FRN PLACEHOLDER: replace with real number]",
    fcaRegisterUrl: "https://register.fca.org.uk/",
    companyNumber: "[COMPANIES HOUSE NO. PLACEHOLDER]",
    icoNumber: "[ICO REGISTRATION PLACEHOLDER]",
    /** Repossession warning. Required on every page footer. */
    repossessionWarning:
      "Your home may be repossessed if you do not keep up repayments on your mortgage.",
    equityReleaseWarning:
      "Equity release will reduce the value of your estate and may affect your entitlement to means-tested benefits. Always consider the long-term impact and consult a qualified adviser.",
    feeDisclosure:
      "Initial consultations are free. We may charge a fee for arranging your mortgage which will be confirmed before any work begins.",
  },

  stats: {
    yearsExperience: 18,
    lenderPanel: "90+",
    averageSavings: "£3,400",
    happyClients: "98%",
  },
} as const;

export type SiteConfig = typeof siteConfig;
