import { supabase } from '../../lib/supabase';
import { Currency } from '../types';

export class CurrencyService {
  // Get all currencies
  static async getAllCurrencies(): Promise<Currency[]> {
    const { data, error } = await supabase
      .from('currencies')
      .select('*')
      .eq('is_active', true)
      .order('code');

    if (error) throw error;
    return data;
  }

  // Get currency by code
  static async getCurrencyByCode(code: string): Promise<Currency | null> {
    const { data, error } = await supabase
      .from('currencies')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return data;
  }

  // Get currency by ID
  static async getCurrencyById(id: string): Promise<Currency | null> {
    const { data, error } = await supabase
      .from('currencies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return data;
  }

  // Get default currency (RON for Romanian market)
  static async getDefaultCurrency(): Promise<Currency | null> {
    return this.getCurrencyByCode('RON');
  }
}
