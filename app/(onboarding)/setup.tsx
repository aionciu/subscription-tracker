import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OnboardingLayout } from '../../src/components/OnboardingLayout';
import { useOnboarding } from '../../src/hooks/OnboardingContext';
import { useTheme } from '../../src/hooks/ThemeContext';
import { BillingCycleService } from '../../src/services/billingCycleService';
import { BillingCycle } from '../../src/types/billing-cycle';
import { Subscription } from '../../src/types/subscription';

export default function QuickSetupScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { state, updateSubscriptions, setCurrentStepByRoute, previousStep } = useOnboarding();
  
  const [subscriptions, setSubscriptions] = useState<Partial<Subscription>[]>([]);
  const [billingCycles, setBillingCycles] = useState<BillingCycle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set current step when component mounts
    setCurrentStepByRoute('setup');
  }, [setCurrentStepByRoute]);

  useEffect(() => {
    // Fetch billing cycles from database
    const fetchBillingCycles = async () => {
      try {
        setLoading(true);
        const billingCyclesData = await BillingCycleService.getAllBillingCycles();
        setBillingCycles(billingCyclesData);
        
        // Set default billing cycle (monthly) for existing subscriptions
        const monthlyCycle = billingCyclesData.find(bc => bc.type === 'monthly');
        if (monthlyCycle) {
          setSubscriptions(prev => prev.map(sub => ({
            ...sub,
            billing_cycle_id: sub.billing_cycle_id || monthlyCycle.id,
          })));
        }
      } catch (error) {
        console.error('Error fetching billing cycles:', error);
        // Fallback to empty array if fetch fails
        setBillingCycles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingCycles();
  }, []);

  useEffect(() => {
    // Initialize subscriptions for selected providers
    const initialSubscriptions = state.selectedProviders.map(provider => ({
      provider_id: provider.id,
      custom_provider_name: provider.name,
      name: provider.name,
      description: provider.description,
      amount: 0,
      currency_id: state.profileData.currency_id,
      billing_cycle_id: '', // Will be set when billing cycles are loaded
      status: 'active' as const,
      start_date: new Date().toISOString().split('T')[0],
      next_billing_date: getNextBillingDate(),
      auto_renew: true,
    }));
    setSubscriptions(initialSubscriptions);
  }, [state.selectedProviders, state.profileData.currency_id]);

  useEffect(() => {
    // Update onboarding state when subscriptions change
    updateSubscriptions(subscriptions);
  }, [subscriptions, updateSubscriptions]);

  const getNextBillingDate = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextMonth.toISOString().split('T')[0];
  };

  const handleNext = async () => {
    // Validate that all subscriptions have amounts
    const invalidSubscriptions = subscriptions.filter(sub => !sub.amount || sub.amount <= 0);
    
    if (invalidSubscriptions.length > 0) {
      Alert.alert(
        'Missing Information',
        'Please enter the monthly cost for all selected providers.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);
    
    try {
      // Here you would typically save the subscriptions to the database
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/(onboarding)/complete');
    } catch {
      Alert.alert(
        'Error',
        'Failed to save subscriptions. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    previousStep();
    router.back();
  };

  const updateSubscriptionAmount = (index: number, amount: string) => {
    const numericAmount = parseFloat(amount) || 0;
    setSubscriptions(prev => 
      prev.map((sub, i) => 
        i === index ? { ...sub, amount: numericAmount } : sub
      )
    );
  };

  const updateSubscriptionBillingCycle = (index: number, cycleId: string) => {
    setSubscriptions(prev => 
      prev.map((sub, i) => 
        i === index ? { ...sub, billing_cycle_id: cycleId } : sub
      )
    );
  };

  const removeSubscription = (index: number) => {
    Alert.alert(
      'Remove Subscription',
      'Are you sure you want to remove this subscription?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setSubscriptions(prev => prev.filter((_, i) => i !== index));
          }
        }
      ]
    );
  };


  const getCurrencySymbol = () => {
    // In real implementation, this would come from the selected currency
    return 'lei'; // Default to RON
  };

  return (
    <OnboardingLayout
      nextButtonText="Complete Setup"
      onNext={handleNext}
      onBack={handleBack}
      isLoading={isLoading}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className={`text-base mb-6 ${
          isDark ? 'text-dark-400' : 'text-secondary-500'
        }`}>
          Enter the monthly cost for each subscription. You can always edit these later.
        </Text>

        {subscriptions.map((subscription, index) => (
          <View key={index} className={`p-4 rounded-xl mb-4 ${
            isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-secondary-200'
          } border`}>
            {/* Provider Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View className={`w-10 h-10 rounded-lg items-center justify-center mr-3 ${
                  isDark ? 'bg-dark-700' : 'bg-secondary-100'
                }`}>
                  <Text className="text-lg font-semibold">
                    {subscription.name?.charAt(0) || '?'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className={`text-base font-medium ${
                    isDark ? 'text-dark-100' : 'text-secondary-800'
                  }`}>
                    {subscription.name}
                  </Text>
                  <Text className={`text-sm ${
                    isDark ? 'text-dark-400' : 'text-secondary-500'
                  }`}>
                    {subscription.description}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removeSubscription(index)}
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  isDark ? 'bg-dark-700' : 'bg-secondary-100'
                }`}
              >
                <Text className="text-red-500 text-lg">×</Text>
              </TouchableOpacity>
            </View>

            {/* Amount Input */}
            <View className="mb-4">
              <Text className={`text-sm font-medium mb-2 ${
                isDark ? 'text-dark-300' : 'text-secondary-600'
              }`}>
                Monthly Cost
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  value={subscription.amount?.toString() || ''}
                  onChangeText={(text) => updateSubscriptionAmount(index, text)}
                  placeholder="0.00"
                  placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                  keyboardType="numeric"
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-dark-700 border-dark-600 text-dark-100' 
                      : 'bg-white border-secondary-200 text-secondary-800'
                  }`}
                />
                <Text className={`ml-3 text-base font-medium ${
                  isDark ? 'text-dark-300' : 'text-secondary-600'
                }`}>
                  {getCurrencySymbol()}
                </Text>
              </View>
            </View>

            {/* Billing Cycle Selection */}
            <View>
              <Text className={`text-sm font-medium mb-2 ${
                isDark ? 'text-dark-300' : 'text-secondary-600'
              }`}>
                Billing Cycle
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row space-x-2">
                  {loading && (
                    <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                      Loading billing cycles...
                    </Text>
                  )}
                  
                  {!loading && billingCycles.length === 0 && (
                    <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                      No billing cycles available
                    </Text>
                  )}
                  
                  {!loading && billingCycles.length > 0 && (
                    <>
                      {billingCycles.map((cycle) => (
                        <TouchableOpacity
                          key={cycle.id}
                          onPress={() => updateSubscriptionBillingCycle(index, cycle.id)}
                          className={`px-4 py-2 rounded-lg ${
                            subscription.billing_cycle_id === cycle.id
                              ? 'bg-primary-500'
                              : isDark 
                                ? 'bg-dark-700' 
                                : 'bg-secondary-200'
                          }`}
                        >
                          <Text className={`text-sm font-medium ${
                            subscription.billing_cycle_id === cycle.id
                              ? 'text-white'
                              : isDark 
                                ? 'text-dark-300' 
                                : 'text-secondary-600'
                          }`}>
                            {cycle.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        ))}

        {subscriptions.length === 0 && (
          <View className={`p-8 rounded-xl items-center ${
            isDark ? 'bg-dark-800' : 'bg-secondary-50'
          }`}>
            <Text className="text-4xl mb-4">📝</Text>
            <Text className={`text-base font-medium mb-2 ${
              isDark ? 'text-dark-300' : 'text-secondary-600'
            }`}>
              No subscriptions to set up
            </Text>
            <Text className={`text-sm text-center ${
              isDark ? 'text-dark-400' : 'text-secondary-500'
            }`}>
              You can add subscriptions later from the main app
            </Text>
          </View>
        )}
      </ScrollView>
    </OnboardingLayout>
  );
}
