/**
 * Central financial configuration for Mortgage Vista Limited.
 *
 * UPDATE THESE VALUES whenever the Bank of England base rate changes,
 * average market rates shift, or HMRC adjusts SDLT bands.
 *
 * Last reviewed: 2026-05-15
 *
 * --- IMPORTANT ---
 * SDLT bands below reflect the rates in force from 1 April 2025
 * (nil-rate band reverted to £125,000; FTB relief threshold £300,000
 * with property cap £500,000; additional-property surcharge raised to
 * 5% from 31 October 2024; non-UK resident surcharge 2%).
 * Confirm with HMRC before each tax-year change.
 */

export type SdltBand = {
  /** Lower bound of band, exclusive of previous band's upper bound. */
  from: number;
  /** Upper bound (inclusive). Use Infinity for the top band. */
  to: number;
  /** Marginal rate as a decimal (e.g. 0.05 = 5%). */
  rate: number;
};

export const ratesConfig = {
  /** Bank of England base rate, percent. */
  currentBaseRate: 3.75,

  /** Date the base rate was last updated. Format: YYYY-MM-DD. */
  baseRateLastUpdated: "2026-05-08",

  /** Indicative average market rates by product, percent. */
  averageRates: {
    twoYearFixed: 4.39,
    fiveYearFixed: 4.12,
    tracker: 4.55,
    variable: 7.74,
  },

  /** Default rate used by the repayment calculator. */
  defaultCalculatorRate: 4.39,

  /** Income multiplier baseline for affordability calculations. */
  incomeMultiplier: 4.5,

  /** Reduction in maximum borrowing per dependant, GBP. */
  dependantDeduction: 250,

  /** Maximum LTV the firm typically arranges. */
  maxLTV: 95,

  /** Default loan term in years. */
  defaultTerm: 25,

  /** Standard SDLT bands for England & Northern Ireland, single residential property. */
  stampDutyBands: [
    { from: 0, to: 125_000, rate: 0 },
    { from: 125_000, to: 250_000, rate: 0.02 },
    { from: 250_000, to: 925_000, rate: 0.05 },
    { from: 925_000, to: 1_500_000, rate: 0.1 },
    { from: 1_500_000, to: Infinity, rate: 0.12 },
  ] as SdltBand[],

  /** First-time buyer SDLT relief. Applies to properties up to ftbCap only. */
  firstTimeBuyerBands: [
    { from: 0, to: 300_000, rate: 0 },
    { from: 300_000, to: 500_000, rate: 0.05 },
    { from: 500_000, to: Infinity, rate: 0 }, // FTB relief withdrawn entirely above cap
  ] as SdltBand[],

  /** Property price ceiling for FTB relief. Above this, standard bands apply. */
  ftbCap: 500_000,

  /** Additional-property / second-home surcharge (added to all bands). */
  additionalPropertySurcharge: 0.05,

  /** Non-UK-resident surcharge (added on top of all other rates). */
  nonResidentSurcharge: 0.02,
} as const;

export type RatesConfig = typeof ratesConfig;
