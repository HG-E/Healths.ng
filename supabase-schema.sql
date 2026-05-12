-- ─────────────────────────────────────────────────────────────────
-- Healths.ng Media Limited — Supabase Database Schema
-- Run this entire file in: Supabase → SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────────

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  service_interest TEXT,
  message TEXT NOT NULL,
  source_page TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking/consultation requests
CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization TEXT,
  service_type TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT,
  brevo_contact_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training registrations
CREATE TABLE IF NOT EXISTS training_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization TEXT,
  profession TEXT,
  training_name TEXT NOT NULL,
  training_date TEXT,
  payment_status TEXT DEFAULT 'pending',
  amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_registrations ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist (so this script is safe to re-run)
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON booking_requests;
DROP POLICY IF EXISTS "Allow public inserts" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public inserts" ON training_registrations;
DROP POLICY IF EXISTS "Service role full access" ON contact_submissions;
DROP POLICY IF EXISTS "Service role full access" ON booking_requests;
DROP POLICY IF EXISTS "Service role full access" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Service role full access" ON training_registrations;

-- Allow anyone to submit forms (public inserts only)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON booking_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON training_registrations
  FOR INSERT WITH CHECK (true);

-- Service role can read/update everything (for your admin panel later)
CREATE POLICY "Service role full access" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON booking_requests
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON training_registrations
  FOR ALL USING (auth.role() = 'service_role');
