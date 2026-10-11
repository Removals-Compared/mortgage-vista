"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { calculatorEmailSchema } from "@/lib/validations";

export function EmailResultsForm({
  resultsType,
  payload,
}: {
  resultsType: "repayment" | "affordability" | "stamp-duty";
  payload: Record<string, unknown>;
}) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "ok" | "err" | "invalid">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Same rule as the server, so a typo like "name@gmailcom" gets a clear message.
    if (!calculatorEmailSchema.shape.email.safeParse(email.trim()).success) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/calculator-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resultsType, payload, website: "" }),
      });
      if (!res.ok) throw new Error("Network");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <p className="rounded-xl bg-brand-divider px-4 py-3 text-sm text-brand-ink no-print">
        Sent. Check your inbox in a few minutes.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 rounded-xl border border-brand-border bg-brand-surface p-4 sm:flex-row no-print"
    >
      <div className="flex flex-1 items-center gap-2">
        <Mail className="h-5 w-5 text-brand-muted" aria-hidden />
        <Input
          type="email"
          required
          placeholder="Email me a copy of these results"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="flex-1"
        />
      </div>
      <Button type="submit" size="sm" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Email me my results"}
      </Button>
      {status === "invalid" && (
        <p className="text-xs text-brand-error sm:basis-full">
          Please enter a valid email address, for example name@example.co.uk.
        </p>
      )}
      {status === "err" && (
        <p className="text-xs text-brand-error sm:basis-full">
          Couldn&apos;t send. Please try again.
        </p>
      )}
    </form>
  );
}
