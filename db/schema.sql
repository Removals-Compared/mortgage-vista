-- Mortgage Vista: Neon Postgres schema (idempotent).
-- Written by the public forms (/api/contact, /api/newsletter,
-- /api/calculator-result). Apply once to a fresh database.

-- Contact-page enquiries and quick-quote enquiries.
CREATE TABLE IF NOT EXISTS enquiries (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  source        text        NOT NULL,            -- 'contact-page' | 'quick-quote'
  enquiry_type  text,                            -- contact form only
  name          text        NOT NULL,
  email         text        NOT NULL,
  phone         text,
  postcode      text,
  property_value numeric,
  loan_required numeric,
  message       text,                            -- notes (contact) or enquiry text (quick quote)
  context       text,                            -- page/product the quick quote came from
  consent       boolean     NOT NULL,            -- privacy notice accepted
  details       jsonb       NOT NULL DEFAULT '{}'::jsonb,
  status        text        NOT NULL DEFAULT 'new',
  notified      boolean     NOT NULL DEFAULT false  -- adviser email sent
);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);

-- Newsletter sign-ups (one row per address).
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  email       text        NOT NULL,
  status      text        NOT NULL DEFAULT 'subscribed'
);
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_key
  ON newsletter_subscribers (lower(email));

-- "Email me my results" calculator leads.
CREATE TABLE IF NOT EXISTS calculator_leads (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  email         text        NOT NULL,
  results_type  text        NOT NULL,            -- repayment | affordability | stamp-duty
  payload       jsonb       NOT NULL DEFAULT '{}'::jsonb,
  emailed       boolean     NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS calculator_leads_created_idx ON calculator_leads (created_at DESC);
