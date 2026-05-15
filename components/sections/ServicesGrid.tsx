import Link from "next/link";
import {
  Home,
  Repeat,
  Building2,
  Briefcase,
  ShieldCheck,
  Store,
  Coins,
  ArrowRight,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { services } from "@/config/navigation";

const iconMap = {
  Home,
  Repeat,
  Building2,
  Briefcase,
  ShieldCheck,
  Store,
  Coins,
} as const;

export function ServicesGrid() {
  return (
    <Section bg="white" id="services">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            What we arrange
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            Mortgages for every situation
          </h2>
          <p className="mt-4 text-brand-muted">
            Whatever the circumstances, we have lenders for it. Pick the area
            closest to your situation to see eligibility and costs.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-black hover:shadow-pop"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand-divider text-brand-black group-hover:bg-brand-gold">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <h3 className="text-lg font-semibold text-brand-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  {s.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
