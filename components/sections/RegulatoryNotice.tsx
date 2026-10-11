import { ShieldAlert } from "lucide-react";
import { siteConfig } from "@/config/site";

export function RegulatoryNotice() {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 text-sm leading-relaxed text-brand-muted">
      <div className="flex items-center gap-2 text-brand-ink">
        <ShieldAlert className="h-4 w-4 text-brand-gold-hover" />
        <span className="font-semibold">Important regulatory notice</span>
      </div>
      <p className="mt-2 font-semibold text-brand-ink">
        {siteConfig.regulatory.repossessionWarning}
      </p>
      <p className="mt-2">{siteConfig.regulatory.feeDisclosure}</p>
    </div>
  );
}
