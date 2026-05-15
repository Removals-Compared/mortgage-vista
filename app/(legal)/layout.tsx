import { Container, Section } from "@/components/ui/Container";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section bg="white">
      <Container className="max-w-3xl">
        <article className="prose prose-lg max-w-none [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-brand-ink [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-brand-ink [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-brand-muted [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_li]:text-brand-muted [&_strong]:text-brand-ink [&_a]:font-semibold [&_a]:text-brand-ink [&_a]:underline">
          {children}
        </article>
      </Container>
    </Section>
  );
}
