"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { calculateSdlt } from "@/lib/calculations";
import { formatGBP, formatPercent } from "@/lib/utils";
import { EmailResultsForm } from "./EmailResultsForm";

export function StampDutyCalculator() {
  const [price, setPrice] = React.useState(350_000);
  const [firstTimeBuyer, setFirstTimeBuyer] = React.useState(false);
  const [additional, setAdditional] = React.useState(false);
  const [nonResident, setNonResident] = React.useState(false);

  const result = React.useMemo(
    () =>
      calculateSdlt({
        price,
        firstTimeBuyer,
        additionalProperty: additional,
        nonResident,
      }),
    [price, firstTimeBuyer, additional, nonResident],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-5 rounded-2xl border border-brand-border bg-white p-6 shadow-soft">
        <div>
          <Label htmlFor="sd-price">Property price</Label>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-muted">
              £
            </span>
            <Input
              id="sd-price"
              type="number"
              min={0}
              max={50_000_000}
              step={5_000}
              value={price}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value || 0)))}
              className="pl-7 max-w-[240px]"
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-1">
          <Toggle
            id="sd-ftb"
            label="First-time buyer"
            sub="You and any joint buyers must never have owned a residential property before."
            checked={firstTimeBuyer}
            onChange={(v) => {
              setFirstTimeBuyer(v);
              if (v) setAdditional(false);
            }}
          />
          <Toggle
            id="sd-add"
            label="Additional / second property"
            sub="3 → 5% surcharge applies (raised to 5% on 31 Oct 2024)."
            checked={additional}
            onChange={(v) => {
              setAdditional(v);
              if (v) setFirstTimeBuyer(false);
            }}
          />
          <Toggle
            id="sd-nr"
            label="Non-UK resident"
            sub="2% surcharge applies on top of all other rates."
            checked={nonResident}
            onChange={setNonResident}
          />
        </div>

        <div className="rounded-xl bg-brand-surface p-4 text-xs text-brand-muted">
          SDLT rates shown are for England and Northern Ireland. Scotland uses
          LBTT and Wales uses LTT — different bands and reliefs apply. Confirm
          the figure with your conveyancer before completion.
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl border-2 border-brand-black bg-brand-black p-6 text-white shadow-pop">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Stamp duty payable
          </div>
          <div className="mt-2 text-4xl font-extrabold tracking-tight">
            {formatGBP(result.total)}
          </div>
          <p className="mt-3 text-sm text-white/70">
            Effective rate: {formatPercent(result.effectiveRate, 2)} of
            property price
          </p>
        </div>

        {result.warnings.length > 0 && (
          <div className="rounded-xl border border-brand-error/40 bg-brand-error/5 p-3 text-xs text-brand-error">
            {result.warnings.map((w, i) => (
              <p key={i} className="flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {w}
              </p>
            ))}
          </div>
        )}

        <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Band breakdown
          </div>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-brand-muted">
                <th className="pb-2 font-semibold">Band</th>
                <th className="pb-2 font-semibold text-right">Rate</th>
                <th className="pb-2 font-semibold text-right">Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((row) => (
                <tr key={row.label} className="border-t border-brand-border">
                  <td className="py-2 text-brand-ink">{row.label}</td>
                  <td className="py-2 text-right text-brand-muted">
                    {(row.rate * 100).toFixed(1)}%
                  </td>
                  <td className="py-2 text-right font-semibold text-brand-ink">
                    {formatGBP(row.tax)}
                  </td>
                </tr>
              ))}
              {result.breakdown.length === 0 && (
                <tr>
                  <td className="py-2 text-brand-muted" colSpan={3}>
                    No SDLT payable on this purchase.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <EmailResultsForm
          resultsType="stamp-duty"
          payload={{
            price,
            firstTimeBuyer,
            additional,
            nonResident,
            total: result.total,
          }}
        />
      </div>
    </div>
  );
}

function Toggle({
  id,
  label,
  sub,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  sub: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-brand-border p-3 hover:border-brand-black"
    >
      <div>
        <div className="text-sm font-semibold text-brand-ink">{label}</div>
        <div className="text-xs text-brand-muted">{sub}</div>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
