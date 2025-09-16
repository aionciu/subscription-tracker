import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { OnboardingLayout } from '../../src/components/OnboardingLayout';
import { useOnboarding } from '../../src/hooks/OnboardingContext';
import { useTheme } from '../../src/hooks/ThemeContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { setCurrentStepByRoute } = useOnboarding();

  useEffect(() => {
    // Set current step when component mounts
    setCurrentStepByRoute('index');
  }, [setCurrentStepByRoute]);

  const handleNext = () => {
    router.push('/(onboarding)/profile');
  };

  return (
    <OnboardingLayout
      showBackButton={false}
      nextButtonText="Get Started"
      onNext={handleNext}
    >
      <View className="flex-1 justify-center items-center">
        {/* Welcome Icon */}
        <View className={`w-24 h-24 rounded-full items-center justify-center mb-8 ${
          isDark ? 'bg-dark-800' : 'bg-primary-100'
        }`}>
          <Text className="text-4xl">🎉</Text>
        </View>

        {/* Welcome Text */}
        <Text className={`text-3xl font-bold text-center mb-4 ${
          isDark ? 'text-dark-50' : 'text-secondary-900'
        }`}>
          Welcome to Subscription Tracker!
        </Text>
        
        <Text className={`text-lg text-center leading-6 mb-8 ${
          isDark ? 'text-dark-400' : 'text-secondary-500'
        }`}>
          Let's help you track and manage your subscriptions in one place. 
          We'll set up your profile and get you started in just a few steps.
        </Text>

        {/* Features List */}
        <View className="w-full mb-8">
          <View className={`flex-row items-center mb-4 ${
            isDark ? 'bg-dark-800' : 'bg-secondary-50'
          } p-4 rounded-xl`}>
            <Text className="text-2xl mr-4">📊</Text>
            <View className="flex-1">
              <Text className={`text-base font-semibold mb-1 ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                Track Your Spending
              </Text>
              <Text className={`text-sm ${
                isDark ? 'text-dark-400' : 'text-secondary-500'
              }`}>
                See your monthly and yearly subscription costs at a glance
              </Text>
            </View>
          </View>

          <View className={`flex-row items-center mb-4 ${
            isDark ? 'bg-dark-800' : 'bg-secondary-50'
          } p-4 rounded-xl`}>
            <Text className="text-2xl mr-4">🔔</Text>
            <View className="flex-1">
              <Text className={`text-base font-semibold mb-1 ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                Never Miss a Payment
              </Text>
              <Text className={`text-sm ${
                isDark ? 'text-dark-400' : 'text-secondary-500'
              }`}>
                Get reminders before your subscriptions renew
              </Text>
            </View>
          </View>

          <View className={`flex-row items-center ${
            isDark ? 'bg-dark-800' : 'bg-secondary-50'
          } p-4 rounded-xl`}>
            <Text className="text-2xl mr-4">💰</Text>
            <View className="flex-1">
              <Text className={`text-base font-semibold mb-1 ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                Save Money
              </Text>
              <Text className={`text-sm ${
                isDark ? 'text-dark-400' : 'text-secondary-500'
              }`}>
                Identify unused subscriptions and optimize your spending
              </Text>
            </View>
          </View>
        </View>
      </View>
    </OnboardingLayout>
  );
}
