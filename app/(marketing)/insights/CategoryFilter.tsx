"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function CategoryFilter({
  active,
  categories,
}: {
  active?: string;
  categories: string[];
}) {
  return (
    <nav aria-label="Category filter" className="flex flex-wrap gap-2">
      <FilterPill href="/insights" active={!active}>
        All
      </FilterPill>
      {categories.map((c) => (
        <FilterPill
          key={c}
          href={`/insights?category=${encodeURIComponent(c)}`}
          active={active?.toLowerCase() === c.toLowerCase()}
        >
          {c}
        </FilterPill>
      ))}
    </nav>
  );
}

function FilterPill({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "border-brand-black bg-brand-black text-white"
          : "border-brand-border bg-white text-brand-ink hover:border-brand-black",
      )}
    >
      {children}
    </Link>
  );
}
