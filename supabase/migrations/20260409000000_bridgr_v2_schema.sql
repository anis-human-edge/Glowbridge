-- ==============================================================================
-- BRIDGR DATA SCHEMA v2.0 (Multi-Tenant BTH Prefix)
-- Master Postgres Schema & RLS Policies
-- ==============================================================================

-- 1. Create Enums (Using IF NOT EXISTS for safety)
DO $$ BEGIN
    CREATE TYPE bth_platform_role AS ENUM ('brand', 'creator', 'manager');
    CREATE TYPE bth_user_status AS ENUM ('pending', 'active', 'suspended', 'deleted');
    CREATE TYPE bth_visibility_status AS ENUM ('open', 'open_all', 'open_brands', 'product_only', 'selective', 'private', 'unavailable');
    CREATE TYPE bth_entity_status AS ENUM ('draft','pending','approved','paused','removed');
    CREATE TYPE bth_data_source_type AS ENUM ('oauth', 'self_reported');
    CREATE TYPE bth_sentiment_type AS ENUM ('positive','constructive','concern');
    CREATE TYPE bth_brand_action_type AS ENUM ('none','noted','flagged');
    CREATE TYPE bth_cycle_stage AS ENUM ('submission','audit','feedback','decision','event','results','archived');
    CREATE TYPE bth_creator_tier_v2 AS ENUM ('new','active','recognised');
    CREATE TYPE bth_top10_entity_type AS ENUM ('products','creators');
    CREATE TYPE bth_event_slot_type AS ENUM ('featured','trial','standard');
    CREATE TYPE bth_deal_initiation_source AS ENUM ('event_night','platform_match','direct_message');
    CREATE TYPE bth_deal_status AS ENUM ('pending','active','completed','disputed','voided');
    CREATE TYPE bth_deal_content_status AS ENUM ('submitted','approved','flagged');
    CREATE TYPE bth_affiliate_event_type AS ENUM ('click','conversion');
    CREATE TYPE bth_payout_status AS ENUM ('pending','processing','paid','failed');
    CREATE TYPE bth_dispute_status AS ENUM ('open','in_mediation','resolved','escalated');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Core Entity Tables
CREATE TABLE IF NOT EXISTS public.bth_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role bth_platform_role,
  status bth_user_status DEFAULT 'pending',
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.bth_brands_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.bth_users(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT NOT NULL,
  logo_url TEXT,
  founder_name TEXT,
  founder_bio TEXT,
  website_url TEXT,
  hq_city TEXT,
  vat_number TEXT,
  visibility bth_visibility_status DEFAULT 'product_only',
  status bth_entity_status DEFAULT 'pending',
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES public.bth_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_brand_socials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID REFERENCES public.bth_brands_v2(id) ON DELETE CASCADE,
  platform TEXT,
  url TEXT,
  handle TEXT
);

CREATE TABLE IF NOT EXISTS public.bth_creators_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.bth_users(id) ON DELETE CASCADE UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  hq_city TEXT,
  availability bth_visibility_status DEFAULT 'open',
  visibility bth_visibility_status DEFAULT 'open_brands',
  status bth_entity_status DEFAULT 'pending',
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES public.bth_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_creator_socials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  platform TEXT,
  handle TEXT,
  url TEXT,
  follower_count INTEGER,
  engagement_rate DECIMAL(5,2),
  data_source bth_data_source_type DEFAULT 'self_reported',
  last_synced TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.bth_creator_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.bth_creator_styles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  style TEXT NOT NULL
);

-- 3. Product & Pool Tables
CREATE TABLE IF NOT EXISTS public.bth_products_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID REFERENCES public.bth_brands_v2(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price_gbp DECIMAL(10,2),
  commission_rate DECIMAL(5,2),
  visibility bth_visibility_status DEFAULT 'open',
  status bth_entity_status DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES public.bth_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_product_selling_points (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  point_text TEXT,
  display_order INTEGER
);

CREATE TABLE IF NOT EXISTS public.bth_product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  image_url TEXT,
  display_order INTEGER,
  is_hero BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.bth_product_audiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  age_min INTEGER,
  age_max INTEGER,
  interest_tags TEXT[],
  lifestyle_tags TEXT[]
);

-- 4. AI Audit Tables
CREATE TABLE IF NOT EXISTS public.bth_ai_audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  triggered_by TEXT,
  triggered_by_user UUID REFERENCES public.bth_users(id),
  status TEXT,
  overall_score INTEGER,
  market_gap_score INTEGER,
  competitor_density TEXT,
  creator_demand_level TEXT,
  top_category_match TEXT,
  ai_recommendations JSONB,
  keyword_opportunities JSONB,
  competitor_data JSONB,
  creator_fit_data JSONB,
  raw_llm_output TEXT,
  run_duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_ai_audit_overrides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id UUID REFERENCES public.bth_ai_audits(id) ON DELETE CASCADE,
  manager_id UUID REFERENCES public.bth_users(id),
  field_overridden TEXT,
  original_value TEXT,
  new_value TEXT,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Creator Feedback Tables
CREATE TABLE IF NOT EXISTS public.bth_product_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  liked BOOLEAN DEFAULT false,
  star_score INTEGER,
  interest_signal BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, creator_id)
);

