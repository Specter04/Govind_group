CREATE TABLE IF NOT EXISTS "govind group clients" (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  enquiry_type TEXT NOT NULL,
  project TEXT NOT NULL DEFAULT 'General Enquiry',
  project_slug TEXT,
  message TEXT,
  source_page TEXT NOT NULL DEFAULT 'contact',
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS govind_group_clients_created_at_idx
  ON "govind group clients" (created_at DESC);

CREATE INDEX IF NOT EXISTS govind_group_clients_email_idx
  ON "govind group clients" (email);
