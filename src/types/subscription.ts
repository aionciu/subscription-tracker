// Subscription types and interfaces
import { BillingCycle } from './billing-cycle';
import { Category } from './category';
import { Currency } from './currency';
import { Provider } from './provider';

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';

export interface Subscription {
  id: string;
  user_id: string;
  provider_id: string | null;
  custom_provider_name: string | null;
  name: string;
  description: string | null;
  amount: number;
  currency_id: string;
  billing_cycle_id: string;
  status: SubscriptionStatus;
  start_date: string;
  next_billing_date: string;
  end_date: string | null;
  auto_renew: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionWithDetails extends Subscription {
  provider: Provider | null;
  category: Category | null;
  currency: Currency;
  billing_cycle: BillingCycle;
}

export interface SubscriptionInsert {
  user_id: string;
  provider_id?: string | null;
  custom_provider_name?: string | null;
  name: string;
  description?: string | null;
  amount: number;
  currency_id: string;
  billing_cycle_id: string;
  status?: SubscriptionStatus;
  start_date: string;
  next_billing_date: string;
  end_date?: string | null;
  auto_renew?: boolean;
  notes?: string | null;
}

export interface SubscriptionUpdate {
  provider_id?: string | null;
  custom_provider_name?: string | null;
  name?: string;
  description?: string | null;
  amount?: number;
  currency_id?: string;
  billing_cycle_id?: string;
  status?: SubscriptionStatus;
  start_date?: string;
  next_billing_date?: string;
  end_date?: string | null;
  auto_renew?: boolean;
  notes?: string | null;
}

// Subscription status constants
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

// Helper functions for subscription calculations
export function calculateMonthlyAmount(subscription: Subscription, billingCycle: BillingCycle): number {
  const { amount } = subscription;
  const { type } = billingCycle;
  
  switch (type) {
    case 'daily':
      return amount * 30;
    case 'weekly':
      return amount * 4.33;
    case 'monthly':
      return amount;
    case 'quarterly':
      return amount / 3;
    case 'yearly':
      return amount / 12;
    default:
      return amount;
  }
}

export function calculateYearlyProjection(monthlyAmount: number): number {
  return monthlyAmount * 12;
}

