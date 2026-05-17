import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
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
              <ContactBlock
                icon={MapPin}
                title="Office"
                value={`${siteConfig.contact.addressLine1}, ${siteConfig.contact.city} ${siteConfig.contact.postcode}`}
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
            <div className="lg:col-span-8 space-y-6">
              <ContactForm />

              {/* Map placeholder. Replace embed src with the office's Google Maps URL. */}
              <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-soft">
                <iframe
                  title="Office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5!2d-0.1276!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwNyc0MC4xIlc!5e0!3m2!1sen!2suk!4v1700000000000"
                  width="100%"
                  height="320"
                  loading="lazy"
                  className="border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                  /* TODO: client to provide their actual Google Maps embed URL */
                />
              </div>
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