CREATE TABLE IF NOT EXISTS public.bth_product_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  sentiment bth_sentiment_type,
  show_name_to_brand BOOLEAN DEFAULT false,
  brand_action bth_brand_action_type DEFAULT 'none',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_product_comment_themes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  theme_label TEXT,
  comment_count INTEGER,
  comment_ids UUID[],
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Scoring & Ranking Tables
CREATE TABLE IF NOT EXISTS public.bth_cycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  stage bth_cycle_stage DEFAULT 'submission',
  submission_opens_at TIMESTAMPTZ,
  feedback_closes_at TIMESTAMPTZ,
  top10_locked_at TIMESTAMPTZ,
  top10_published_at TIMESTAMPTZ,
  event_date DATE,
  cycle_closes_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.bth_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_product_cycle_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  ai_score INTEGER,
  engagement_score DECIMAL(6,2),
  composite_score DECIMAL(6,2),
  category_rank INTEGER,
  overall_rank INTEGER,
  top10_eligible BOOLEAN,
  top10_featured BOOLEAN DEFAULT false,
  score_locked BOOLEAN DEFAULT false,
  last_computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, cycle_id)
);

CREATE TABLE IF NOT EXISTS public.bth_creator_cycle_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  contribution_score DECIMAL(6,2),
  influence_score DECIMAL(6,2),
  composite_score DECIMAL(6,2),
  tier bth_creator_tier_v2 DEFAULT 'new',
  category_rank INTEGER,
  overall_rank INTEGER,
  top10_featured BOOLEAN DEFAULT false,
  score_locked BOOLEAN DEFAULT false,
  last_computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(creator_id, cycle_id)
);

CREATE TABLE IF NOT EXISTS public.bth_score_overrides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type bth_top10_entity_type,
  entity_id UUID,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  manager_id UUID REFERENCES public.bth_users(id),
  score_field TEXT,
  value_before DECIMAL(6,2),
  value_after DECIMAL(6,2),
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Top 10 & Event Tables
CREATE TABLE IF NOT EXISTS public.bth_top10_announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  type bth_top10_entity_type,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  published_by UUID REFERENCES public.bth_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_top10_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  announcement_id UUID REFERENCES public.bth_top10_announcements(id) ON DELETE CASCADE,
  entity_id UUID,
  position INTEGER,
  category TEXT,
  composite_score DECIMAL(6,2),
  manually_adjusted BOOLEAN DEFAULT false,
  adjustment_reason TEXT
);

CREATE TABLE IF NOT EXISTS public.bth_event_attendees_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.bth_users(id) ON DELETE CASCADE,
  role bth_platform_role,
  slot_type bth_event_slot_type,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT false,
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.bth_event_shortlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.bth_users(id) ON DELETE CASCADE,
  target_id UUID,
  target_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_event_matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES public.bth_brands_v2(id),
  creator_id UUID REFERENCES public.bth_creators_v2(id),
  match_source TEXT,
  confirmed BOOLEAN DEFAULT false,
  meeting_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Deals & Commission Tables
CREATE TABLE IF NOT EXISTS public.bth_deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES public.bth_brands_v2(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.bth_products_v2(id) ON DELETE CASCADE,
  initiated_by TEXT,
  initiation_source bth_deal_initiation_source,
  commission_rate DECIMAL(5,2),
  content_commitment JSONB,
  trial_products_sent INTEGER DEFAULT 0,
  status bth_deal_status DEFAULT 'pending',
  agreed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_deal_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID REFERENCES public.bth_deals(id) ON DELETE CASCADE,
  content_type TEXT,
  content_url TEXT,
  published_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status bth_deal_content_status DEFAULT 'submitted',
  brand_rating INTEGER,
  brand_rated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_affiliate_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID REFERENCES public.bth_deals(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  short_code TEXT UNIQUE,
  destination_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_affiliate_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID REFERENCES public.bth_affiliate_links(id) ON DELETE CASCADE,
  event_type bth_affiliate_event_type,
  session_id TEXT,
  revenue_gbp DECIMAL(10,2),
  commission_gbp DECIMAL(10,2),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.bth_creators_v2(id) ON DELETE CASCADE,
  cycle_id UUID REFERENCES public.bth_cycles(id) ON DELETE CASCADE,
  total_commission_gbp DECIMAL(10,2),
  platform_fee_gbp DECIMAL(10,2),
  net_payout_gbp DECIMAL(10,2),
  status bth_payout_status DEFAULT 'pending',
  payment_reference TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_deal_disputes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID REFERENCES public.bth_deals(id) ON DELETE CASCADE,
  raised_by_user UUID REFERENCES public.bth_users(id),
  raised_by_role TEXT,
  description TEXT NOT NULL,
  status bth_dispute_status DEFAULT 'open',
  resolution_note TEXT,
  resolved_by UUID REFERENCES public.bth_users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Messaging & Notification Tables
CREATE TABLE IF NOT EXISTS public.bth_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.bth_users(id),
  recipient_id UUID REFERENCES public.bth_users(id),
  deal_id UUID REFERENCES public.bth_deals(id),
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bth_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.bth_users(id),
  type TEXT,
  title TEXT,
  body TEXT,
  deep_link TEXT,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Enforcement
ALTER TABLE public.bth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_brands_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_creators_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_products_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_product_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_product_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bth_notifications ENABLE ROW LEVEL SECURITY;

-- Simple test policies for now (Allow everyone read/write logic)
CREATE POLICY "RLS Full Access Users" ON public.bth_users FOR ALL USING (true);
CREATE POLICY "RLS Full Access Brands" ON public.bth_brands_v2 FOR ALL USING (true);
CREATE POLICY "RLS Full Access Creators" ON public.bth_creators_v2 FOR ALL USING (true);
CREATE POLICY "RLS Full Access Products" ON public.bth_products_v2 FOR ALL USING (true);
CREATE POLICY "RLS Full Access Deals" ON public.bth_deals FOR ALL USING (true);
CREATE POLICY "RLS Full Access Messages" ON public.bth_messages FOR ALL USING (true);
CREATE POLICY "RLS Full Access Notifications" ON public.bth_notifications FOR ALL USING (true);

-- End of schema
