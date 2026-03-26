-- ==============================================================================
-- GLOWBRIDGE DATA SCHEMA v1.0
-- Master Postgres Schema & RLS Policies
-- Execute this directly in the Supabase SQL Editor
-- ==============================================================================

-- 1. Create Data Types
CREATE TYPE user_role AS ENUM ('brand', 'creator', 'admin');
CREATE TYPE application_status AS ENUM ('applied', 'under_review', 'approved', 'rejected');
CREATE TYPE creator_tier AS ENUM ('nano', 'micro', 'host');
CREATE TYPE brand_tier AS ENUM ('growth', 'protocol');
CREATE TYPE event_type AS ENUM ('digital', 'physical');
CREATE TYPE event_status AS ENUM ('upcoming', 'live', 'completed');
CREATE TYPE rsvp_status AS ENUM ('attending', 'waitlisted', 'attended', 'no_show');

-- 2. Base Profile Extension (1:1 with auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Supplier Entity: Brands
CREATE TABLE public.brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT NOT NULL,
  website TEXT,
  hq_location TEXT,
  status application_status DEFAULT 'applied',
  tier brand_tier DEFAULT 'growth',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Demand Entity: Creators
CREATE TABLE public.creators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  instagram_handle TEXT,
  tiktok_handle TEXT,
  follower_count INTEGER DEFAULT 0,
  tier creator_tier DEFAULT 'nano',
  status application_status DEFAULT 'applied',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Products Inventory
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  ingredients TEXT,
  hero_image TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Live / Digital Events Engine
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type event_type DEFAULT 'digital',
  date TIMESTAMPTZ NOT NULL,
  max_capacity INTEGER NOT NULL,
  status event_status DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Event Product Showcase (Many-to-Many)
CREATE TABLE public.event_products (
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, product_id)
);

-- 8. Creator RSVP System
CREATE TABLE public.event_rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  status rsvp_status DEFAULT 'attending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, creator_id)
);

-- 9. Consumer Product Sentiment / Reviews
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  social_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- AUTOMATION TRIGGER: Insert auth.users straight into profiles/brands/creators
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  extracted_role user_role;
BEGIN
  -- Safely extract and fallback role
  extracted_role := COALESCE((new.raw_user_meta_data->>'role')::user_role, 'creator'::user_role);

  -- Insert Base Profile
  INSERT INTO public.profiles (id, role, full_name)
  VALUES (new.id, extracted_role, new.raw_user_meta_data->>'full_name');

  -- Route to specific role tables
  IF extracted_role = 'brand' THEN
    INSERT INTO public.brands (profile_id, company_name, website, hq_location)
    VALUES (
      new.id, 
      new.raw_user_meta_data->>'company_name', 
      new.raw_user_meta_data->>'website', 
      new.raw_user_meta_data->>'hq_location'
    );
  ELSIF extracted_role = 'creator' THEN
    INSERT INTO public.creators (profile_id, instagram_handle, tiktok_handle)
    VALUES (
      new.id, 
      new.raw_user_meta_data->>'instagram', 
      new.raw_user_meta_data->>'tiktok'
    );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Viewable by anyone, editable only by owner
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Brands: Viewable by anyone, updatable by original owner
CREATE POLICY "Brands are viewable by everyone." ON public.brands FOR SELECT USING (true);
CREATE POLICY "Brands can update their own row." ON public.brands FOR UPDATE USING (profile_id = auth.uid());

-- Creators: Viewable by anyone, updatable by original owner
CREATE POLICY "Creators are viewable by everyone." ON public.creators FOR SELECT USING (true);
CREATE POLICY "Creators can update their own row." ON public.creators FOR UPDATE USING (profile_id = auth.uid());

-- Products
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Brands can insert own products." ON public.products FOR INSERT WITH CHECK (
  brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid())
);
CREATE POLICY "Brands can update own products." ON public.products FOR UPDATE USING (
  brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid())
);
CREATE POLICY "Brands can delete own products." ON public.products FOR DELETE USING (
  brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid())
);

-- Events & Many-to-Many Maps
CREATE POLICY "Events are viewable by everyone." ON public.events FOR SELECT USING (true);
CREATE POLICY "Event products are viewable by everyone." ON public.event_products FOR SELECT USING (true);

-- Event RSVPs
CREATE POLICY "RSVPs are viewable by everyone." ON public.event_rsvps FOR SELECT USING (true);
CREATE POLICY "Creators can RSVP to events." ON public.event_rsvps FOR INSERT WITH CHECK (
  creator_id IN (SELECT id FROM public.creators WHERE profile_id = auth.uid())
);
CREATE POLICY "Creators can edit RSVPs." ON public.event_rsvps FOR UPDATE USING (
  creator_id IN (SELECT id FROM public.creators WHERE profile_id = auth.uid())
);

-- Reviews
CREATE POLICY "Reviews are viewable by everyone." ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Creators can leave reviews." ON public.reviews FOR INSERT WITH CHECK (
  creator_id IN (SELECT id FROM public.creators WHERE profile_id = auth.uid())
);
CREATE POLICY "Creators can update reviews." ON public.reviews FOR UPDATE USING (
  creator_id IN (SELECT id FROM public.creators WHERE profile_id = auth.uid())
);
