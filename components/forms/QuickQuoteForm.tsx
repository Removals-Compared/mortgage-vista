"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { quickQuoteSchema, type QuickQuoteValues } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

export function QuickQuoteForm({ context }: { context?: string }) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "ok" | "err">("idle");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuickQuoteValues>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      enquiry: context ? `Enquiry about: ${context}\n\n` : "",
    },
  });

  const consent = watch("consent");

  async function onSubmit(values: QuickQuoteValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "quick-quote", context }),
      });
      if (!res.ok) throw new Error("Network");
      setStatus("ok");
      reset();
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-success" />
        <h3 className="mt-3 text-lg font-semibold text-brand-ink">
          Got it — thanks.
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          A specialist adviser will be in touch within one working day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-2xl border border-brand-border bg-white p-6 shadow-soft"
      noValidate
    >
      <input
        type="text"
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
        className="hidden"
        {...register("website")}
      />
      <div>
        <Label htmlFor="qq-name">Full name</Label>
        <Input id="qq-name" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && (
          <p className="mt-1 text-xs text-brand-error">{errors.name.message}</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="qq-email">Email</Label>
          <Input
            id="qq-email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-brand-error">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="qq-phone">Phone (optional)</Label>
          <Input
            id="qq-phone"
            type="tel"
            inputMode="tel"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-brand-error">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="qq-enquiry">How can we help?</Label>
        <Textarea
          id="qq-enquiry"
          rows={4}
          {...register("enquiry")}
          aria-invalid={!!errors.enquiry}
        />
        {errors.enquiry && (
          <p className="mt-1 text-xs text-brand-error">{errors.enquiry.message}</p>
        )}
      </div>
      <label className="flex items-start gap-3 text-sm text-brand-muted">
        <Checkbox
          checked={!!consent}
          onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })}
        />
        <span>
          I&apos;m happy to be contacted about my enquiry. See our{" "}
          <a href="/privacy-policy" className="font-semibold underline">
            privacy policy
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-2 text-xs text-brand-error">{errors.consent.message}</p>
      )}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request a callback"}
      </Button>
      {status === "err" && (
        <p className="text-sm text-brand-error">
          Sorry — something went wrong. Please call us instead.
        </p>
      )}
    </form>
  );
}
