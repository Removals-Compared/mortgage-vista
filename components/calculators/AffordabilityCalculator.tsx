"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { calculateAffordability } from "@/lib/calculations";
import { formatGBP } from "@/lib/utils";
import { ratesConfig } from "@/config/rates";
import { EmailResultsForm } from "./EmailResultsForm";

export function AffordabilityCalculator() {
  const [income1, setIncome1] = React.useState(48_000);
  const [income2, setIncome2] = React.useState(0);
  const [outgoings, setOutgoings] = React.useState(900);
  const [credit, setCredit] = React.useState(150);
  const [dependants, setDependants] = React.useState(0);

  const result = React.useMemo(
    () =>
      calculateAffordability({
        income1,
        income2,
        monthlyOutgoings: outgoings,
        monthlyCredit: credit,
        dependants,
      }),
    [income1, income2, outgoings, credit, dependants],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-5 rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="aff-i1"
            label="Annual income (applicant 1)"
            value={income1}
            onChange={setIncome1}
            prefix="£"
          />
          <Field
            id="aff-i2"
            label="Annual income (applicant 2)"
            subtitle="Optional"
            value={income2}
            onChange={setIncome2}
            prefix="£"
          />
          <Field
            id="aff-out"
            label="Monthly outgoings (excl. rent / mortgage)"
            value={outgoings}
            onChange={setOutgoings}
            prefix="£"
          />
          <Field
            id="aff-cred"
            label="Monthly credit commitments"
            subtitle="Loans, cards, car finance"
            value={credit}
            onChange={setCredit}
            prefix="£"
          />
          <Field
            id="aff-dep"
            label="Number of dependants"
            value={dependants}
            onChange={setDependants}
          />
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-surface p-4 text-xs leading-relaxed text-brand-muted">
          <strong className="text-brand-ink">Indicative only.</strong>{" "}
          Actual borrowing depends on lender criteria, credit history, deposit
          size, and individual circumstances. Affordability stress-tests vary
          materially between lenders. For a definitive figure, book a free
          consultation with one of our advisers.
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl border-2 border-brand-black bg-brand-black p-6 text-white shadow-pop">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Estimated maximum borrowing
          </div>
          <div className="mt-2 text-4xl font-extrabold tracking-tight">
            {formatGBP(result.adjustedBorrowing)}
          </div>
          <p className="mt-3 text-sm text-white/70">
            Based on a{" "}
            <span className="font-semibold text-brand-gold">
              {ratesConfig.incomeMultiplier}×
            </span>{" "}
            combined income baseline, adjusted for outgoings and dependants.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <ResultBox
            label="Recommended property price range"
            value={`${formatGBP(result.recommendedMin)} – ${formatGBP(result.recommendedMax)}`}
          />
          <ResultBox
            label="Indicative monthly payment"
            value={formatGBP(result.estimatedMonthly, true)}
            sub={`At today's average rate of ${ratesConfig.defaultCalculatorRate}% over ${ratesConfig.defaultTerm} years`}
          />
        </div>
        <EmailResultsForm
          resultsType="affordability"
          payload={{
            income1,
            income2,
            outgoings,
            credit,
            dependants,
            maxBorrowing: result.adjustedBorrowing,
          }}
        />
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  prefix,
  subtitle,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  subtitle?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {subtitle && (
        <p className="mt-0.5 text-xs text-brand-muted">{subtitle}</p>
      )}
      <div className="relative mt-2">
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-muted">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          type="number"
          min={0}
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value || 0)))}
          className={prefix ? "pl-7" : undefined}
        />
      </div>
    </div>
  );
}

function ResultBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-soft">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold text-brand-ink">{value}</div>
      {sub && <div className="mt-1 text-xs text-brand-muted">{sub}</div>}
    </div>
  );
}
