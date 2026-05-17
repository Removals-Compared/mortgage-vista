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
      <p>
        {siteConfig.name} is authorised and regulated by the Financial Conduct
        Authority (FCA). Our Firm Reference Number is{" "}
        <strong>{siteConfig.regulatory.fcaFrn}</strong>. You can verify our
        authorisation on the FCA Register at{" "}
        <a
          href={siteConfig.regulatory.fcaRegisterUrl}
          target="_blank"
          rel="noreferrer"
        >
          register.fca.org.uk
        </a>
        .
      </p>

      <h2>2. Permitted activities</h2>
      <p>We are authorised to:</p>
      <ul>
        <li>Advise on regulated mortgage contracts</li>
        <li>Arrange (bring about) regulated mortgage contracts</li>
        <li>Advise on and arrange equity release products</li>
        <li>Make introductions to insurance providers</li>
      </ul>
      <p>
        [CLIENT TO CONFIRM: list any additional permissions held, e.g.
        consumer credit, investment advice, protection, second-charge
        lending.]
      </p>

      <h2>3. Whole-of-market or panel?</h2>
      <p>
        For regulated mortgages we offer a comprehensive range of mortgages
        from across the market, sometimes referred to as &quot;whole of
        market&quot;. For equity release, we offer products from a panel of
        lenders that meet Equity Release Council standards.
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

      <h2>6. Equity release warning</h2>
      <p>{siteConfig.regulatory.equityReleaseWarning}</p>

      <h2>7. Complaints and the Financial Ombudsman Service</h2>
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

      <h2>8. Financial Services Compensation Scheme (FSCS)</h2>
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

      <h2>9. Data protection</h2>
      <p>
        We are registered with the Information Commissioner&apos;s Office under
        registration number <strong>{siteConfig.regulatory.icoNumber}</strong>.
        See our <a href="/privacy-policy">Privacy Policy</a> for full details.
      </p>

      <h2>10. Company information</h2>
      <p>
        {siteConfig.name} is registered in England and Wales under company
        number <strong>{siteConfig.regulatory.companyNumber}</strong>. Our
        registered office is {siteConfig.contact.addressLine1},{" "}
        {siteConfig.contact.city} {siteConfig.contact.postcode}.
      </p>
    </>
  );
}
