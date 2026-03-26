import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Brand, Creator } from '../types/database';

export function usePendingBrands() {
  return useQuery({
    queryKey: ['admin', 'brands', 'pending'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      return data as any as Brand[];
    },
  });
}

export function usePendingCreators() {
  return useQuery({
    queryKey: ['admin', 'creators', 'pending'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      return data as any as Creator[];
    },
  });
}

export function useApprovedBrands() {
  return useQuery({
    queryKey: ['admin', 'brands', 'approved'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as any as Brand[];
    },
  });
}

export function useApprovedCreators() {
  return useQuery({
    queryKey: ['admin', 'creators', 'approved'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as any as Creator[];
    },
  });
}

export function useUpdateBrandStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { data, error } = await supabase
        .from('brands')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data as any as Brand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
    },
  });
}

export function useUpdateCreatorStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { data, error } = await supabase
        .from('creators')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data as any as Creator;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'creators'] });
    },
  });
}
