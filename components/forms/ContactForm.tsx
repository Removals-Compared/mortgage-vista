"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

const enquiryOptions = [
  { value: "first-time-buyer", label: "First-time buyer mortgage" },
  { value: "remortgage", label: "Remortgage / product switch" },
  { value: "buy-to-let", label: "Buy-to-let mortgage" },
  { value: "self-employed", label: "Self-employed mortgage" },
  { value: "bad-credit", label: "Bad credit / specialist lending" },
  { value: "commercial", label: "Commercial mortgage" },
  { value: "equity-release", label: "Equity release / later life" },
  { value: "general", label: "Something else" },
] as const;

const steps = ["Enquiry", "About you", "Property", "Confirm"] as const;

export function ContactForm() {
  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "loading" | "ok" | "err">("idle");

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { enquiryType: "first-time-buyer" },
  });
  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = form;

  const enquiryType = watch("enquiryType");
  const consent = watch("consent");

  async function next() {
    const fields: (keyof ContactValues)[][] = [
      ["enquiryType"],
      ["firstName", "lastName", "email", "phone"],
      ["postcode", "propertyValue", "loanRequired"],
      ["consent"],
    ];
    const ok = await trigger(fields[step] as (keyof ContactValues)[]);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function onSubmit(values: ContactValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "contact-page" }),
      });
      if (!res.ok) throw new Error("Network");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-brand-border bg-white p-10 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-success" />
        <h2 className="mt-4 text-2xl font-bold text-brand-ink">
          Enquiry received
        </h2>
        <p className="mt-3 max-w-md mx-auto text-brand-muted">
          A specialist mortgage adviser will call you within one working day.
          If your enquiry is urgent, please ring us directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft sm:p-8"
      noValidate
    >
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
        className="hidden"
        {...register("website")}
      />

      <ol className="mb-8 grid grid-cols-4 gap-2 text-xs sm:text-sm">
        {steps.map((label, i) => (
          <li
            key={label}
            className={
              "flex items-center gap-2 rounded-xl border px-3 py-2 " +
              (i === step
                ? "border-brand-black bg-brand-black text-white"
                : i < step
                ? "border-brand-border bg-brand-divider text-brand-ink"
                : "border-brand-border text-brand-soft")
            }
          >
            <span className="font-bold">{i + 1}</span>
            <span className="hidden sm:inline">{label}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="grid gap-4">
          <legend className="text-lg font-semibold text-brand-ink mb-2">
            What can we help with?
          </legend>
          <RadioGroup
            value={enquiryType}
            onValueChange={(v) => setValue("enquiryType", v as ContactValues["enquiryType"])}
            className="grid gap-2 sm:grid-cols-2"
          >
            {enquiryOptions.map((opt) => (
              <label
                key={opt.value}
                className={
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors " +
                  (enquiryType === opt.value
                    ? "border-brand-black bg-brand-divider"
                    : "border-brand-border hover:border-brand-black")
                }
              >
                <RadioGroupItem value={opt.value} id={`et-${opt.value}`} />
                <span className="text-sm font-medium text-brand-ink">
                  {opt.label}
                </span>
              </label>
            ))}
          </RadioGroup>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="grid gap-4">
          <legend className="text-lg font-semibold text-brand-ink mb-2">
            About you
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cf-first">First name</Label>
              <Input id="cf-first" {...register("firstName")} aria-invalid={!!errors.firstName} />
              {errors.firstName && <p className="mt-1 text-xs text-brand-error">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="cf-last">Surname</Label>
              <Input id="cf-last" {...register("lastName")} aria-invalid={!!errors.lastName} />
              {errors.lastName && <p className="mt-1 text-xs text-brand-error">{errors.lastName.message}</p>}
            </div>
            <div>
              <Label htmlFor="cf-email">Email</Label>
              <Input id="cf-email" type="email" {...register("email")} aria-invalid={!!errors.email} />
              {errors.email && <p className="mt-1 text-xs text-brand-error">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="cf-phone">Phone (optional)</Label>
              <Input id="cf-phone" type="tel" inputMode="tel" {...register("phone")} aria-invalid={!!errors.phone} />
              {errors.phone && <p className="mt-1 text-xs text-brand-error">{errors.phone.message}</p>}
            </div>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="grid gap-4">
          <legend className="text-lg font-semibold text-brand-ink mb-2">
            Property details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cf-postcode">Property postcode</Label>
              <Input id="cf-postcode" placeholder="e.g. SW1A 1AA" {...register("postcode")} aria-invalid={!!errors.postcode} />
              {errors.postcode && <p className="mt-1 text-xs text-brand-error">{errors.postcode.message}</p>}
            </div>
            <div>
              <Label htmlFor="cf-pv">Estimated property value</Label>
              <Input id="cf-pv" type="number" inputMode="numeric" min={0} placeholder="£" {...register("propertyValue")} />
            </div>
            <div>
              <Label htmlFor="cf-loan">Loan amount required</Label>
              <Input id="cf-loan" type="number" inputMode="numeric" min={0} placeholder="£" {...register("loanRequired")} />
            </div>
          </div>
          <div>
            <Label htmlFor="cf-notes">Anything else we should know? (optional)</Label>
            <Textarea id="cf-notes" rows={4} {...register("notes")} />
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="grid gap-4">
          <legend className="text-lg font-semibold text-brand-ink mb-2">
            Almost there
          </legend>
          <div className="rounded-xl bg-brand-surface p-4 text-sm text-brand-muted">
            <p className="font-semibold text-brand-ink">
              You&apos;re asking about:{" "}
              {enquiryOptions.find((o) => o.value === enquiryType)?.label}
            </p>
            <p className="mt-2">
              By submitting this form you agree to be contacted about your
              enquiry. We&apos;ll never share your details with anyone outside
              the lenders we approach on your behalf. See our{" "}
              <a href="/privacy-policy" className="font-semibold underline">
                privacy policy
              </a>
              .
            </p>
          </div>
          <label className="flex items-start gap-3 text-sm text-brand-muted">
            <Checkbox
              checked={!!consent}
              onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })}
            />
            <span>
              I confirm I&apos;ve read the privacy notice and agree to be
              contacted about my enquiry.
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-brand-error">{errors.consent.message}</p>
          )}
        </fieldset>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Submit enquiry"}
          </Button>
        )}
      </div>

      {status === "err" && (
        <p className="mt-4 text-sm text-brand-error">
          Sorry — something went wrong. Please try again or call us directly.
        </p>
      )}
    </form>
  );
}
