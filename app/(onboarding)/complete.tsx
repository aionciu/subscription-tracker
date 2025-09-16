import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { OnboardingLayout } from '../../src/components/OnboardingLayout';
import { useOnboarding } from '../../src/hooks/OnboardingContext';
import { useTheme } from '../../src/hooks/ThemeContext';
import { BillingCycleService } from '../../src/services/billingCycleService';
import { OnboardingService } from '../../src/services/onboardingService';
import { BillingCycle } from '../../src/types/billing-cycle';

export default function CompleteScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { state, completeOnboarding, setCurrentStepByRoute } = useOnboarding();
  
  const [isCompleting, setIsCompleting] = useState(false);
  const [billingCycles, setBillingCycles] = useState<BillingCycle[]>([]);

  useEffect(() => {
    // Set current step when component mounts
    setCurrentStepByRoute('complete');
  }, [setCurrentStepByRoute]);

  useEffect(() => {
    // Fetch billing cycles for calculations
    const fetchBillingCycles = async () => {
      try {
        const billingCyclesData = await BillingCycleService.getAllBillingCycles();
        setBillingCycles(billingCyclesData);
      } catch (error) {
        console.error('Error fetching billing cycles:', error);
        setBillingCycles([]);
      }
    };

    fetchBillingCycles();
  }, []);

  const handleComplete = async () => {
    setIsCompleting(true);
    
    try {
      // Complete the onboarding flow
      await OnboardingService.completeOnboardingFlow(
        state.profileData,
        state.subscriptions
      );
      
      // Mark onboarding as completed in context
      completeOnboarding();
      
      // Redirect to main app
      router.replace('/(protected)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      Alert.alert(
        'Error',
        'Failed to complete setup. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsCompleting(false);
    }
  };

  const calculateMonthlyTotal = () => {
    return state.subscriptions.reduce((total, sub) => {
      if (!sub.amount || !sub.billing_cycle_id) return total;
      
      // Find the billing cycle for this subscription
      const billingCycle = billingCycles.find(bc => bc.id === sub.billing_cycle_id);
      if (!billingCycle) return total;
      
      // Convert to monthly equivalent based on billing cycle type
      let monthlyAmount = sub.amount;
      switch (billingCycle.type) {
        case 'daily':
          monthlyAmount = sub.amount * 30;
          break;
        case 'weekly':
          monthlyAmount = sub.amount * 4.33;
          break;
        case 'monthly':
          monthlyAmount = sub.amount;
          break;
        case 'quarterly':
          monthlyAmount = sub.amount / 3;
          break;
        case 'yearly':
          monthlyAmount = sub.amount / 12;
          break;
        default:
          // Use days for custom cycles
          monthlyAmount = (sub.amount * 30) / billingCycle.days;
          break;
      }
      
      return total + monthlyAmount;
    }, 0);
  };

  const monthlyTotal = calculateMonthlyTotal();
  const yearlyProjection = monthlyTotal * 12;

  return (
    <OnboardingLayout
      showBackButton={false}
      nextButtonText="Go to Dashboard"
      onNext={handleComplete}
      isLoading={isCompleting}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Success Animation */}
        <View className="items-center mb-8">
          <View className={`w-24 h-24 rounded-full items-center justify-center mb-4 ${
            isDark ? 'bg-green-900' : 'bg-green-100'
          }`}>
            <Text className="text-4xl">🎉</Text>
          </View>
          
          <Text className={`text-2xl font-bold text-center mb-2 ${
            isDark ? 'text-dark-50' : 'text-secondary-900'
          }`}>
            You're All Set!
          </Text>
          
          <Text className={`text-base text-center ${
            isDark ? 'text-dark-400' : 'text-secondary-500'
          }`}>
            Your subscription tracker is ready to go
          </Text>
        </View>

        {/* Summary */}
        <View className={`p-6 rounded-xl mb-6 ${
          isDark ? 'bg-dark-800' : 'bg-secondary-50'
        }`}>
          <Text className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-dark-100' : 'text-secondary-800'
          }`}>
            Setup Summary
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className={`text-base ${
                isDark ? 'text-dark-300' : 'text-secondary-600'
              }`}>
                Subscriptions Added
              </Text>
              <Text className={`text-base font-semibold ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                {state.subscriptions.length}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className={`text-base ${
                isDark ? 'text-dark-300' : 'text-secondary-600'
              }`}>
                Monthly Total
              </Text>
              <Text className={`text-base font-semibold ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                {monthlyTotal.toFixed(2)} lei
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className={`text-base ${
                isDark ? 'text-dark-300' : 'text-secondary-600'
              }`}>
                Yearly Projection
              </Text>
              <Text className={`text-base font-semibold ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                {yearlyProjection.toFixed(2)} lei
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className={`text-base ${
                isDark ? 'text-dark-300' : 'text-secondary-600'
              }`}>
                Default Currency
              </Text>
              <Text className={`text-base font-semibold ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                RON (lei)
              </Text>
            </View>
          </View>
        </View>

        {/* What's Next */}
        <View className="mb-6">
          <Text className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-dark-100' : 'text-secondary-800'
          }`}>
            What's Next?
          </Text>
          
          <View className="space-y-4">
            <View className={`flex-row items-start p-4 rounded-xl ${
              isDark ? 'bg-dark-800' : 'bg-white'
            }`}>
              <Text className="text-2xl mr-4">📊</Text>
              <View className="flex-1">
                <Text className={`text-base font-medium mb-1 ${
                  isDark ? 'text-dark-100' : 'text-secondary-800'
                }`}>
                  View Your Dashboard
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-dark-400' : 'text-secondary-500'
                }`}>
                  See your monthly spending and upcoming payments
                </Text>
              </View>
            </View>
            
            <View className={`flex-row items-start p-4 rounded-xl ${
              isDark ? 'bg-dark-800' : 'bg-white'
            }`}>
              <Text className="text-2xl mr-4">➕</Text>
              <View className="flex-1">
                <Text className={`text-base font-medium mb-1 ${
                  isDark ? 'text-dark-100' : 'text-secondary-800'
                }`}>
                  Add More Subscriptions
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-dark-400' : 'text-secondary-500'
                }`}>
                  Add additional subscriptions anytime from the app
                </Text>
              </View>
            </View>
            
            <View className={`flex-row items-start p-4 rounded-xl ${
              isDark ? 'bg-dark-800' : 'bg-white'
            }`}>
              <Text className="text-2xl mr-4">🔔</Text>
              <View className="flex-1">
                <Text className={`text-base font-medium mb-1 ${
                  isDark ? 'text-dark-100' : 'text-secondary-800'
                }`}>
                  Get Reminders
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-dark-400' : 'text-secondary-500'
                }`}>
                  Receive notifications before your subscriptions renew
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View className={`p-4 rounded-xl ${
          isDark ? 'bg-blue-900' : 'bg-blue-50'
        }`}>
          <Text className={`text-sm font-medium mb-2 ${
            isDark ? 'text-blue-200' : 'text-blue-700'
          }`}>
            💡 Pro Tip
          </Text>
          <Text className={`text-sm ${
            isDark ? 'text-blue-300' : 'text-blue-600'
          }`}>
            Review your subscriptions regularly to identify unused services and save money!
          </Text>
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
}
