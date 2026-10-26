import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact Us | Mortgage Vista Limited",
  description:
    "Speak to a UK mortgage adviser. Free initial consultation, no obligation. Call, email, WhatsApp, or use the form.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-brand-black text-white">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Talk to a real adviser
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Use the multi-step form for a detailed enquiry, the quick form for
            a fast call-back, or skip the forms entirely and ring us directly.
          </p>
        </Container>
      </div>

      <Section bg="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: contact info + quick form */}
            <aside className="lg:col-span-4 space-y-6">
              <ContactBlock
                icon={Phone}
                title="Phone"
                value={siteConfig.contact.phone}
                href={siteConfig.contact.phoneHref}
              />
              <ContactBlock
                icon={Mail}
                title="Email"
                value={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />
              <ContactBlock
                icon={MessageCircle}
                title="WhatsApp"
                value="Click to start a chat"
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              />
              <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-soft">
                <div className="flex items-center gap-2 text-brand-ink">
                  <Clock className="h-4 w-4" />
                  <h2 className="text-sm font-semibold">Opening hours</h2>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-brand-muted">
                  {siteConfig.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-3">
                      <span className="font-medium text-brand-ink">{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                  Quick callback
                </h2>
                <p className="mt-1 text-xs text-brand-muted">
                  Don&apos;t fancy the multi-step? Drop your details here.
                </p>
                <div className="mt-3">
                  <QuickQuoteForm />
                </div>
              </div>
            </aside>

            {/* Right: detailed form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactBlock({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-5 shadow-soft transition-colors hover:border-brand-black"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-divider text-brand-black">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
          {title}
        </div>
        <div className="mt-0.5 font-semibold text-brand-ink">{value}</div>
      </div>
    </Wrapper>
  );
}
