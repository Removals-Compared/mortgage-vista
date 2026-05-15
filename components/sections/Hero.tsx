import Link from "next/link";
import { ShieldCheck, Award, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-brand-black text-white">
      {/* Subtle radial accent — black-on-black, gold dot */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[500px] w-[500px] rounded-full bg-brand-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Whole-of-market UK mortgage brokers
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Find your perfect mortgage in minutes
          </h1>
          <p className="mt-6 text-lg text-white/70 sm:text-xl">
            Independent advice from advisers who&apos;ve arranged thousands of UK
            mortgages — across every situation, lender, and credit profile.
            Free initial consultation, no obligation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get a free quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40">
              <Link href="/calculator">Use the calculator</Link>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <TrustBadge
              icon={<ShieldCheck className="h-5 w-5 text-brand-gold" />}
              label="FCA regulated"
              value="Authorised broker"
            />
            <TrustBadge
              icon={<Award className="h-5 w-5 text-brand-gold" />}
              label={`${siteConfig.stats.yearsExperience} years`}
              value="of UK mortgage advice"
            />
            <TrustBadge
              icon={<Users className="h-5 w-5 text-brand-gold" />}
              label={siteConfig.stats.mortgagesArranged}
              value="mortgages arranged"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

function TrustBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-white">{label}</div>
        <div className="text-xs text-white/55">{value}</div>
      </div>
    </div>
  );
}
