import { BillingCycleType } from '../types/billing-cycle';
import { Currency } from '../types/currency';
import { SubscriptionWithDetails } from '../types/subscription';
import { formatCurrency } from './currencyUtils';

/**
 * Convert subscription amount to monthly equivalent based on billing cycle
 */
export function convertToMonthlyAmount(amount: number, billingCycleType: BillingCycleType): number {
  switch (billingCycleType) {
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

/**
 * Calculate total monthly spending from active subscriptions
 */
export function calculateMonthlyTotal(subscriptions: SubscriptionWithDetails[]): {
  total: number;
  currency: Currency | null;
  breakdown: Array<{
    subscription: SubscriptionWithDetails;
    monthlyAmount: number;
  }>;
} {
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  
  if (activeSubscriptions.length === 0) {
    return { total: 0, currency: null, breakdown: [] };
  }

  // Group by currency and calculate totals
  const currencyGroups = new Map<string, { currency: Currency; total: number; breakdown: any[] }>();
  
  activeSubscriptions.forEach(subscription => {
    const monthlyAmount = convertToMonthlyAmount(subscription.amount, subscription.billing_cycle.type);
    const currencyCode = subscription.currency.code;
    
    if (!currencyGroups.has(currencyCode)) {
      currencyGroups.set(currencyCode, {
        currency: subscription.currency,
        total: 0,
        breakdown: []
      });
    }
    
    const group = currencyGroups.get(currencyCode)!;
    group.total += monthlyAmount;
    group.breakdown.push({
      subscription,
      monthlyAmount
    });
  });

  // For now, return the primary currency group (RON) or the first one
  const primaryGroup = currencyGroups.get('RON') || Array.from(currencyGroups.values())[0];
  
  return {
    total: primaryGroup?.total || 0,
    currency: primaryGroup?.currency || null,
    breakdown: primaryGroup?.breakdown || []
  };
}

/**
 * Calculate yearly projection from monthly total
 */
export function calculateYearlyProjection(monthlyTotal: number): number {
  return monthlyTotal * 12;
}

/**
 * Get the next payment (closest renewal date)
 */
export function getNextPayment(subscriptions: SubscriptionWithDetails[]): {
  subscription: SubscriptionWithDetails;
  daysUntilPayment: number;
  formattedDate: string;
} | null {
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  
  if (activeSubscriptions.length === 0) {
    return null;
  }

  // Sort by next_billing_date to get the closest one
  const sortedSubscriptions = activeSubscriptions.sort((a, b) => 
    new Date(a.next_billing_date).getTime() - new Date(b.next_billing_date).getTime()
  );

  const nextSubscription = sortedSubscriptions[0];
  const renewalDate = new Date(nextSubscription.next_billing_date);
  const today = new Date();
  const daysUntilPayment = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    subscription: nextSubscription,
    daysUntilPayment,
    formattedDate: renewalDate.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  };
}

/**
 * Get upcoming renewals (next 30 days)
 */
export function getUpcomingRenewals(subscriptions: SubscriptionWithDetails[]): Array<{
  subscription: SubscriptionWithDetails;
  daysUntilPayment: number;
  formattedDate: string;
}> {
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  return activeSubscriptions
    .filter(sub => {
      const renewalDate = new Date(sub.next_billing_date);
      return renewalDate <= thirtyDaysFromNow;
    })
    .map(sub => {
      const renewalDate = new Date(sub.next_billing_date);
      const today = new Date();
      const daysUntilPayment = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      return {
        subscription: sub,
        daysUntilPayment,
        formattedDate: renewalDate.toLocaleDateString('ro-RO', {
          day: 'numeric',
          month: 'long'
        })
      };
    })
    .sort((a, b) => a.daysUntilPayment - b.daysUntilPayment);
}

/**
 * Generate savings insights based on yearly projection
 */
export function generateSavingsInsights(yearlyProjection: number, currency: Currency): string[] {
  const insights: string[] = [];
  
  if (yearlyProjection > 0) {
    // Calculate potential savings percentages
    const savings10Percent = yearlyProjection * 0.1;
    const savings20Percent = yearlyProjection * 0.2;
    
    insights.push(`You could save ${formatCurrency(savings10Percent, currency)} yearly by cutting 10%`);
    insights.push(`That's ${formatCurrency(savings20Percent, currency)} if you optimize 20% of subscriptions`);
    
    // Add contextual insights based on amount
    if (yearlyProjection > 1200) {
      insights.push('💡 Consider reviewing subscriptions quarterly to optimize spending');
    } else if (yearlyProjection > 600) {
      insights.push('💡 You\'re spending moderately on subscriptions');
    } else {
      insights.push('💡 Great job keeping subscription costs low!');
    }
  }
  
  return insights;
}
