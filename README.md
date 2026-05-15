# Mortgage Vista Limited — Website

Production-ready Next.js 16 website for a UK mortgage broker. Built to FCA-conscious, conversion-optimised, accessibility-first standards.

## Tech stack

- **Next.js 16** (App Router, RSC, Turbopack)
- **TypeScript** in strict mode (no `any`)
- **Tailwind CSS v4** with brand tokens in `app/globals.css` (`@theme`)
- **shadcn-style UI primitives** built on Radix UI
- **React Hook Form + Zod** form validation
- **Recharts** for the calculator chart
- **Framer Motion** available for micro-interactions
- **Lucide** icons
- **Markdown blog** via remark (rename `.md` → `.mdx` if you need JSX)

## Quick start

```bash
npm install
npm run dev
```

The site runs at <http://localhost:3000>. To build and run production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  (marketing)/         # Public pages: home, about, contact, services, insights
    page.tsx
    about/
    contact/
    services/[slug]/
    insights/
    insights/[slug]/
  (legal)/             # Privacy, cookie, terms, complaints, regulatory
  calculator/          # Three calculators on tabs
  api/                 # Form & calculator email endpoints
  layout.tsx           # Root layout — fonts, header, footer, cookie banner
  globals.css          # Tailwind + brand tokens
  sitemap.ts           # Auto-generated sitemap.xml
  robots.ts            # robots.txt

components/
  calculators/         # MonthlyRepayment, Affordability, StampDuty
  forms/               # ContactForm (4-step), QuickQuoteForm, NewsletterForm
  layout/              # Header, Footer, CookieBanner
  sections/            # Hero, ServicesGrid, FAQ, etc.
  seo/                 # JsonLd helpers
  ui/                  # Button, Input, Card, Tabs, etc.

config/
  rates.ts             # Base rate, SDLT bands, market averages — single source of truth
  site.ts              # Company contact, FCA FRN, regulatory wording
  navigation.ts        # Header, footer, services list

