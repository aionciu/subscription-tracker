import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingLayout } from '../../src/components/OnboardingLayout';
import { useOnboarding } from '../../src/hooks/OnboardingContext';
import { useTheme } from '../../src/hooks/ThemeContext';
import { CurrencyService } from '../../src/services/currencyService';
import { Currency } from '../../src/types/currency';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { state, updateProfileData, setCurrentStepByRoute, previousStep } = useOnboarding();
  
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [notificationPreferences, setNotificationPreferences] = useState({
    push: true,
    email: true,
    days_before: 3,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set current step when component mounts
    setCurrentStepByRoute('profile');
  }, [setCurrentStepByRoute]);

  useEffect(() => {
    // Fetch currencies from database
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const currenciesData = await CurrencyService.getAllCurrencies();
        setCurrencies(currenciesData);
        
        // Set default currency (RON)
        const defaultCurrency = currenciesData.find(c => c.code === 'RON') || currenciesData[0];
        if (defaultCurrency) {
          setSelectedCurrency(defaultCurrency);
        }
      } catch (error) {
        console.error('Error fetching currencies:', error);
        // Fallback to empty array if fetch fails
        setCurrencies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    // Update profile data when selections change
    updateProfileData({
      currency_id: selectedCurrency?.id,
      notification_preferences: notificationPreferences,
      timezone: 'Europe/Bucharest', // Default for Romanian users
    });
  }, [selectedCurrency, notificationPreferences, updateProfileData]);

  const handleNext = () => {
    router.push('/(onboarding)/providers');
  };

  const handleBack = () => {
    previousStep();
    router.back();
  };

  const toggleNotification = (type: 'push' | 'email') => {
    setNotificationPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const updateDaysBefore = (days: number) => {
    setNotificationPreferences(prev => ({
      ...prev,
      days_before: days,
    }));
  };

  return (
    <OnboardingLayout
      nextButtonText="Continue"
      onNext={handleNext}
      onBack={handleBack}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Currency Selection */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-dark-100' : 'text-secondary-800'
          }`}>
            Default Currency
          </Text>
          <Text className={`text-sm mb-4 ${
            isDark ? 'text-dark-400' : 'text-secondary-500'
          }`}>
            Choose your preferred currency for tracking subscriptions
          </Text>
          
          <View className="space-y-2">
            {loading && (
              <Text className={`text-center py-8 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                Loading currencies...
              </Text>
            )}
            
            {!loading && currencies.length === 0 && (
              <Text className={`text-center py-8 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                No currencies available
              </Text>
            )}
            
            {!loading && currencies.length > 0 && (
              <>
                {currencies.map((currency) => (
                  <TouchableOpacity
                    key={currency.id}
                    onPress={() => setSelectedCurrency(currency)}
                    className={`flex-row items-center justify-between p-4 rounded-xl border-2 ${
                      selectedCurrency?.id === currency.id
                        ? 'border-primary-500 bg-primary-50'
                        : isDark 
                          ? 'border-dark-700 bg-dark-800' 
                          : 'border-secondary-200 bg-white'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Text className="text-2xl mr-3">{currency.symbol}</Text>
                      <View>
                        <Text className={`text-base font-medium ${
                          isDark ? 'text-dark-100' : 'text-secondary-800'
                        }`}>
                          {currency.name}
                        </Text>
                        <Text className={`text-sm ${
                          isDark ? 'text-dark-400' : 'text-secondary-500'
                        }`}>
                          {currency.code}
                        </Text>
                      </View>
                    </View>
                    {selectedCurrency?.id === currency.id && (
                      <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                        <Text className="text-white text-sm">✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </View>

        {/* Notification Preferences */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-dark-100' : 'text-secondary-800'
          }`}>
            Notification Preferences
          </Text>
          <Text className={`text-sm mb-4 ${
            isDark ? 'text-dark-400' : 'text-secondary-500'
          }`}>
            How would you like to be notified about upcoming renewals?
          </Text>

          {/* Push Notifications Toggle */}
          <View className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
            isDark ? 'bg-dark-800' : 'bg-secondary-50'
          }`}>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🔔</Text>
              <View>
                <Text className={`text-base font-medium ${
                  isDark ? 'text-dark-100' : 'text-secondary-800'
                }`}>
                  Push Notifications
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-dark-400' : 'text-secondary-500'
                }`}>
                  Get notified on your device
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => toggleNotification('push')}
              className={`w-12 h-6 rounded-full ${
                notificationPreferences.push ? 'bg-primary-500' : 'bg-secondary-300'
              }`}
            >
              <View className={`w-5 h-5 rounded-full bg-white mt-0.5 ${
                notificationPreferences.push ? 'ml-6' : 'ml-0.5'
              }`} />
            </TouchableOpacity>
          </View>

          {/* Email Notifications Toggle */}
          <View className={`flex-row items-center justify-between p-4 rounded-xl mb-4 ${
            isDark ? 'bg-dark-800' : 'bg-secondary-50'
          }`}>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">📧</Text>
              <View>
                <Text className={`text-base font-medium ${
                  isDark ? 'text-dark-100' : 'text-secondary-800'
                }`}>
                  Email Notifications
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-dark-400' : 'text-secondary-500'
                }`}>
                  Receive email reminders
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => toggleNotification('email')}
              className={`w-12 h-6 rounded-full ${
                notificationPreferences.email ? 'bg-primary-500' : 'bg-secondary-300'
              }`}
            >
              <View className={`w-5 h-5 rounded-full bg-white mt-0.5 ${
                notificationPreferences.email ? 'ml-6' : 'ml-0.5'
              }`} />
            </TouchableOpacity>
          </View>

          {/* Days Before Selection */}
          <Text className={`text-sm mb-3 ${
            isDark ? 'text-dark-400' : 'text-secondary-500'
          }`}>
            How many days before renewal?
          </Text>
          <View className="flex-row space-x-2">
            {[1, 3, 5, 7].map((days) => (
              <TouchableOpacity
                key={days}
                onPress={() => updateDaysBefore(days)}
                className={`px-4 py-2 rounded-lg ${
                  notificationPreferences.days_before === days
                    ? 'bg-primary-500'
                    : isDark 
                      ? 'bg-dark-700' 
                      : 'bg-secondary-200'
                }`}
              >
                <Text className={`text-sm font-medium ${
                  notificationPreferences.days_before === days
                    ? 'text-white'
                    : isDark 
                      ? 'text-dark-300' 
                      : 'text-secondary-600'
                }`}>
                  {days} day{days > 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
}
