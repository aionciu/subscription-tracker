import { supabase } from '../../lib/supabase';
import {
    Subscription,
    SubscriptionInsert,
    SubscriptionUpdate,
    SubscriptionWithDetails
} from '../types';

export class SubscriptionService {
  // Get all subscriptions for current user
  static async getUserSubscriptions(): Promise<SubscriptionWithDetails[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        provider:subscription_providers(*),
        currency:currencies(*),
        billing_cycle:billing_cycles(*),
        category:subscription_providers!inner(category:categories(*))
      `)
      .eq('user_id', user.id)
      .order('next_billing_date', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get active subscriptions only
  static async getActiveSubscriptions(): Promise<SubscriptionWithDetails[]> {
    const subscriptions = await this.getUserSubscriptions();
    return subscriptions.filter(sub => sub.status === 'active');
  }

  // Create new subscription
  static async createSubscription(subscription: SubscriptionInsert): Promise<Subscription> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({ ...subscription, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update subscription
  static async updateSubscription(id: string, updates: SubscriptionUpdate): Promise<Subscription> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete subscription
  static async deleteSubscription(id: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  }

  // Get subscription by ID
  static async getSubscriptionById(id: string): Promise<SubscriptionWithDetails | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        provider:subscription_providers(*),
        currency:currencies(*),
        billing_cycle:billing_cycles(*),
        category:subscription_providers!inner(category:categories(*))
      `)
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return data;
  }

  // Get upcoming renewals (next 30 days)
  static async getUpcomingRenewals(): Promise<SubscriptionWithDetails[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const { data, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        provider:subscription_providers(*),
        currency:currencies(*),
        billing_cycle:billing_cycles(*),
        category:subscription_providers!inner(category:categories(*))
      `)
      .eq('user_id', user.id)
      .eq('status', 'active')
      .lte('next_billing_date', thirtyDaysFromNow.toISOString().split('T')[0])
      .order('next_billing_date', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Calculate user totals
  static async calculateUserTotals() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase.rpc('calculate_user_totals', {
      user_uuid: user.id
    });

    if (error) throw error;
    return data[0];
  }
}
