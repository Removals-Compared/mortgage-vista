import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { getAllPosts, categories } from "@/lib/posts";
import { CategoryFilter } from "./CategoryFilter";

export const metadata = {
  title: "Insights — UK Mortgage Market News & Buyer Guides",
  description:
    "Mortgage market commentary, buyer guides, remortgaging strategy, and self-employed lending insights — written by FCA-regulated UK advisers.",
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await getAllPosts();
  const filtered = category
    ? posts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : posts;

  return (
    <>
      <div className="bg-brand-black text-white">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Insights & guides
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Practical UK mortgage writing
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Market commentary, buyer guides, and behind-the-scenes notes from
            our advisers&apos; live caseloads. No SEO filler — every article
            was written because we got asked the same question often enough.
          </p>
        </Container>
      </div>

      <Section bg="surface">
        <Container>
          <CategoryFilter active={category} categories={[...categories]} />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-black"
              >
                <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-brand-divider to-brand-border" aria-hidden />
                <div className="mt-5 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-brand-divider px-3 py-1 font-semibold text-brand-ink">
                    {p.category}
                  </span>
                  <span className="text-brand-muted">{p.readingTime}</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-brand-ink group-hover:underline">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-brand-muted line-clamp-3">
                  {p.excerpt}
                </p>
                <div className="mt-auto pt-5 flex items-center justify-between text-xs text-brand-muted">
                  <span>{p.author}</span>
                  <span>{new Date(p.date).toLocaleDateString("en-GB", { dateStyle: "long" })}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-brand-border bg-white p-10 text-center text-brand-muted">
              No articles in this category yet — check back soon.
            </div>
          )}
        </Container>
      </Section>

      <CTASection
        title="Got a question we haven't answered yet?"
        body="If your situation isn't covered above, ask us — we'll either point you to the right adviser or write a piece on it."
      />
    </>
  );
}
