import { useCallback, useMemo } from 'react';
import {
    calculateMonthlyTotal,
    calculateYearlyProjection,
    generateSavingsInsights,
    getNextPayment,
    getUpcomingRenewals
} from '../utils/dashboardUtils';
import { useSubscriptions } from './useSubscriptions';

export const useDashboard = () => {
  const { subscriptions, loading, error, refreshSubscriptions } = useSubscriptions();

  // Calculate dashboard metrics
  const monthlyData = useMemo(() => {
    return calculateMonthlyTotal(subscriptions);
  }, [subscriptions]);

  const yearlyProjection = useMemo(() => {
    return calculateYearlyProjection(monthlyData.total);
  }, [monthlyData.total]);

  const nextPayment = useMemo(() => {
    return getNextPayment(subscriptions);
  }, [subscriptions]);

  const upcomingRenewals = useMemo(() => {
    return getUpcomingRenewals(subscriptions);
  }, [subscriptions]);

  const savingsInsights = useMemo(() => {
    if (monthlyData.currency) {
      return generateSavingsInsights(yearlyProjection, monthlyData.currency);
    }
    return [];
  }, [yearlyProjection, monthlyData.currency]);

  // Get active subscriptions count
  const activeSubscriptionsCount = useMemo(() => {
    return subscriptions.filter(sub => sub.status === 'active').length;
  }, [subscriptions]);

  // Refresh dashboard data
  const refreshDashboard = useCallback(async () => {
    await refreshSubscriptions();
  }, [refreshSubscriptions]);

  return {
    // Data
    subscriptions,
    activeSubscriptionsCount,
    monthlyData,
    yearlyProjection,
    nextPayment,
    upcomingRenewals,
    savingsInsights,
    
    // State
    loading,
    error,
    
    // Actions
    refreshDashboard,
  };
};
