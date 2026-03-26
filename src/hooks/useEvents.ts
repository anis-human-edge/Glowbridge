import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Event } from '../types/database';

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
}

// Creators fetching events with product linkages
export function useCreatorFeed(creatorId: string | undefined) {
  return useQuery({
    queryKey: ['creator_feed', creatorId],
    queryFn: async () => {
      if (!creatorId) return [];

      // For simplicity in UI prototyping, fetch all upcoming active events
      // and their linked products. 
      // Realistic architecture would join event_products and rsvps.
      const { data: events, error } = await supabase
        .from('events')
        .select('*, event_products(products(*))')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return events;
    },
    enabled: !!creatorId,
  });
}
