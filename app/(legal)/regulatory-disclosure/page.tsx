import { siteConfig } from "@/config/site";

export const metadata = { title: "Regulatory Disclosure" };

export default function RegulatoryDisclosure() {
  return (
    <>
      <h1>Regulatory Disclosure</h1>
      <p>
        <em>Last updated: [DATE PLACEHOLDER]</em>
      </p>

      <h2>1. Authorisation</h2>
      <p>{siteConfig.regulatory.statement}</p>
      <p>
        You can verify this on the FCA Register at{" "}
        <a
          href={siteConfig.regulatory.fcaRegisterUrl}
          target="_blank"
          rel="noreferrer"
        >
          register.fca.org.uk
        </a>
        .
      </p>

      <h2>2. What we advise on</h2>
      <p>Through our principal we are able to:</p>
      <ul>
        <li>Advise on regulated residential mortgage contracts</li>
        <li>Arrange (bring about) regulated residential mortgage contracts</li>
        <li>Advise on and arrange buy-to-let mortgages</li>
      </ul>
      <p>
        We do not currently advise on commercial mortgages, equity release or
        later-life lending.
      </p>

      <h2>3. Scope of service</h2>
      <p>
        For regulated mortgages we offer a comprehensive range of products
        from across the market, sometimes referred to as &quot;whole of
        market&quot;.
      </p>

      <h2>4. Our fees</h2>
      <p>
        {siteConfig.regulatory.feeDisclosure} A typical fee is{" "}
        <strong>[FEE PLACEHOLDER, e.g. £495]</strong>, payable on application.
        We will also be paid commission (a procuration fee) by the lender on
        completion. Both will be confirmed in writing in your Initial
        Disclosure Document and Client Agreement before you commit.
      </p>

      <h2>5. Repossession warning</h2>
      <p>
        <strong>{siteConfig.regulatory.repossessionWarning}</strong>
      </p>

      <h2>6. Buy-to-let</h2>
      <p>
        Buy-to-let mortgages for investment purposes are generally not
        regulated by the FCA, and therefore do not benefit from the same
        regulatory protections as residential mortgages.
      </p>

      <h2>7. Scope of advice</h2>
      <p>{siteConfig.regulatory.scopeNotice}</p>

      <h2>8. Complaints and the Financial Ombudsman Service</h2>
      <p>
        See our <a href="/complaints-procedure">Complaints Procedure</a>. You
        can also contact the Financial Ombudsman Service at{" "}
        <a
          href="https://www.financial-ombudsman.org.uk/"
          target="_blank"
          rel="noreferrer"
        >
          financial-ombudsman.org.uk
        </a>
        .
      </p>

      <h2>9. Financial Services Compensation Scheme (FSCS)</h2>
      <p>
        We are covered by the FSCS. The level of cover depends on the type of
        business and the circumstances of the claim. Mortgage advising and
        arranging is covered up to £85,000 per person, per firm. Further
        information at{" "}
        <a href="https://www.fscs.org.uk/" target="_blank" rel="noreferrer">
          fscs.org.uk
        </a>
        .
      </p>

      <h2>10. Data protection</h2>
      <p>
        Personal data collected through this website is handled by our
        principal, <strong>{siteConfig.regulatory.principal.name}</strong>,
        registered with the Information Commissioner&apos;s Office under
        registration number{" "}
        <strong>{siteConfig.regulatory.principal.icoNumber}</strong>. See our{" "}
        <a href="/privacy-policy">Privacy Policy</a> for full details.
      </p>
    </>
  );
}
