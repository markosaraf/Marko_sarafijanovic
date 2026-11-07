-- Run as the database owner. The web app uses portfolio_counter, never the owner.
CREATE SCHEMA IF NOT EXISTS portfolio;
REVOKE ALL ON SCHEMA portfolio FROM PUBLIC;
CREATE OR REPLACE VIEW portfolio.user_total AS
SELECT count(*)::integer AS total FROM public."user" u
WHERE NOT EXISTS (SELECT 1 FROM public.deleted_users d WHERE d.user_id = u.id);
CREATE TABLE IF NOT EXISTS portfolio.settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  counter_visible boolean NOT NULL DEFAULT true
);
INSERT INTO portfolio.settings(id) VALUES(true) ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS portfolio.sessions (
  token_hash text PRIMARY KEY, expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS portfolio.login_limits (
  key text PRIMARY KEY, attempts integer NOT NULL, expires_at timestamptz NOT NULL
);
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'portfolio_counter') THEN
    CREATE ROLE portfolio_counter LOGIN;
  END IF;
END $$;
GRANT USAGE ON SCHEMA portfolio TO portfolio_counter;
GRANT SELECT ON portfolio.user_total TO portfolio_counter;
GRANT SELECT, UPDATE ON portfolio.settings TO portfolio_counter;
GRANT SELECT, INSERT, UPDATE, DELETE ON portfolio.sessions, portfolio.login_limits TO portfolio_counter;
