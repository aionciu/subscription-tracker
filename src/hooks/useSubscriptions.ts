import { useCallback, useEffect, useState } from 'react';
import { SubscriptionService } from '../services/subscriptionService';
import { SubscriptionWithDetails } from '../types';

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscriptions = useCallback(async () => {
    try {
      setError(null);
      const data = await SubscriptionService.getUserSubscriptions();
      setSubscriptions(data);
    } catch (err) {
      console.error('Error loading subscriptions:', err);
      setError('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSubscriptions = useCallback(async () => {
    setLoading(true);
    await loadSubscriptions();
  }, [loadSubscriptions]);

  const addSubscription = useCallback(async (subscriptionData: any) => {
    try {
      const newSubscription = await SubscriptionService.createSubscription(subscriptionData);
      setSubscriptions(prev => [...prev, newSubscription]);
      return newSubscription;
    } catch (err) {
      console.error('Error adding subscription:', err);
      throw err;
    }
  }, []);

  const updateSubscription = useCallback(async (id: string, updates: any) => {
    try {
      const updatedSubscription = await SubscriptionService.updateSubscription(id, updates);
      setSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, ...updatedSubscription } : sub)
      );
      return updatedSubscription;
    } catch (err) {
      console.error('Error updating subscription:', err);
      throw err;
    }
  }, []);

  const deleteSubscription = useCallback(async (id: string) => {
    try {
      await SubscriptionService.deleteSubscription(id);
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Error deleting subscription:', err);
      throw err;
    }
  }, []);

  const getActiveSubscriptions = useCallback(() => {
    return subscriptions.filter(sub => sub.status === 'active');
  }, [subscriptions]);

  const getUpcomingRenewals = useCallback(() => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return subscriptions.filter(sub => {
      if (sub.status !== 'active') return false;
      
      const renewalDate = new Date(sub.next_billing_date);
      return renewalDate <= thirtyDaysFromNow;
    });
  }, [subscriptions]);

  const calculateMonthlyTotal = useCallback(() => {
    const activeSubscriptions = getActiveSubscriptions();
    
    return activeSubscriptions.reduce((total, sub) => {
      // Convert to monthly amount based on billing cycle
      const monthlyAmount = sub.amount;
      // This is simplified - in a real app, you'd convert based on billing cycle
      return total + monthlyAmount;
    }, 0);
  }, [getActiveSubscriptions]);

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions]);

  return {
    subscriptions,
    loading,
    error,
    loadSubscriptions,
    refreshSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getActiveSubscriptions,
    getUpcomingRenewals,
    calculateMonthlyTotal,
  };
};
