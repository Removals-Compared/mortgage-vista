import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About Us | UK Mortgage Brokers",
  description:
    "Independent, FCA-regulated UK mortgage advisers. Meet the team and learn how we work.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Honest above all",
    body: "We tell you when not to remortgage and when not to take a deal. The right answer for you isn't always the most profitable one for us.",
  },
  {
    icon: Heart,
    title: "Patient with the hard cases",
    body: "Self-employed, contractor income, prior credit issues, complex incomes. We treat these as the start of a conversation, not a reason to say no.",
  },
  {
    icon: Sparkles,
    title: "Modern process, traditional service",
    body: "All your documents in one secure portal, signed digitally. The same dedicated adviser from first call to completion. No call-centre handovers.",
  },
  {
    icon: Users,
    title: "Plain English",
    body: "We explain LTV, ERCs, AIPs, and stress tests until they make sense. No jargon used to make us sound clever.",
  },
];

const team = [
  {
    name: "[Adviser Name]",
    role: "Founder & Senior Mortgage Adviser",
    bio: "[CLIENT TO PROVIDE: short bio. Mention years in the industry, qualifications such as CeMAP or CeRER, areas of speciality.]",
  },
  {
    name: "[Adviser Name]",
    role: "Specialist Mortgage Adviser",
    bio: "[CLIENT TO PROVIDE: bio focused on this adviser's area. e.g. self-employed, complex BTL, remortgaging.]",
  },
  {
    name: "[Adviser Name]",
    role: "Buy-to-Let & Commercial Specialist",
    bio: "[CLIENT TO PROVIDE: relevant experience with portfolio landlords, limited-company SPVs, buy-to-let.]",
  },
  {
    name: "[Adviser Name]",
    role: "Client Manager",
    bio: "[CLIENT TO PROVIDE: operations and client liaison. Years with the firm, what they handle day to day.]",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="bg-brand-black text-white">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            About {siteConfig.name}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Independent UK mortgage brokers, not a call centre
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            We arranged our first mortgage in {2026 - siteConfig.stats.yearsExperience}.
            Since then we&apos;ve helped thousands of UK households into the
            right home loan. First-time buyers, remortgagors, landlords,
            self-employed, retirees. The model is simple: honest advice,
            clearly explained.
          </p>
        </Container>
      </div>

      <Section bg="white">
        <Container className="max-w-3xl">
          {/* CLIENT TO FILL IN: Company story */}
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Our story
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink">
            How {siteConfig.name} began
          </h2>
          <div className="mt-6 space-y-5 text-brand-muted leading-relaxed">
            <p>
              {`[CLIENT TO PROVIDE: the founding story. When was the company started, why, and by whom? Two or three short paragraphs. Mention any defining moments: the first complex case you took on, why you decided to stay independent, the values you brought from previous roles.]`}
            </p>
            <p>
              {`[Continue with the practical evolution: when the team grew, the milestones, and what's stayed the same throughout. The focus on honest advice and patient handling of complex cases.]`}
            </p>
            <p>
              {`[Close with the present: where the firm is today and what kinds of borrowers you most enjoy helping. This sets up the team section below.]`}
            </p>
          </div>
        </Container>
      </Section>

      {/* Stats strip */}
      <div className="bg-brand-black text-white">
        <Container className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {[
            { v: siteConfig.stats.yearsExperience + "+", l: "Years of UK advice" },
            { v: siteConfig.stats.lenderPanel, l: "Lenders on panel" },
            { v: siteConfig.stats.averageSavings, l: "Avg. saving on remortgage" },
            { v: siteConfig.stats.happyClients, l: "Would recommend us" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl font-extrabold text-brand-gold">{s.v}</div>
              <div className="mt-1 text-sm text-white/60">{s.l}</div>
            </div>
          ))}
        </Container>
      </div>

      {/* Values */}
      <Section bg="surface">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              What we stand for
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Four principles, every conversation
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-black text-brand-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{v.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section bg="white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              The team
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Advisers, not salespeople
            </h2>
            <p className="mt-4 text-brand-muted">
              Every adviser is qualified to CeMAP standard or higher and FCA
              authorised under the firm&apos;s permissions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.name} className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
                {/* Photo placeholder. Replace with next/image when client supplies headshots. */}
                <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-brand-divider to-brand-border" aria-hidden />
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-brand-ink">{t.name}</h3>
                  <p className="text-sm font-medium text-brand-gold-hover">{t.role}</p>
                  <p className="mt-2 text-sm text-brand-muted leading-relaxed">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Accreditations */}
      <Section bg="surface">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Authorisation & accreditations
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Regulated, accredited, accountable
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-border bg-white p-7 text-center shadow-soft">
            <p className="text-sm leading-relaxed text-brand-ink">
              {siteConfig.regulatory.statement} You can verify this on the{" "}
              <a
                className="font-semibold underline"
                href={siteConfig.regulatory.fcaRegisterUrl}
                target="_blank"
                rel="noreferrer"
              >
                FCA Register
              </a>
              .
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "FCA authorised", note: "Appointed Representative of TMG Direct Ltd" },
              { label: "FOS scheme", note: "Financial Ombudsman cover" },
              { label: "ICO registered", note: "Data protection" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-2xl border border-brand-border bg-white p-5 text-center shadow-soft"
              >
                {/* Placeholder badge. Replace with client's actual logos. */}
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-divider text-brand-black font-bold">
                  ✓
                </div>
                <div className="font-semibold text-brand-ink">{b.label}</div>
                <div className="text-xs text-brand-muted">{b.note}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
