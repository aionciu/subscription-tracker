import { supabase } from '../../lib/supabase';
import { ProviderWithCategory } from '../types';

export class ProviderService {
  // Get all providers
  static async getAllProviders(): Promise<ProviderWithCategory[]> {
    const { data, error } = await supabase
      .from('subscription_providers')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data;
  }

  // Get popular providers for onboarding
  static async getPopularProviders(): Promise<ProviderWithCategory[]> {
    const { data, error } = await supabase.rpc('get_popular_providers');

    if (error) throw error;
    return data;
  }

  // Get providers by category
  static async getProvidersByCategory(categoryId: string): Promise<ProviderWithCategory[]> {
    const { data, error } = await supabase
      .from('subscription_providers')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data;
  }

  // Search providers by name
  static async searchProviders(query: string): Promise<ProviderWithCategory[]> {
    const { data, error } = await supabase
      .from('subscription_providers')
      .select(`
        *,
        category:categories(*)
      `)
      .ilike('name', `%${query}%`)
      .eq('is_active', true)
      .order('name')
      .limit(20);

    if (error) throw error;
    return data;
  }

  // Get provider by ID
  static async getProviderById(id: string): Promise<ProviderWithCategory | null> {
    const { data, error } = await supabase
      .from('subscription_providers')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return data;
  }
}
