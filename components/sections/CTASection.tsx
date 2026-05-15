import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function CTASection({
  title = "Ready to talk to an adviser?",
  body = "Book a free 20-minute consultation. We'll review your situation, model the numbers, and tell you honestly what's possible.",
  primaryHref = "/contact",
  primaryLabel = "Get a free quote",
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <Section bg="black" className="py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-white/70">{body}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryHref}>
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/40"
            >
              <PhoneCall className="h-4 w-4" /> Call us instead
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
