import { Globe2, HandshakeIcon, Clock, BookOpenCheck, BadgeCheck, MessagesSquare } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

const reasons = [
  {
    icon: Globe2,
    title: "Whole-of-market access",
    body: "We compare 90+ lenders, including specialist building societies and private banks you can't approach directly.",
  },
  {
    icon: HandshakeIcon,
    title: "Free initial consultation",
    body: "We don't charge for the first conversation. You only pay when you instruct us to arrange a mortgage.",
  },
  {
    icon: BadgeCheck,
    title: "FCA regulated",
    body: "Every adviser is qualified to CeMAP standard or higher and authorised by the Financial Conduct Authority.",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    body: "Average decision in principle within 48 hours. We chase lenders, valuers, and solicitors so you don't have to.",
  },
  {
    icon: BookOpenCheck,
    title: "Honest, jargon-free advice",
    body: "We tell you when not to remortgage, when not to overpay, and when a high-street deal will beat us.",
  },
  {
    icon: MessagesSquare,
    title: "One adviser, start to finish",
    body: "You'll have the same dedicated adviser from first call to completion. No call-centre handovers.",
  },
];

export function WhyChooseUs() {
  return (
    <Section bg="white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Why work with us
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            Built for borrowers, not lenders
          </h2>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-divider text-brand-black">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                    {r.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
