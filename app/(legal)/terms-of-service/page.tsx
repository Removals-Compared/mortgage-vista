import { siteConfig } from "@/config/site";

export const metadata = { title: "Terms of Service" };

export default function TermsOfService() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p>
        <em>Last updated: [DATE PLACEHOLDER]</em>
      </p>

      <h2>1. Who we are</h2>
      <p>
        These terms govern your use of {siteConfig.name} (&quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;). {siteConfig.regulatory.statement}
      </p>

      <h2>2. Use of this website</h2>
      <p>
        By accessing this website you agree to be bound by these terms. If you
        do not agree, please do not use the site.
      </p>
      <ul>
        <li>You may use the site for personal, non-commercial purposes only.</li>
        <li>
          You may not copy, redistribute, scrape, or republish content without
          our written permission.
        </li>
        <li>
          You may not attempt to interfere with the site&apos;s normal operation
          or use automated systems to extract data.
        </li>
      </ul>

      <h2>3. Information on this site</h2>
      <p>
        Information on this website is provided in good faith and for general
        guidance only. It does not constitute regulated financial advice and
        should not be relied on as such. Regulated mortgage advice is provided
        only after an initial consultation, fact-find, and personalised
        suitability assessment.
      </p>
      <p>
        Calculator outputs are indicative. Actual mortgage rates, monthly
        payments, and stamp-duty figures depend on lender criteria,
        underwriting, and the specific product available at the time of
        application.
      </p>

      <h2>4. Mortgage advice services</h2>
      <p>
        When you instruct us to provide mortgage advice, the relationship is
        governed by a separate Client Agreement and Initial Disclosure Document
        (IDD), provided to you in writing before we undertake any chargeable
        work.
      </p>
      <p>
        {siteConfig.regulatory.feeDisclosure} Where a fee applies, the amount
        and timing will be confirmed in writing in the Client Agreement.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        All content on this website (text, images, calculators, source code) is
        owned by {siteConfig.name} or licensed to us. You may print or download
        extracts for your personal, non-commercial use, but may not modify
        them or use them commercially without our written permission.
      </p>

      <h2>6. Third-party links</h2>
      <p>
        This website may contain links to third-party websites. We do not
        endorse and are not responsible for the content of those sites.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        Nothing in these terms limits or excludes our liability for fraud,
        death or personal injury caused by negligence, or any other liability
        which cannot lawfully be limited or excluded.
      </p>
      <p>
        Subject to the above, we will not be liable for any indirect or
        consequential loss arising from your use of this website or reliance
        on its content.
      </p>

      <h2>8. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Your continued use of the
        website after changes are posted constitutes acceptance of the revised
        terms.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales and any
        disputes will be subject to the exclusive jurisdiction of the English
        courts.
      </p>

      <h2>10. Complaints</h2>
      <p>
        If you have a complaint about our service, please see our{" "}
        <a href="/complaints-procedure">Complaints Procedure</a>.
      </p>

      <h2>11. Repossession warning</h2>
      <p>
        <strong>{siteConfig.regulatory.repossessionWarning}</strong>
      </p>
    </>
  );
}
