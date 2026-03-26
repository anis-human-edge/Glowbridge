export type UserRole = 'brand' | 'creator' | 'admin';
export type ApplicationStatus = 'applied' | 'under_review' | 'approved' | 'rejected';
export type CreatorTier = 'nano' | 'micro' | 'host';
export type EventType = 'digital' | 'physical';
export type EventStatus = 'upcoming' | 'live' | 'completed';
export type RsvpStatus = 'attending' | 'waitlisted' | 'attended' | 'no_show';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type BrandTier = 'growth' | 'protocol';

export interface Brand {
  id: string;
  profile_id: string;
  company_name: string;
  website: string | null;
  hq_location: string | null;
  status: ApplicationStatus;
  tier?: BrandTier;
  created_at: string;
}

export interface Creator {
  id: string;
  profile_id: string;
  instagram_handle: string | null;
  tiktok_handle: string | null;
  follower_count: number;
  tier: CreatorTier;
  status: ApplicationStatus;
  created_at: string;
}

export interface Product {
  id: string;
  brand_id: string;
  name: string;
  category: string;
  ingredients: string | null;
  hero_image: string | null;
  status: 'draft' | 'active';
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  type: EventType;
  date: string;
  max_capacity: number;
  status: EventStatus;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  creator_id: string;
  rating: number;
  content: string | null;
  social_url: string | null;
  created_at: string;
}

// Supabase generated types helper
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      brands: { Row: Brand; Insert: Partial<Brand>; Update: Partial<Brand> };
      creators: { Row: Creator; Insert: Partial<Creator>; Update: Partial<Creator> };
      products: { Row: Product; Insert: Partial<Product>; Update: Partial<Product> };
      events: { Row: Event; Insert: Partial<Event>; Update: Partial<Event> };
      event_products: { Row: { event_id: string; product_id: string } };
      event_rsvps: { Row: { id: string; event_id: string; creator_id: string; status: RsvpStatus; created_at: string } };
      reviews: { Row: Review; Insert: Partial<Review>; Update: Partial<Review> };
    }
  }
}
