import { Calculator, Coins, PoundSterling } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { MonthlyRepaymentCalculator } from "@/components/calculators/MonthlyRepaymentCalculator";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { StampDutyCalculator } from "@/components/calculators/StampDutyCalculator";
import { PrintButton } from "@/components/calculators/PrintButton";
import { BaseRateBanner } from "@/components/sections/BaseRateBanner";
import { CTASection } from "@/components/sections/CTASection";
import { ratesConfig } from "@/config/rates";

export const metadata = {
  title: "Mortgage Calculators — Repayment, Affordability, Stamp Duty",
  description:
    "Free UK mortgage calculators. Work out monthly payments, how much you can borrow, and stamp duty due — at the current 3.75% Bank of England base rate.",
};

export default function CalculatorPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-brand-black text-white">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Free UK mortgage calculators
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Run the numbers before the conversation
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Three calculators built on real UK mortgage maths. Default rates
            are pulled from current market averages — change anything to
            stress-test your own scenario.
          </p>
        </Container>
      </div>
      <BaseRateBanner />

      <Section bg="surface">
        <Container>
          <Tabs defaultValue="repayment">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <TabsList className="flex flex-wrap gap-1 h-auto">
                <TabsTrigger value="repayment" className="gap-2">
                  <Calculator className="h-4 w-4" /> Monthly repayment
                </TabsTrigger>
                <TabsTrigger value="affordability" className="gap-2" id="affordability">
                  <PoundSterling className="h-4 w-4" /> Affordability
                </TabsTrigger>
                <TabsTrigger value="stamp-duty" className="gap-2" id="stamp-duty">
                  <Coins className="h-4 w-4" /> Stamp Duty
                </TabsTrigger>
              </TabsList>
              <PrintButton />
            </div>

            <TabsContent value="repayment">
              <MonthlyRepaymentCalculator />
            </TabsContent>
            <TabsContent value="affordability">
              <AffordabilityCalculator />
            </TabsContent>
            <TabsContent value="stamp-duty">
              <StampDutyCalculator />
            </TabsContent>
          </Tabs>
        </Container>
      </Section>

      <Section bg="white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-ink">
            How these calculators work
          </h2>
          <div className="mt-6 space-y-5 text-brand-muted leading-relaxed">
            <p>
              <strong className="text-brand-ink">Monthly repayment</strong> uses
              the standard amortisation formula{" "}
              <code className="rounded bg-brand-divider px-1.5 py-0.5 text-xs">
                M = P × [r(1+r)^n] / [(1+r)^n − 1]
              </code>{" "}
              where P is your loan, r is the monthly rate, and n is the term in
              months. For interest-only mortgages we calculate{" "}
              <code className="rounded bg-brand-divider px-1.5 py-0.5 text-xs">
                M = P × r
              </code>{" "}
              — the capital is repaid separately at the end of the term.
            </p>
            <p>
              <strong className="text-brand-ink">Affordability</strong> takes a
              baseline of {ratesConfig.incomeMultiplier}× combined income, then
              adjusts downwards if your monthly outgoings exceed 40% of
              estimated net income, and deducts £
              {ratesConfig.dependantDeduction.toLocaleString("en-GB")} per
              dependant from annual borrowing capacity. Real lender stress
              tests vary materially — some are tighter, some looser depending
              on the product.
            </p>
            <p>
              <strong className="text-brand-ink">Stamp Duty</strong> applies the
              SDLT bands in force in England and Northern Ireland from April
              2025. The first-time buyer toggle applies up to a £
              {ratesConfig.ftbCap.toLocaleString("en-GB")} property cap. The
              additional-property toggle applies the 5% surcharge introduced
              on 31 October 2024. Non-UK resident adds the 2% surcharge.
              Scotland and Wales use different regimes (LBTT and LTT).
            </p>
            <p className="text-sm">
              All three calculators give indicative figures only. Actual
              borrowing, monthly payments, and total cost depend on the
              specific lender, product, fees, and your full circumstances.
              Speak to one of our advisers for a definitive answer.
            </p>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to turn numbers into a real deal?"
        body="Book a free 20-minute call. We'll review your calculator results against the actual products you'd qualify for today."
      />
    </>
  );
}
