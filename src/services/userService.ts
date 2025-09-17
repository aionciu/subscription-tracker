import { supabase } from '../../lib/supabase';
import { User, UserWithCurrency } from '../types';

export class UserService {
  // Get current user profile
  static async getCurrentUserProfile(): Promise<UserWithCurrency | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        currency:currencies(*)
      `)
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }

  // Update user profile
  static async updateProfile(updates: any): Promise<User> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Create or update user profile (called automatically on signup)
  static async createProfile(userData: any): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .upsert(userData, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get user's notification preferences
  static async getNotificationPreferences() {
    const profile = await this.getCurrentUserProfile();
    return profile?.notification_preferences;
  }

  // Update notification preferences
  static async updateNotificationPreferences(preferences: any) {
    return this.updateProfile({ notification_preferences: preferences });
  }

  // Set user's default currency
  static async setDefaultCurrency(currencyId: string) {
    return this.updateProfile({ currency_id: currencyId });
  }
}
