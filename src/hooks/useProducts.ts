import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Product } from '../types/database';

export function useBrandProducts(brandId: string | undefined) {
  return useQuery({
    queryKey: ['products', brandId],
    queryFn: async () => {
      if (!brandId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('brand_id', brandId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as any as Product[];
    },
    enabled: !!brandId,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .insert(newProduct as any)
        .select()
        .single();
      
      if (error) throw error;
      return data as any as Product;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products', data.brand_id] });
    },
  });
}

export function useActiveProducts() {
  return useQuery({
    queryKey: ['products', 'active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          brands(company_name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as any[];
    },
  });
}
