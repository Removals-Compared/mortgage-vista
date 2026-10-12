import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Mortgage Vista Limited collects, uses, stores and protects your personal data under UK GDPR and the Data Protection Act 2018.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>
        <em>
          Last updated: [DATE PLACEHOLDER]. This policy explains how{" "}
          {siteConfig.name} ({"“"}we{"”"}, {"“"}us{"”"},{" "}
          {"“"}our{"”"}) collects, uses, stores and shares your
          personal information when you visit this website or engage our
          mortgage advice services.
        </em>
      </p>

      <h2>1. Who we are</h2>
      <p>
        {siteConfig.name} is an Appointed Representative of{" "}
        <strong>{siteConfig.regulatory.principal.name}</strong>. The data
        controller for your personal information is{" "}
        {siteConfig.regulatory.principal.name}, registered with the
        Information Commissioner&apos;s Office under registration number{" "}
        <strong>{siteConfig.regulatory.principal.icoNumber}</strong> and
        authorised and regulated by the Financial Conduct Authority under
        Firm Reference Number{" "}
        <strong>{siteConfig.regulatory.principal.fcaFrn}</strong>.
      </p>
      <p>
        You can contact us about any privacy matter by email at{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>

      <h2>2. The personal data we collect</h2>
      <p>We collect the following categories of personal data:</p>
      <ul>
        <li>
          <strong>Identity and contact data</strong>: name, address,
          telephone, email, date of birth.
        </li>
        <li>
          <strong>Financial data</strong>: income, outgoings, employment
          status, bank statements, credit history, existing borrowings.
        </li>
        <li>
          <strong>Property data</strong>: property addresses, valuations,
          tenure, EPC ratings.
        </li>
        <li>
          <strong>Identity verification data</strong>: passport, driving
          licence, biometric checks (where required for anti-money-laundering
          checks).
        </li>
        <li>
          <strong>Technical data</strong>: IP address, browser type, device
          information, pages visited.
        </li>
      </ul>

      <h2>3. How we use your personal data</h2>
      <p>
        We process your personal data on the following lawful bases under UK
        GDPR Article 6:
      </p>
      <ul>
        <li>
          <strong>Contract</strong>: to provide mortgage advice and arrange a
          mortgage on your behalf.
        </li>
        <li>
          <strong>Legal obligation</strong>: to meet our regulatory
          obligations under the FCA, HMRC, and the Money Laundering
          Regulations 2017.
        </li>
        <li>
          <strong>Legitimate interests</strong>: to keep records, prevent
          fraud, and improve our service.
        </li>
        <li>
          <strong>Consent</strong>: for marketing communications, where you
          have explicitly opted in.
        </li>
      </ul>

      <h2>4. Who we share your data with</h2>
      <ul>
        <li>Mortgage lenders we approach on your behalf.</li>
        <li>
          Insurance providers, where you have asked us to advise on protection
          alongside your mortgage.
        </li>
        <li>
          Credit reference agencies (Experian, Equifax, TransUnion) when
          performing affordability and credit checks.
        </li>
        <li>
          Identity verification providers used to satisfy money-laundering
          obligations.
        </li>
        <li>HMRC and other regulators where legally required.</li>
        <li>
          Our IT and CRM service providers, under appropriate data-processing
          agreements.
        </li>
      </ul>
      <p>
        We do not sell your personal data to any third party for marketing
        purposes.
      </p>

      <h2>5. International transfers</h2>
      <p>
        We aim to keep your data within the UK and EEA. Where any processor
        operates outside these jurisdictions we ensure appropriate safeguards
        (UK Adequacy Regulations, International Data Transfer Agreement, or
        Standard Contractual Clauses) are in place.
      </p>

      <h2>6. How long we keep your data</h2>
      <p>
        We retain client records for at least <strong>six years</strong> from
        the end of our relationship, in line with FCA record-keeping
        obligations. For mortgage applications that did not proceed, we retain
        records for three years. Marketing data is held until you unsubscribe.
      </p>

      <h2>7. Your rights</h2>
      <p>You have the following rights under UK GDPR:</p>
      <ul>
        <li>To request a copy of the personal data we hold about you.</li>
        <li>To ask us to correct inaccurate data.</li>
        <li>
          To ask us to erase your data, subject to our regulatory retention
          obligations.
        </li>
        <li>To restrict or object to certain processing.</li>
        <li>To request data portability where applicable.</li>
        <li>To withdraw marketing consent at any time.</li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>

      <h2>8. Complaints</h2>
      <p>
        You have the right to complain to the Information Commissioner&apos;s
        Office at{" "}
        <a href="https://ico.org.uk/" target="_blank" rel="noreferrer">
          ico.org.uk
        </a>{" "}
        or by phone on 0303 123 1113.
      </p>

      <h2>9. Cookies</h2>
      <p>
        For details about how we use cookies, please see our{" "}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>

      <h2>10. Updates to this policy</h2>
      <p>
        We may update this policy from time to time. The date of the most
        recent update is shown at the top.
      </p>
    </>
  );
}
