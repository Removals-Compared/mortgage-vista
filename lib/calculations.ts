/**
 * Pure mortgage maths. No React, no DOM. Easy to test and re-use.
 */

import { ratesConfig, type SdltBand } from "@/config/rates";

export type RepaymentInputs = {
  principal: number;
  annualRatePct: number;
  termYears: number;
  type: "repayment" | "interest-only";
};

export type RepaymentResult = {
  monthlyPayment: number;
  totalRepayable: number;
  totalInterest: number;
  ltv: number | null;
  schedule: Array<{
    year: number;
    principalPaid: number;
    interestPaid: number;
    balance: number;
  }>;
};

/**
 * Standard mortgage repayment formula.
 * M = P × [r(1+r)^n] / [(1+r)^n − 1]
 * Interest-only: M = P × r
 */
export function calculateMonthlyPayment({
  principal,
  annualRatePct,
  termYears,
  type,
}: RepaymentInputs): number {
  if (principal <= 0 || termYears <= 0) return 0;
  const monthlyRate = annualRatePct / 100 / 12;
  const months = termYears * 12;

  if (type === "interest-only") {
    return principal * monthlyRate;
  }

  if (monthlyRate === 0) {
    return principal / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * (monthlyRate * factor)) / (factor - 1);
}

export function calculateRepaymentBreakdown(
  inputs: RepaymentInputs,
  propertyPrice?: number,
): RepaymentResult {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const months = inputs.termYears * 12;
  const totalRepayable =
    inputs.type === "interest-only"
      ? monthlyPayment * months + inputs.principal
      : monthlyPayment * months;
  const totalInterest = totalRepayable - inputs.principal;

  // Year-by-year amortisation schedule for the chart.
  const monthlyRate = inputs.annualRatePct / 100 / 12;
  let balance = inputs.principal;
  const schedule: RepaymentResult["schedule"] = [];

  for (let year = 1; year <= inputs.termYears; year++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyRate;
      const principalPart =
        inputs.type === "interest-only" ? 0 : monthlyPayment - interest;
      yearInterest += interest;
      yearPrincipal += principalPart;
      balance -= principalPart;
    }
    schedule.push({
      year,
      principalPaid: Math.max(0, yearPrincipal),
      interestPaid: Math.max(0, yearInterest),
      balance: Math.max(0, balance),
    });
  }

  const ltv =
    propertyPrice && propertyPrice > 0
      ? (inputs.principal / propertyPrice) * 100
      : null;

  return {
    monthlyPayment,
    totalRepayable,
    totalInterest,
    ltv,
    schedule,
  };
}

// ---------------------------------------------------------------------------
// Affordability
// ---------------------------------------------------------------------------

export type AffordabilityInputs = {
  income1: number;
  income2: number;
  monthlyOutgoings: number;
  monthlyCredit: number;
  dependants: number;
};

export type AffordabilityResult = {
  combinedIncome: number;
  baselineBorrowing: number;
  adjustedBorrowing: number;
  outgoingsRatio: number;
  recommendedMin: number;
  recommendedMax: number;
  estimatedMonthly: number;
};

export function calculateAffordability(
  i: AffordabilityInputs,
): AffordabilityResult {
  const combinedIncome = Math.max(0, i.income1) + Math.max(0, i.income2);
  // Net income approximation. UK 2026: tax-free £12,570, basic 20% to £50,270,
  // higher 40% to £125,140. Used purely to estimate outgoings ratio; not financial advice.
  const netIncomeMonthly = estimateNetMonthly(combinedIncome);
  const totalOutgoings = i.monthlyOutgoings + i.monthlyCredit;
  const outgoingsRatio =
    netIncomeMonthly > 0 ? totalOutgoings / netIncomeMonthly : 1;

  let multiplier: number = ratesConfig.incomeMultiplier;
  if (outgoingsRatio > 0.4) {
    multiplier -= Math.min(1, (outgoingsRatio - 0.4) * 2); // taper down
  }
  multiplier = Math.max(2.5, multiplier);

  const baselineBorrowing = combinedIncome * ratesConfig.incomeMultiplier;
  const adjustedBorrowing = Math.max(
    0,
    combinedIncome * multiplier -
      i.dependants * ratesConfig.dependantDeduction * 12,
  );

  // Suggest a property price range assuming 10–15% deposit
  const recommendedMin = adjustedBorrowing / 0.9;
  const recommendedMax = adjustedBorrowing / 0.85;

  const estimatedMonthly = calculateMonthlyPayment({
    principal: adjustedBorrowing,
    annualRatePct: ratesConfig.defaultCalculatorRate,
    termYears: ratesConfig.defaultTerm,
    type: "repayment",
  });

  return {
    combinedIncome,
    baselineBorrowing,
    adjustedBorrowing,
    outgoingsRatio,
    recommendedMin,
    recommendedMax,
    estimatedMonthly,
  };
}

