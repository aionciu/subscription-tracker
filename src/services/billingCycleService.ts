import { supabase } from '../../lib/supabase';
import { BillingCycle } from '../types';

export class BillingCycleService {
  // Get all billing cycles
  static async getAllBillingCycles(): Promise<BillingCycle[]> {
    const { data, error } = await supabase
      .from('billing_cycles')
      .select('*')
      .eq('is_active', true)
      .order('days');

    if (error) throw error;
    return data;
  }

  // Get billing cycle by ID
  static async getBillingCycleById(id: string): Promise<BillingCycle | null> {
    const { data, error } = await supabase
      .from('billing_cycles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return data;
  }

  // Get billing cycle by type
  static async getBillingCycleByType(type: string): Promise<BillingCycle | null> {
    const { data, error } = await supabase
      .from('billing_cycles')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return data;
  }

  // Get default billing cycle (monthly)
  static async getDefaultBillingCycle(): Promise<BillingCycle | null> {
    return this.getBillingCycleByType('monthly');
  }
}