content/
  blog/*.md            # Six pre-written UK mortgage articles
  services.ts          # Long-form copy for the seven service pages

lib/
  calculations.ts      # Pure mortgage maths
  validations.ts       # Zod schemas
  posts.ts             # Blog reader + markdown renderer
  utils.ts             # cn(), formatGBP, formatPercent
```

## How to update content

### Update the Bank of England base rate

Open `config/rates.ts` and change `currentBaseRate`. The new figure flows automatically into:

- The hero base-rate banner
- The calculator default
- The "How these calculators work" copy
- The blog post about the rate outlook (manual update there)

```ts
currentBaseRate: 3.75,           // ← change this
baseRateLastUpdated: "2026-05-08",
averageRates: { ... },           // refresh quarterly
```

### Update SDLT bands

When HMRC changes Stamp Duty, edit `stampDutyBands`, `firstTimeBuyerBands`, `ftbCap`, `additionalPropertySurcharge`, or `nonResidentSurcharge` in the same file. The calculator and all on-page copy that references the bands updates automatically.

### Update company contact details, FRN, ICO number

Open `config/site.ts`. Replace the `[CLIENT TO PROVIDE]` and `[FRN PLACEHOLDER]` markers with real values. Don't invent an FRN — it must come from the FCA Register.

### Add a blog post

Drop a new `.md` file into `content/blog/`. Frontmatter format:

```markdown
---
title: "Post title"
category: "Buyer Guides"
date: "2026-06-01"
excerpt: "One-sentence summary used in cards and meta description."
author: "Adviser Name"
---

## H2 heading

Body markdown here…
```

The post appears in the listing automatically and gets its own `/insights/<slug>` route.

### Add a service page

Service pages are driven by `content/services.ts`. Add a new entry keyed by slug, then add the slug to `config/navigation.ts` `services`.

## Forms — wiring real email delivery

All three API routes (`app/api/contact`, `app/api/newsletter`, `app/api/calculator-result`) currently log submissions to the console. Each file's header documents exactly how to switch to a real provider.

**Recommended: Resend.**

```bash
npm install resend
```

Add to `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
MAIL_FROM=enquiries@yourdomain.co.uk
MAIL_TO=advisers@yourdomain.co.uk
```

Then in `app/api/contact/route.ts`, replace the `// TODO: send email` comment with the snippet documented in the file header.

For the newsletter you may prefer Mailchimp, ConvertKit, or Resend Audiences — see the comments in `app/api/newsletter/route.ts`.

## Required environment variables

Create a `.env.local` from this template:

```env
# Email delivery (Resend, SendGrid, or your choice)
RESEND_API_KEY=
MAIL_FROM=
MAIL_TO=

# Newsletter ESP (pick one set)
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=
MAILCHIMP_SERVER=

# Or:
CONVERTKIT_API_KEY=
CONVERTKIT_FORM_ID=

# Site URL — used by sitemap.xml and OG tags
NEXT_PUBLIC_SITE_URL=https://www.mortgagevista.co.uk

# Optional: GA4 / Plausible
NEXT_PUBLIC_GA_ID=
```

Update `config/site.ts` `url` and any meta where appropriate.

## Deploying to Vercel

1. Push the repo to GitHub (or your Git host).
2. In Vercel, **Add New → Project**, import the repo.
3. Framework preset auto-detects as **Next.js**. Defaults are fine.
4. Add the environment variables from the section above under **Settings → Environment Variables**.
5. Click **Deploy**. First build takes 60–90 seconds.
6. Add your domain under **Settings → Domains** and update DNS as instructed.
7. After deploy, update `NEXT_PUBLIC_SITE_URL` and `siteConfig.url` to the live URL so OG tags and sitemap point to production.

## Compliance & legal — what still needs doing

- [ ] Replace `[FRN PLACEHOLDER]` in `config/site.ts` with the firm's real FCA Firm Reference Number
- [ ] Replace company number, ICO registration, address, phone in `config/site.ts`
- [ ] Add real headshots to `public/team/` and update `app/(marketing)/about/page.tsx`
- [ ] Replace the Google Maps embed `src` in `app/(marketing)/contact/page.tsx`
- [ ] Fill in `[CLIENT TO PROVIDE]` blocks on About → Our Story
- [ ] Update legal pages in `app/(legal)/` with the firm's real signing date
- [ ] Sense-check the SDLT bands in `config/rates.ts` against the HMRC site at the start of each tax year
- [ ] If you're advising on equity release, confirm the firm is an Equity Release Council member-firm — this is referenced in the regulatory disclosure

## Brand discipline

The brand uses black + white + a single gold accent (`#EBAB23`). The discipline is documented in `app/globals.css` (`@theme` block) and enforced through component variants. Specifically:

- Gold is **only** used for: CTAs (`<Button variant="gold">`), badges, large headings 18pt+, the base-rate banner background, dividers, icons.
- Gold is **never** used for body copy, small links, or as a large fill.
- Buttons: `variant="gold"` (the default) gives gold bg + black text.
- Hero sections use black bg + white text + a single gold CTA.
- Most of the page is white or `bg-brand-surface` — let black and gold work through contrast.

## Performance, a11y, SEO

- Per-page metadata via the Next.js Metadata API
- JSON-LD: `LocalBusiness` + `FinancialService` on home, `FAQPage` on home and service pages, `BreadcrumbList` on service pages, `Article`-ready on blog posts
- Auto-generated `sitemap.xml` and `robots.txt`
- WCAG 2.1 AA: skip-to-content link, visible focus ring, keyboard nav across all interactive components, ARIA labels on form fields, semantic landmarks
- `next/font` for both type families; no FOUT
- Honeypot anti-spam on every public form (the hidden `website` field)

## Scripts

| Command         | Action                          |
| --------------- | ------------------------------- |
| `npm run dev`   | Start dev server with Turbopack |
| `npm run build` | Production build                |
| `npm start`     | Run production build locally    |
| `npm run lint`  | ESLint                          |

## License

Proprietary — © Mortgage Vista Limited. All rights reserved.
