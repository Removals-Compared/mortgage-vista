import { siteConfig } from "@/config/site";

type Props = { data: Record<string, unknown> | Array<Record<string, unknown>> };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organisationSchema() {
  // Only emit non-empty social URLs so empty strings don't show up in
  // Google's Knowledge Graph as broken sameAs references.
  const sameAs = [
    siteConfig.social.linkedin,
    siteConfig.social.facebook,
    siteConfig.social.instagram,
  ].filter((u) => u.length > 0);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FinancialService"],
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.addressLine1,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postcode,
      addressCountry: "GB",
    },
    priceRange: "Free initial consultation",
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }
  return schema;
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  } satisfies Record<string, unknown>;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  } satisfies Record<string, unknown>;
}

export function articleSchema({
  title,
  description,
  date,
  author,
  url,
}: {
  title: string;
  description: string;
  date: string;
  author: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  } satisfies Record<string, unknown>;
}
