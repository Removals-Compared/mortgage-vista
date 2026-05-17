"use client";

import * as React from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

type Testimonial = {
  name: string;
  role: string;
  body: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Aisha & Tom Bennett",
    role: "First-time buyers, Reading",
    body: "Three lenders had already turned us down because of Tom's contractor income. Mortgage Vista found a building society that understood day-rate work and we completed inside seven weeks.",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    role: "Remortgage, Manchester",
    body: "I was about to fix with my existing bank at 5.39%. Within two days they showed me a five-year deal at 4.04% with the same monthly outgoings. That's close to £180 a month back in my pocket.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Buy-to-let landlord, Leicester",
    body: "I have four BTL flats across two limited companies. They restructured the lending across three lenders so my SPV could absorb the next purchase without dropping rental cover.",
    rating: 5,
  },
  {
    name: "Margaret & Geoff Rowe",
    role: "Equity release, Bath",
    body: "Patient, properly explained, and never once pushy. The adviser walked us and our daughter through every option, including the ones we ended up not taking.",
    rating: 5,
  },
  {
    name: "Daniel Murphy",
    role: "Self-employed, Glasgow",
    body: "One year of accounts and a freshly registered limited company. I assumed it was hopeless. They got me a 4.49% five-year fix with 15% deposit. Couldn't be happier.",
    rating: 5,
  },
];

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [perView, setPerView] = React.useState(1);

  React.useEffect(() => {
    const onResize = () => {
      setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <Section bg="white">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              What clients say
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Real outcomes from real UK clients
            </h2>
            <p className="mt-4 text-brand-muted">
              Names and details have been used with permission. Service
              standards are independent of outcome and rates change daily.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              disabled={index === 0}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-border text-brand-ink hover:border-brand-black disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              disabled={index === maxIndex}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-border text-brand-ink hover:border-brand-black disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <ul
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(index * 100) / perView}%)`,
            }}
          >
            {testimonials.map((t) => (
              <li
                key={t.name}
                className="shrink-0 px-3"
                style={{ flexBasis: `${100 / perView}%` }}
              >
                <article className="h-full rounded-2xl border border-brand-border bg-brand-surface p-7 shadow-soft">
                  <Quote className="h-7 w-7 text-brand-gold" aria-hidden />
                  <p className="mt-4 text-base leading-relaxed text-brand-ink">
                    “{t.body}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-black text-sm font-bold text-white">
                      {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-ink">{t.name}</div>
                      <div className="text-xs text-brand-muted">{t.role}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
