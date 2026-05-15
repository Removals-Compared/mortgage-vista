"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "ok" | "err">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
      <p className="text-sm text-brand-gold-light">
        Thank you — we&apos;ll be in touch with rate updates.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
        className="hidden"
        {...register("website")}
      />
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <Input
        id="newsletter-email"
        type="email"
        placeholder="you@email.co.uk"
        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11"
        aria-invalid={!!errors.email}
        {...register("email")}
      />
      <Button type="submit" disabled={status === "loading"} size="sm">
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </Button>
      {errors.email && (
        <p className="text-xs text-brand-error sm:basis-full">
          {errors.email.message}
        </p>
      )}
      {status === "err" && (
        <p className="text-xs text-brand-error sm:basis-full">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
