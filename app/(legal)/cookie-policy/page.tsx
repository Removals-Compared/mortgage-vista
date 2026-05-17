import { siteConfig } from "@/config/site";

export const metadata = { title: "Cookie Policy" };

export default function CookiePolicy() {
  return (
    <>
      <h1>Cookie Policy</h1>
      <p>
        <em>Last updated: [DATE PLACEHOLDER]</em>
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device by websites you
        visit. They are widely used to make sites work, or work more
        efficiently, and to provide information to site owners.
      </p>

      <h2>How we use cookies</h2>
      <p>
        We group cookies into three categories. You can change your
        preferences at any time using the cookie banner or by clearing your
        browser&apos;s cookies for this site.
      </p>

      <h3>Strictly necessary cookies</h3>
      <p>
        These cookies are required for the website to function. They include
        cookies that remember your cookie preferences, keep you logged in to
        the client portal, and protect form submissions from automated abuse.
        These cannot be turned off in our preference centre.
      </p>

      <h3>Analytics cookies</h3>
      <p>
        We use analytics cookies (e.g. Google Analytics 4) to understand how
        visitors interact with our site so we can improve it. These cookies
        only run if you opt in via the cookie banner. They collect aggregated,
        anonymised data such as page views, time on page, and referrer.
      </p>

      <h3>Marketing cookies</h3>
      <p>
        Marketing cookies are set by advertising partners (e.g. Meta, LinkedIn,
        Google Ads) to show you relevant adverts on other sites. These cookies
        only run if you explicitly opt in.
      </p>

      <h2>Managing your preferences</h2>
      <ul>
        <li>
          Use the cookie preference centre at the bottom-right of any page
          (the cookie icon) to update your settings.
        </li>
        <li>
          You can also block or delete cookies via your browser settings. See
          the help section of your browser for instructions.
        </li>
      </ul>

      <h2>Third-party cookies</h2>
      <p>
        Some pages may include content from third parties (e.g. embedded Google
        Maps, video providers). These services may set their own cookies which
        we do not control. Refer to the relevant provider&apos;s privacy policy.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this cookie policy from time to time. The date of the
        most recent update is shown at the top.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about how we use cookies, please email us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </>
  );
}
