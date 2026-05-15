import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.body);
  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-brand-black text-white">
          <Container className="py-14 sm:py-20">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> All insights
            </Link>
            <span className="mt-6 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              {post.category}
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-3 text-sm text-white/70">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  dateStyle: "long",
                })}
              </span>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </Container>
        </header>

        <Section bg="white">
          <Container className="max-w-3xl">
            <div
              className="post-content prose prose-lg max-w-none text-brand-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-brand-muted [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_li]:text-brand-muted [&_a]:font-semibold [&_a]:text-brand-ink [&_a]:underline [&_strong]:text-brand-ink [&_blockquote]:border-l-4 [&_blockquote]:border-brand-gold [&_blockquote]:pl-4 [&_blockquote]:italic"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Container>
        </Section>
      </article>

      {others.length > 0 && (
        <Section bg="surface">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-bold text-brand-ink">Read next</h2>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-ink"
              >
                All insights <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insights/${p.slug}`}
                  className="group rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-black"
                >
                  <span className="rounded-full bg-brand-divider px-3 py-1 text-xs font-semibold text-brand-ink">
                    {p.category}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brand-ink group-hover:underline">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-brand-muted">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTASection
        title="Want this kind of advice for your situation?"
        body="A 20-minute call with one of our advisers usually answers most of it. Free, no obligation."
      />
    </>
  );
}