function estimateNetMonthly(annualGross: number): number {
  if (annualGross <= 0) return 0;
  let tax = 0;
  if (annualGross > 125_140) {
    tax += (annualGross - 125_140) * 0.45;
    tax += (125_140 - 50_270) * 0.4;
    tax += (50_270 - 12_570) * 0.2;
  } else if (annualGross > 50_270) {
    tax += (annualGross - 50_270) * 0.4;
    tax += (50_270 - 12_570) * 0.2;
  } else if (annualGross > 12_570) {
    tax += (annualGross - 12_570) * 0.2;
  }
  // Rough NI: 8% above primary threshold up to upper, 2% above
  const niThreshold = 12_570;
  const niUpper = 50_270;
  let ni = 0;
  if (annualGross > niUpper) {
    ni += (niUpper - niThreshold) * 0.08 + (annualGross - niUpper) * 0.02;
  } else if (annualGross > niThreshold) {
    ni += (annualGross - niThreshold) * 0.08;
  }
  return (annualGross - tax - ni) / 12;
}

// ---------------------------------------------------------------------------
// Stamp Duty Land Tax
// ---------------------------------------------------------------------------

export type SdltInputs = {
  price: number;
  firstTimeBuyer: boolean;
  additionalProperty: boolean;
  nonResident: boolean;
};

export type SdltBreakdownRow = {
  label: string;
  rate: number;
  taxable: number;
  tax: number;
};

export type SdltResult = {
  total: number;
  effectiveRate: number;
  breakdown: SdltBreakdownRow[];
  warnings: string[];
};

export function calculateSdlt(input: SdltInputs): SdltResult {
  const warnings: string[] = [];
  const price = Math.max(0, input.price);

  // FTB relief only applies up to the cap.
  const useFtb = input.firstTimeBuyer && price <= ratesConfig.ftbCap;
  if (input.firstTimeBuyer && price > ratesConfig.ftbCap) {
    warnings.push(
      `First-time buyer relief is not available on properties above £${ratesConfig.ftbCap.toLocaleString("en-GB")}. Standard rates applied.`,
    );
  }

  const baseBands: SdltBand[] = useFtb
    ? ratesConfig.firstTimeBuyerBands.filter((b) => b.from < ratesConfig.ftbCap)
    : ratesConfig.stampDutyBands;

  const surcharge =
    (input.additionalProperty ? ratesConfig.additionalPropertySurcharge : 0) +
    (input.nonResident ? ratesConfig.nonResidentSurcharge : 0);

  const breakdown: SdltBreakdownRow[] = [];
  let total = 0;

  for (const band of baseBands) {
    const upper = Math.min(price, band.to);
    if (upper <= band.from) continue;
    const taxable = upper - band.from;
    const effectiveBandRate = band.rate + surcharge;
    const tax = taxable * effectiveBandRate;
    total += tax;

    const label =
      band.to === Infinity
        ? `Above £${band.from.toLocaleString("en-GB")}`
        : `£${band.from.toLocaleString("en-GB")} – £${band.to.toLocaleString("en-GB")}`;

    breakdown.push({
      label,
      rate: effectiveBandRate,
      taxable,
      tax,
    });

    if (price <= band.to) break;
  }

  const effectiveRate = price > 0 ? (total / price) * 100 : 0;

  return { total, effectiveRate, breakdown, warnings };
}
