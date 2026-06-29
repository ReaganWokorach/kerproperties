-- ================================================================
--  Ker Properties — Supabase Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- ── 1. LISTINGS TABLE ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.listings (
  id            BIGSERIAL PRIMARY KEY,
  type          TEXT        NOT NULL CHECK (type IN ('land-sale','land-rent','house-sale','house-rent')),
  title         TEXT        NOT NULL,
  location      TEXT        NOT NULL,
  location_key  TEXT        NOT NULL,
  price         BIGINT      NOT NULL DEFAULT 0,
  price_label   TEXT        NOT NULL DEFAULT '',
  price_note    TEXT        NOT NULL DEFAULT '',
  features      TEXT[]      NOT NULL DEFAULT '{}',
  feature_icons TEXT[]      NOT NULL DEFAULT '{}',
  description   TEXT                 DEFAULT '',
  photos        TEXT[]      NOT NULL DEFAULT '{}',
  available     BOOLEAN     NOT NULL DEFAULT TRUE,
  featured      BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS listings_updated_at ON public.listings;
CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 2. MESSAGES TABLE ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id          BIGSERIAL PRIMARY KEY,
  sender_name TEXT        NOT NULL,
  phone       TEXT,
  email       TEXT,
  subject     TEXT,
  body        TEXT        NOT NULL,
  category    TEXT        NOT NULL CHECK (category IN ('contact','enquiry','reviews')),
  rating      SMALLINT    CHECK (rating BETWEEN 1 AND 5),
  service     TEXT,
  location    TEXT,
  unread      BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. ROW LEVEL SECURITY ────────────────────────────────────
-- Listings: public read, admin write only
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "listings_public_read"  ON public.listings;
DROP POLICY IF EXISTS "listings_admin_write"  ON public.listings;
DROP POLICY IF EXISTS "listings_admin_delete" ON public.listings;

CREATE POLICY "listings_public_read"
  ON public.listings FOR SELECT
  USING (TRUE);                                    -- anyone can read

CREATE POLICY "listings_admin_write"
  ON public.listings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "listings_admin_update"
  ON public.listings FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "listings_admin_delete"
  ON public.listings FOR DELETE
  USING (auth.role() = 'authenticated');

-- Messages: public INSERT only (submit enquiries), admin read/delete
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "messages_public_insert" ON public.messages;
DROP POLICY IF EXISTS "messages_admin_read"    ON public.messages;
DROP POLICY IF EXISTS "messages_admin_update"  ON public.messages;
DROP POLICY IF EXISTS "messages_admin_delete"  ON public.messages;

CREATE POLICY "messages_public_insert"
  ON public.messages FOR INSERT
  WITH CHECK (TRUE);                               -- anyone can submit a message

CREATE POLICY "messages_admin_read"
  ON public.messages FOR SELECT
  USING (auth.role() = 'authenticated');           -- only admin can read messages

CREATE POLICY "messages_admin_update"
  ON public.messages FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "messages_admin_delete"
  ON public.messages FOR DELETE
  USING (auth.role() = 'authenticated');

-- ── 4. SEED DEFAULT LISTINGS ─────────────────────────────────
-- Run this block ONCE after creating the tables.
-- (These are the same default listings from the original main.js)

INSERT INTO public.listings (type, title, location, location_key, price, price_label, price_note, features, feature_icons, description, available, featured) VALUES
('land-sale','50×100ft Plot, Layibi','Layibi Division, Gulu City','gulu',45000000,'UGX 45,000,000','Negotiable',ARRAY['50×100ft','Titled','Near Road'],ARRAY['ti-ruler','ti-certificate','ti-road'],'Prime plot in Layibi Division, Gulu City. Title deed ready. Near tarmac road.',TRUE,TRUE),
('land-sale','1 Acre Plot, Pece Division','Pece, Gulu District','gulu',120000000,'UGX 120,000,000','Firm price',ARRAY['1 Acre','Mailo Title','Flat land'],ARRAY['ti-ruler','ti-certificate','ti-mountain'],'Large flat acre in Pece Division. Mailo land title. Suitable for development.',TRUE,TRUE),
('land-sale','Prime Commercial Plot, Gulu','Along Kampala Road, Gulu','gulu',80000000,'UGX 80,000,000','Negotiable',ARRAY['60×100ft','Freehold','Commercial zone'],ARRAY['ti-ruler','ti-certificate','ti-building-store'],'Commercial plot along Kampala Road, Gulu. High visibility. Freehold title.',TRUE,TRUE),
('land-sale','2-Acre Plot, Mbarara','Kakoba Division, Mbarara','mbarara',180000000,'UGX 180,000,000','Negotiable',ARRAY['2 Acres','Mailo Title','Near highway'],ARRAY['ti-ruler','ti-certificate','ti-road'],'Large 2-acre plot in Mbarara City near the main highway. Ideal for commercial use.',TRUE,FALSE),
('land-sale','Residential Plot, Kireka','Kireka, Wakiso District','wakiso',95000000,'UGX 95,000,000','Firm price',ARRAY['50×100ft','Freehold','Tarmac access'],ARRAY['ti-ruler','ti-certificate','ti-road'],'Well-located plot in Kireka with tarmac road access. Freehold title.',TRUE,FALSE),
('land-sale','Plot for Sale, Jinja City','Walukuba, Jinja','jinja',60000000,'UGX 60,000,000','Negotiable',ARRAY['50×100ft','Titled','Near lake'],ARRAY['ti-ruler','ti-certificate','ti-ripple'],'Plot near the Nile in Jinja City. Suitable for residential or hospitality use.',TRUE,FALSE),
('house-rent','3-Bedroom House, Gulu','Laroo Division, Gulu City','gulu',500000,'UGX 500,000','per month',ARRAY['3 Bedrooms','Borehole water','Parking'],ARRAY['ti-bed','ti-droplet','ti-car'],'Spacious 3-bedroom house with borehole water and ample parking in Gulu.',TRUE,TRUE),
('house-rent','Self-Contained Room, Kampala','Ntinda, Kampala','kampala',250000,'UGX 250,000','per month',ARRAY['Self-contained','Water & power','Secure'],ARRAY['ti-home','ti-bolt','ti-lock'],'Modern self-contained single room in Ntinda, Kampala. Security guard on site.',TRUE,TRUE),
('house-rent','2-Bedroom Apartment, Mbarara','Rutooma, Mbarara','mbarara',450000,'UGX 450,000','per month',ARRAY['2 Bedrooms','Tiled floors','Secure compound'],ARRAY['ti-bed','ti-square','ti-lock'],'Modern 2-bedroom apartment in Mbarara City. Tiled floors and secure compound.',TRUE,TRUE),
('house-rent','4-Bedroom House, Entebbe','Entebbe Municipality','entebbe',1200000,'UGX 1,200,000','per month',ARRAY['4 Bedrooms','2 Bathrooms','Lake view'],ARRAY['ti-bed','ti-bath','ti-ripple'],'Spacious 4-bedroom house near Entebbe airport with partial lake view.',TRUE,FALSE),
('house-rent','Studio Apartment, Jinja','Jinja City Centre','jinja',200000,'UGX 200,000','per month',ARRAY['Studio','Furnished','24hr power'],ARRAY['ti-home','ti-sofa','ti-bolt'],'Cosy furnished studio apartment in Jinja. 24-hour electricity supply.',TRUE,FALSE),
('house-rent','3-Bedroom Bungalow, Mbale','Industrial Division, Mbale','mbale',380000,'UGX 380,000','per month',ARRAY['3 Bedrooms','Solar backup','Compound'],ARRAY['ti-bed','ti-solar-panel','ti-fence'],'Modern bungalow with solar backup in Mbale City. Quiet compound.',TRUE,FALSE),
('house-sale','3-Bedroom House for Sale, Gulu','Pece Division, Gulu City','gulu',95000000,'UGX 95,000,000','Negotiable',ARRAY['3 Bedrooms','2 Bathrooms','Titled'],ARRAY['ti-bed','ti-bath','ti-certificate'],'Well-built 3-bedroom house on a titled plot in Pece Division. Ready to move in.',TRUE,TRUE),
('land-rent','1-Acre Farm Land, Lira','Ojwina Division, Lira City','lira',150000,'UGX 150,000','per month',ARRAY['1 Acre','Fertile soil','Water access'],ARRAY['ti-ruler','ti-plant','ti-droplet'],'Fertile farmland available for monthly lease in Lira. Suitable for agriculture.',TRUE,TRUE)
ON CONFLICT DO NOTHING;

-- ================================================================
--  DONE. Tables, RLS policies, and seed data are ready.
-- ================================================================
