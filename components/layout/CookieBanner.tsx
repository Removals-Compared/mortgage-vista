"use client";

import * as React from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

const STORAGE_KEY = "mvl_cookie_consent_v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

export function CookieBanner() {
  const [open, setOpen] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, []);

  function save(c: Omit<Consent, "decidedAt" | "necessary">) {
    const consent: Consent = {
      necessary: true,
      ...c,
      decidedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setOpen(false);
    // TODO: when wiring real analytics (e.g. GA4), gate the script load
    // on `consent.analytics === true` here or in a parent provider.
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md"
    >
      <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-pop">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-divider text-brand-black">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-brand-ink">
              We use cookies
            </h2>
            <p className="mt-1 text-sm text-brand-muted">
              We use essential cookies for the site to work, plus optional ones
              for analytics and marketing. Read our{" "}
              <Link href="/cookie-policy" className="font-semibold underline">
                cookie policy
              </Link>
              .
            </p>

            {showDetails && (
              <div className="mt-4 grid gap-3 rounded-xl bg-brand-surface p-3 text-sm">
                <Row label="Strictly necessary" sub="Required for the site to function." disabled checked />
                <Row
                  label="Analytics"
                  sub="Helps us understand how visitors use the site."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <Row
                  label="Marketing"
                  sub="Used for personalised advertising on third-party sites."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() =>
                  save({
                    analytics: showDetails ? analytics : true,
                    marketing: showDetails ? marketing : true,
                  })
                }
              >
                {showDetails ? "Save preferences" : "Accept all"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => save({ analytics: false, marketing: false })}
              >
                Reject non-essential
              </Button>
              {!showDetails && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                >
                  Customise
                </Button>
              )}
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={() => save({ analytics: false, marketing: false })}
            className="rounded-lg p-1 text-brand-soft hover:text-brand-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  sub,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  sub: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex items-start justify-between gap-3">
      <div>
        <div className="font-semibold text-brand-ink">{label}</div>
        <div className="text-xs text-brand-muted">{sub}</div>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={(v) => onChange?.(v)}
      />
    </label>
  );
}
