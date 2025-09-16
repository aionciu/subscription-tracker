import { supabase } from '../../lib/supabase';
import { Subscription } from '../types/subscription';
import { User } from '../types/user';

export class OnboardingService {
  // Create user profile after authentication
  static async createUserProfile(userData: Partial<User>): Promise<User> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const profileData = {
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
      avatar_url: user.user_metadata?.avatar_url || null,
      currency_id: userData.currency_id,
      timezone: userData.timezone || 'Europe/Bucharest',
      notification_preferences: userData.notification_preferences || {
        push: true,
        email: true,
        days_before: 3,
      },
      onboarding_completed: false,
    };

    const { data, error } = await supabase
      .from('users')
      .insert(profileData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Create subscriptions for selected providers
  static async createSubscriptions(subscriptions: Partial<Subscription>[]): Promise<Subscription[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const subscriptionsWithUserId = subscriptions.map(sub => ({
      ...sub,
      user_id: user.id,
    }));

    const { data, error } = await supabase
      .from('subscriptions')
      .insert(subscriptionsWithUserId)
      .select();

    if (error) throw error;
    return data;
  }

  // Mark onboarding as completed
  static async completeOnboarding(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('users')
      .update({ onboarding_completed: true })
      .eq('id', user.id);

    if (error) throw error;
  }

  // Complete the entire onboarding process
  static async completeOnboardingFlow(
    profileData: Partial<User>,
    subscriptions: Partial<Subscription>[]
  ): Promise<void> {
    try {
      // 1. Create user profile
      await this.createUserProfile(profileData);

      // 2. Create subscriptions if any
      if (subscriptions.length > 0) {
        await this.createSubscriptions(subscriptions);
      }

      // 3. Mark onboarding as completed
      await this.completeOnboarding();
    } catch (error) {
      console.error('Error completing onboarding flow:', error);
      throw error;
    }
  }

  // Check if user has completed onboarding
  static async hasCompletedOnboarding(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single();

      if (error) return false;
      return data?.onboarding_completed || false;
    } catch (error) {
      return false;
    }
  }
}
