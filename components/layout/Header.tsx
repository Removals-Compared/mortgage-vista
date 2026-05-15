"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, services } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors",
        scrolled
          ? "bg-brand-black/95 backdrop-blur shadow-pop"
          : "bg-brand-black",
      )}
    >
      <Container className="flex h-16 items-center justify-between text-white">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gold text-brand-black font-extrabold"
          >
            M
          </span>
          <span className="hidden sm:inline">{siteConfig.shortName}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {mainNav.map((item) => {
            if ("dropdown" in item && item.dropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 hover:text-white"
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-72 rounded-2xl border border-brand-border bg-white p-2 shadow-pop">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="block rounded-xl px-3 py-2.5 text-sm text-brand-ink hover:bg-brand-divider"
                          >
                            <div className="font-semibold">{s.short}</div>
                            <div className="text-xs text-brand-muted">
                              {s.summary}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-brand-gold"
                    : "text-white/90 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-brand-gold"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">Call us</span>
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Get a quote</Link>
          </Button>
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-brand-black">
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-white/90 hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                  {"dropdown" in item && item.dropdown && (
                    <ul className="ml-4 mt-1 grid gap-0.5 border-l border-white/10 pl-3">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5"
                          >
                            {s.short}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="mt-3">
                <Button asChild className="w-full">
                  <Link href="/contact">Get a quote</Link>
                </Button>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
