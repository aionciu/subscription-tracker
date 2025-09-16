// Billing cycle types and interfaces
export type BillingCycleType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface BillingCycle {
  id: string;
  name: string;
  type: BillingCycleType;
  days: number;
  is_active: boolean;
  created_at: string;
}

export interface BillingCycleInsert {
  name: string;
  type: BillingCycleType;
  days: number;
  is_active?: boolean;
}

export interface BillingCycleUpdate {
  name?: string;
  type?: BillingCycleType;
  days?: number;
  is_active?: boolean;
}

// Predefined billing cycle types
export const BILLING_CYCLE_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;

// Helper function to convert billing cycle to monthly equivalent
export function convertToMonthlyAmount(amount: number, billingCycle: BillingCycleType): number {
  switch (billingCycle) {
    case 'daily':
      return amount * 30;
    case 'weekly':
      return amount * 4.33; // 52 weeks / 12 months
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
