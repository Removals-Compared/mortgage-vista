import { siteConfig } from "@/config/site";

export const metadata = { title: "Complaints Procedure" };

export default function ComplaintsPage() {
  return (
    <>
      <h1>Complaints Procedure</h1>
      <p>
        <em>Last updated: [DATE PLACEHOLDER]</em>
      </p>

      <p>
        We take complaints seriously. If you are unhappy with any aspect of
        our service, please follow the procedure below. Our objective is to
        resolve every complaint fairly, promptly, and at the earliest
        opportunity.
      </p>

      <h2>1. How to make a complaint</h2>
      <p>You can raise a complaint with us in any of the following ways:</p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
        </li>
        <li>
          <strong>Post:</strong> Compliance Officer, {siteConfig.name},{" "}
          {siteConfig.contact.addressLine1}, {siteConfig.contact.city}{" "}
          {siteConfig.contact.postcode}
        </li>
        <li>
          <strong>Phone:</strong> {siteConfig.contact.phone}
        </li>
      </ul>
      <p>
        Please include: your full name, contact details, your case reference
        if known, a clear description of the issue, and the outcome you are
        seeking.
      </p>

      <h2>2. What happens next</h2>
      <ul>
        <li>
          We will acknowledge your complaint <strong>within five business days</strong>{" "}
          and confirm the name of the person handling it.
        </li>
        <li>
          We will investigate your complaint and aim to provide a final
          response <strong>within four weeks</strong>.
        </li>
        <li>
          If we cannot complete the investigation within four weeks, we will
          send you a holding response explaining why and when we expect to
          conclude.
        </li>
        <li>
          We must provide a final response within{" "}
          <strong>eight weeks</strong> at the latest.
        </li>
      </ul>

      <h2>3. If you remain unhappy</h2>
      <p>
        If you are dissatisfied with our final response, or we have not
        provided one within eight weeks, you can refer your complaint to the
        Financial Ombudsman Service (FOS) free of charge:
      </p>
      <ul>
        <li>
          <strong>Website:</strong>{" "}
          <a
            href="https://www.financial-ombudsman.org.uk/"
            target="_blank"
            rel="noreferrer"
          >
            financial-ombudsman.org.uk
          </a>
        </li>
        <li>
          <strong>Phone:</strong> 0800 023 4567 (free from most landlines and
          mobiles)
        </li>
        <li>
          <strong>Post:</strong> Financial Ombudsman Service, Exchange Tower,
          London E14 9SR
        </li>
      </ul>
      <p>
        You must refer the matter to the FOS within six months of receiving
        our final response.
      </p>

      <h2>4. Online dispute resolution</h2>
      <p>
        If you bought our services online, you may also use the European
        Commission&apos;s Online Dispute Resolution platform at{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>5. Financial Services Compensation Scheme (FSCS)</h2>
      <p>
        We are covered by the FSCS. You may be entitled to compensation from
        the scheme if we cannot meet our obligations. Most types of investment
        business are covered up to a maximum limit of £85,000. Further
        information is available at{" "}
        <a href="https://www.fscs.org.uk/" target="_blank" rel="noreferrer">
          fscs.org.uk
        </a>
        .
      </p>
    </>
  );
}
