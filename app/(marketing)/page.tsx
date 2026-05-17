import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { BaseRateBanner } from "@/components/sections/BaseRateBanner";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { MonthlyRepaymentCalculator } from "@/components/calculators/MonthlyRepaymentCalculator";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd, organisationSchema } from "@/components/seo/JsonLd";
import { getRecentPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { ratesConfig } from "@/config/rates";

export const metadata = {
  title: "UK Mortgage Brokers | First-Time Buyer, Remortgage, Buy-to-Let",
  description: siteConfig.description,
};

export default async function HomePage() {
  const posts = await getRecentPosts(3);

  return (
    <>
      <JsonLd data={organisationSchema()} />
      <Hero />
      <BaseRateBanner />

      <ServicesGrid />

      {/* Mini calculator block */}
      <Section bg="surface">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
                Try the calculator
              </p>
              <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
                Crunch the numbers in 30 seconds
              </h2>
              <p className="mt-4 text-brand-muted">
                Drop in your figures to see what your monthly payments would
                look like at today&apos;s rates. No sign-up, no email. Just the
                maths.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/calculator">
                    Open the full calculator
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-6 rounded-2xl border border-brand-border bg-white p-4 text-xs text-brand-muted">
                Default rate set to <strong className="text-brand-ink">{ratesConfig.defaultCalculatorRate}%</strong>,
                an average two-year fixed at the time of writing. Real deals
                vary by lender, credit profile and product fees.
              </div>
            </div>
            <div className="lg:col-span-8">
              <MonthlyRepaymentCalculator compact />
            </div>
          </div>
        </Container>
      </Section>

      <HowItWorks />
      <Testimonials />
      <WhyChooseUs />

      {/* Latest insights */}
      <Section bg="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
                Latest insights
              </p>
              <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
                What we&apos;re writing about this month
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/insights">All insights <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-black"
              >
                <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-brand-divider to-brand-border" aria-hidden />
                <span className="mt-5 inline-block w-fit rounded-full bg-brand-divider px-3 py-1 text-xs font-semibold text-brand-ink">
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

      <FAQ />
      <CTASection />
    </>
  );
}
