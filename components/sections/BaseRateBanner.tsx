import { TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ratesConfig } from "@/config/rates";
import { formatPercent } from "@/lib/utils";

export function BaseRateBanner() {
  return (
    <div className="bg-brand-gold text-brand-black">
      <Container className="flex flex-col items-center justify-between gap-2 py-3 text-sm font-semibold sm:flex-row">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>
            Bank of England base rate:{" "}
            <span className="font-extrabold">
              {formatPercent(ratesConfig.currentBaseRate, 2)}
            </span>
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium opacity-90">
          Average 5-year fix: {formatPercent(ratesConfig.averageRates.fiveYearFixed, 2)} ·
          {" "}2-year fix: {formatPercent(ratesConfig.averageRates.twoYearFixed, 2)}
        </p>
      </Container>
    </div>
  );
}
