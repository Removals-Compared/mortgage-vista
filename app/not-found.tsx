import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section bg="white" className="py-32">
      <Container className="text-center max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
          404
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-brand-ink sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 text-brand-muted">
          That page doesn&apos;t exist — or it has moved. Try the homepage, or
          jump straight to the calculator.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/calculator">Open calculator</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
