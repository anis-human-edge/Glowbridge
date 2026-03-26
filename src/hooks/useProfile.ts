import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Profile, Brand, Creator } from '../types/database';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('Not authenticated');

      const { data: rawProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      const profile = rawProfile as any as Profile;

      let brandData = null;
      let creatorData = null;

      if (profile.role === 'brand') {
        const { data } = await supabase.from('brands').select('*').eq('profile_id', profile.id).single();
        brandData = data as any as Brand;
      } else if (profile.role === 'creator') {
        const { data } = await supabase.from('creators').select('*').eq('profile_id', profile.id).single();
        creatorData = data as any as Creator;
      }

      return {
        user,
        profile,
        brand: brandData,
        creator: creatorData,
      };
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Brand> & { profile_id: string }) => {
      const { data, error } = await supabase
        .from('brands')
        .update(updates as any)
        .eq('profile_id', updates.profile_id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
