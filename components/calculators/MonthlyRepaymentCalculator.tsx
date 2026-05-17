"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { calculateRepaymentBreakdown } from "@/lib/calculations";
import { formatGBP, formatPercent } from "@/lib/utils";
import { ratesConfig } from "@/config/rates";
import { EmailResultsForm } from "./EmailResultsForm";

export function MonthlyRepaymentCalculator({ compact = false }: { compact?: boolean }) {
  const [propertyPrice, setPropertyPrice] = React.useState<number>(350_000);
  const [deposit, setDeposit] = React.useState<number>(35_000);
  const [term, setTerm] = React.useState<number>(ratesConfig.defaultTerm);
  const [rate, setRate] = React.useState<number>(ratesConfig.defaultCalculatorRate);
  const [interestOnly, setInterestOnly] = React.useState(false);

  const principal = Math.max(0, propertyPrice - deposit);

  const result = React.useMemo(
    () =>
      calculateRepaymentBreakdown(
        {
          principal,
          annualRatePct: rate,
          termYears: term,
          type: interestOnly ? "interest-only" : "repayment",
        },
        propertyPrice,
      ),
    [principal, rate, term, interestOnly, propertyPrice],
  );

  const chartData = React.useMemo(
    () =>
      result.schedule.map((row) => ({
        year: `Yr ${row.year}`,
        Balance: Math.round(row.balance),
        "Interest paid": Math.round(row.interestPaid),
        "Principal paid": Math.round(row.principalPaid),
      })),
    [result.schedule],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-5 rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
        <NumberRow
          id="rep-price"
          label="Property price"
          value={propertyPrice}
          onChange={setPropertyPrice}
          min={50_000}
          max={5_000_000}
          step={5_000}
          prefix="£"
        />
        <NumberRow
          id="rep-dep"
          label="Deposit"
          value={deposit}
          onChange={(v) => setDeposit(Math.min(v, propertyPrice))}
          min={0}
          max={propertyPrice}
          step={1_000}
          prefix="£"
          subtitle={
            propertyPrice > 0
              ? `${((deposit / propertyPrice) * 100).toFixed(1)}% of property price`
              : undefined
          }
        />
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="rep-term">Loan term</Label>
            <span className="text-sm font-semibold text-brand-ink">
              {term} years
            </span>
          </div>
          <Slider
            id="rep-term"
            min={5}
            max={40}
            step={1}
            value={[term]}
            onValueChange={([v]) => setTerm(v)}
            aria-label="Loan term in years"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="rep-rate">Interest rate</Label>
            <span className="text-sm font-semibold text-brand-ink">
              {formatPercent(rate, 2)}
            </span>
          </div>
          <Slider
            id="rep-rate"
            min={0.5}
            max={10}
            step={0.05}
            value={[rate]}
            onValueChange={([v]) => setRate(Number(v.toFixed(2)))}
            aria-label="Interest rate percent"
          />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-brand-surface px-4 py-3">
          <div>
            <Label htmlFor="rep-io" className="cursor-pointer">
              Interest-only
            </Label>
            <p className="text-xs text-brand-muted">
              Pay interest only; capital repaid at the end.
            </p>
          </div>
          <Switch
            id="rep-io"
            checked={interestOnly}
            onCheckedChange={setInterestOnly}
          />
        </div>
      </div>

      <div className="lg:col-span-2 space-y-5">
        <ResultCard
          label="Monthly payment"
          value={formatGBP(result.monthlyPayment, true)}
          big
        />
        <div className="grid grid-cols-2 gap-3">
          <ResultCard
            label="Total repayable"
            value={formatGBP(result.totalRepayable)}
          />
          <ResultCard
            label="Total interest"
            value={formatGBP(result.totalInterest)}
          />
          <ResultCard
            label="Loan amount"
            value={formatGBP(principal)}
          />
          <ResultCard
            label="Loan-to-value"
            value={result.ltv != null ? formatPercent(result.ltv, 1) : "n/a"}
          />
        </div>
        {!compact && (
          <EmailResultsForm
            resultsType="repayment"
            payload={{
              propertyPrice,
              deposit,
              term,
              rate,
              interestOnly,
              monthly: result.monthlyPayment,
            }}
          />
        )}
      </div>

      {!compact && (
        <div className="lg:col-span-5 rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
          <h4 className="text-sm font-semibold text-brand-ink">
            Balance & interest over the term
          </h4>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#010101" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#010101" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="interestFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EBAB23" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#EBAB23" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#52525B" }} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#52525B" }}
                  tickFormatter={(v) =>
                    v >= 1000 ? `£${Math.round(v / 1000)}k` : `£${v}`
                  }
                />
                <Tooltip
                  formatter={(v) => formatGBP(Number(v))}
                  contentStyle={{ borderRadius: 12, border: "1px solid #E4E4E7" }}
                />
                <Area
                  type="monotone"
                  dataKey="Balance"
                  stroke="#010101"
                  fill="url(#balanceFill)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="Interest paid"
                  stroke="#EBAB23"
                  fill="url(#interestFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-brand-muted">
            Indicative only. Actual rates available depend on lender criteria,
            credit profile, and product fees.
          </p>
        </div>
      )}
    </div>
  );
}

function NumberRow({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  subtitle,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {subtitle && <span className="text-xs text-brand-muted">{subtitle}</span>}
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div className="relative">
          {prefix && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-muted">
              {prefix}
            </span>
          )}
          <Input
            id={id}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value || 0))}
            className={prefix ? "pl-7 max-w-[160px]" : "max-w-[160px]"}
            inputMode="numeric"
          />
        </div>
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          aria-label={label}
        />
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  big = false,
}: {
  label: string;
  value: string;
  big?: boolean;
}) {
  return (
    <div
      className={
        big
          ? "rounded-2xl border-2 border-brand-black bg-brand-black p-6 text-white shadow-pop"
          : "rounded-2xl border border-brand-border bg-white p-4 shadow-soft"
      }
    >
      <div
        className={
          big ? "text-xs font-semibold uppercase tracking-wider text-brand-gold" : "text-xs font-semibold uppercase tracking-wider text-brand-muted"
        }
      >
        {label}
      </div>
      <div
        className={
          big
            ? "mt-2 text-4xl font-extrabold tracking-tight"
            : "mt-1 text-xl font-bold text-brand-ink"
        }
      >
        {value}
      </div>
    </div>
  );
}
