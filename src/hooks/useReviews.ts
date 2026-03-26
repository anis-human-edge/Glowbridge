import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Review } from '../types/database';

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReview: Partial<Review>) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(newReview as any)
        .select()
        .single();
      
      if (error) throw error;
      return data as any as Review;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
