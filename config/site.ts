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
    phone: "07854 981155",
    phoneHref: "tel:+447854981155",
    email: "hello@mortgagevista.co.uk",
    whatsapp: "447854981155",
    // Matches the registered office at Companies House (16883097). Shown
    // on the Contact page and in the LocalBusiness JSON-LD so Google can
    // link the business to a verified UK address.
    addressLine1: "2 Blacksmiths Lane",
    city: "Rainham",
    region: "Essex",
    postcode: "RM13 7AD",
    country: "United Kingdom",
  },

  hours: [
    { day: "Mon – Fri", time: "9:00 – 18:00" },
    { day: "Saturday", time: "10:00 – 14:00" },
    { day: "Sunday", time: "By appointment" },
  ],

  // Social profiles intentionally empty: no accounts set up yet. Add URLs
  // here when they exist; the footer and JSON-LD will pick them up.
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
  },

  /**
   * Regulatory status.
   *
   * MortgageVista Limited is an Appointed Representative of TMG Direct
   * Limited (the principal firm, FRN 786245). The statement below is the
   * wording supplied by TMG Direct's compliance team; it is shown in the
   * footer, the legal pages and the emails.
   *
   * If this ever changes (e.g. the firm gains its own FCA direct
   * authorisation), update the statement and company details below as
   * well as the legal pages.
   */
  regulatory: {
    principal: {
      name: "TMG Direct Limited",
      fcaFrn: "786245",
      icoNumber: "ZA178200",
    },
    fcaRegisterUrl: "https://register.fca.org.uk/",
    /**
     * The full disclosure statement, rendered verbatim in the footer and
     * the regulatory-disclosure page. Supplied by the compliance review.
     */
    statement:
      "MortgageVista Limited is registered with the Data Protection Act 2018 registration No. 00012631529 and is authorised and regulated by the Financial Conduct Authority under Firm Reference Number. 1054842 an Appointed Representative of TMG Direct Limited which is authorised and regulated by the Financial Conduct Authority under Firm Reference Number: 786245 and registered with the Data Protection Act 1998 Registration No: ZA178200.",
    /**
     * Company details required on business websites and emails. The number
     * and registered office were checked against Companies House
     * (MORTGAGEVISTA LIMITED, 16883097, incorporated 1 December 2025).
     */
    company: {
      name: "MortgageVista Limited",
      number: "16883097",
      registeredOffice: "2 Blacksmiths Lane, Rainham, Essex, RM13 7AD",
    },
    /** Expanded repossession warning. Required on every page footer. */
    repossessionWarning:
      "Think carefully before securing debts against your home. Your home may be repossessed if you do not keep up repayments on a mortgage or any other debt secured on it.",
    /** UK scope disclosure. Required on every page footer. */
    scopeNotice:
      "The guidance and/or advice contained within this website is subject to the UK regulatory regime and is therefore targeted at consumers based in the UK.",
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
