import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-black text-white/80">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label={`${siteConfig.name} home`}
            >
              <Image
                src="/brand/logo-on-dark-320.png"
                alt={siteConfig.name}
                width={320}
                height={124}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Get rate updates
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-4">
            {Object.entries(footerNav).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {title}
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-white/60 hover:text-brand-gold transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/*
          Regulatory wording. Required on every page.
          Content supplied by the compliance review. Edit siteConfig.regulatory
          to update everywhere at once.
        */}
        <div className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/55 space-y-3">
          <p className="font-semibold text-white">
            {siteConfig.regulatory.repossessionWarning}
          </p>
          <p>{siteConfig.regulatory.scopeNotice}</p>
          <p>{siteConfig.regulatory.feeDisclosure}</p>
          <p>
            {siteConfig.regulatory.statement}{" "}
            You can verify this on the{" "}
            <a
              href={siteConfig.regulatory.fcaRegisterUrl}
              className="underline hover:text-brand-gold"
              target="_blank"
              rel="noreferrer"
            >
              FCA Register
            </a>
            .
          </p>
          <p className="pt-3 text-white/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
