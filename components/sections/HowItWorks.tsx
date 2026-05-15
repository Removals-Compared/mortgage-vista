import { Calendar, FileText, ThumbsUp, Key } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

const steps = [
  {
    icon: Calendar,
    title: "1. Free consultation",
    body: "A 20-minute call with a qualified adviser to understand your goals, finances, and timing. No fee, no obligation.",
  },
  {
    icon: FileText,
    title: "2. Application",
    body: "We compare every lender, secure your decision in principle, and submit a clean application backed by the right documents.",
  },
  {
    icon: ThumbsUp,
    title: "3. Approval",
    body: "We chase the lender, manage the valuation, and keep your solicitor in the loop until your formal mortgage offer arrives.",
  },
  {
    icon: Key,
    title: "4. Completion",
    body: "Funds released, keys collected. We stay with you for the full life of the mortgage and contact you when it&apos;s time to remortgage.",
  },
];

export function HowItWorks() {
  return (
    <Section bg="surface">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            From first call to keys in the door
          </h2>
          <p className="mt-4 text-brand-muted">
            We do the digging, the paperwork, and the chasing — so you only
            have to make decisions, not manage processes.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                className="relative rounded-2xl border border-brand-border bg-white p-6 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-black text-brand-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-brand-ink">
                  {s.title}
                </h3>
                <p
                  className="mt-2 text-sm text-brand-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
