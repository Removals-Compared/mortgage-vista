import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { RegulatoryNotice } from "@/components/sections/RegulatoryNotice";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { MonthlyRepaymentCalculator } from "@/components/calculators/MonthlyRepaymentCalculator";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { StampDutyCalculator } from "@/components/calculators/StampDutyCalculator";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { renderMarkdown, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { services } from "@/config/navigation";
import { serviceContent } from "@/content/services";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = serviceContent[slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = serviceContent[slug];
  if (!data) notFound();

  const html = await renderMarkdown(data.body);

  const related = await Promise.all(
    data.relatedPostSlugs.map(async (s) => await getPostBySlug(s)),
  );
  const relatedPosts = related.filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const Calculator =
    data.showsCalculator === "affordability"
      ? AffordabilityCalculator
      : data.showsCalculator === "stamp-duty"
      ? StampDutyCalculator
      : MonthlyRepaymentCalculator;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Services", url: `${siteConfig.url}/#services` },
            { name: data.title, url: `${siteConfig.url}/services/${slug}` },
          ]),
          faqSchema(data.faqs),
        ]}
      />

      {/* Hero */}
      <div className="bg-brand-black text-white">
        <Container className="py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-xs">
            <ol className="flex flex-wrap items-center gap-1 text-white/55">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href="/#services" className="hover:text-white">Services</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="text-white" aria-current="page">{data.title}</li>
            </ol>
          </nav>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            {data.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {data.hero.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            {data.hero.subheading}
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Speak to an adviser</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10">
              <Link href="/calculator">Open the calculator</Link>
            </Button>
          </div>
        </Container>
      </div>

      <Section bg="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              <article
                className="prose prose-lg max-w-none text-brand-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-brand-muted [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_li]:text-brand-muted [&_strong]:text-brand-ink [&_a]:font-semibold [&_a]:text-brand-ink [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Process steps */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-brand-ink">
                  How the process works
                </h2>
                <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                  {data.process.map((p, i) => (
                    <li
                      key={p.step}
                      className="rounded-2xl border border-brand-border bg-brand-surface p-5"
                    >
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-black text-sm font-bold text-brand-gold">
                        {i + 1}
                      </div>
                      <h3 className="mt-3 font-semibold text-brand-ink">{p.step}</h3>
                      <p className="mt-1 text-sm text-brand-muted leading-relaxed">{p.body}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Embedded calculator */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-brand-ink">
                  Run the numbers
                </h2>
                <p className="mt-2 text-brand-muted">
                  Stress-test the figures against today&apos;s rates.
                </p>
                <div className="mt-6">
                  <Calculator />
                </div>
              </div>

              {/* Equity-release-only extra warning */}
              {data.extraWarning && (
                <div className="mt-12 rounded-2xl border border-brand-gold-light bg-brand-gold-light/30 p-6 text-sm leading-relaxed text-brand-ink">
                  <strong className="block mb-2">Important warning</strong>
                  {data.extraWarning}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                  Eligibility at a glance
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {data.eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-brand-ink">
                      <Check className="h-4 w-4 text-brand-success mt-0.5 shrink-0" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-muted">
                  Get a quick callback
                </h3>
                <QuickQuoteForm context={data.title} />
              </div>

              <RegulatoryNotice
                variant={data.slug === "equity-release" ? "equity-release" : "standard"}
              />
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related insights */}
      {relatedPosts.length > 0 && (
        <Section bg="surface">
          <Container>
            <h2 className="text-2xl font-bold text-brand-ink">Related reading</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insights/${p.slug}`}
                  className="group rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-black"
                >
                  <span className="rounded-full bg-brand-divider px-3 py-1 text-xs font-semibold text-brand-ink">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-brand-ink group-hover:underline">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-muted line-clamp-3">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink">
                    Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <FAQ
        title={`${data.title}: Frequently asked`}
        items={data.faqs}
        bg="white"
      />

      <CTASection />
    </>
  );
}
