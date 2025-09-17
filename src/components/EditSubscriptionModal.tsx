import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/ThemeContext';
import { BillingCycleService } from '../services/billingCycleService';
import { CurrencyService } from '../services/currencyService';
import { SubscriptionService } from '../services/subscriptionService';
import { BillingCycle, Currency, SubscriptionUpdate, SubscriptionWithDetails } from '../types';
import { Modal } from './ui/Modal';

interface EditSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subscription: SubscriptionWithDetails | null;
}

export const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({
  visible,
  onClose,
  onSuccess,
  subscription,
}) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 2;
  
  // Form state
  const [formData, setFormData] = useState({
    providerId: '',
    customProviderName: '',
    amount: '',
    currencyId: '',
    billingCycleId: '',
    status: 'active',
    nextBillingDate: '',
    endDate: '',
    autoRenew: true,
  });

  // Options state
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [billingCycles, setBillingCycles] = useState<BillingCycle[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load options and populate form when subscription changes
  useEffect(() => {
    if (visible && subscription) {
      loadOptions();
      populateForm();
      setCurrentStep(0);
    }
  }, [visible, subscription]);

  // Step management functions
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Set Pricing';
      case 1: return 'Billing Date';
      default: return 'Edit Subscription';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 0: return 'Enter the cost and billing cycle';
      case 1: return 'Set when this subscription will be billed next';
      default: return 'Complete your subscription update';
    }
  };

  const loadOptions = async () => {
    setLoading(true);
    try {
      const [currenciesData, billingCyclesData] = await Promise.all([
        CurrencyService.getAllCurrencies(),
        BillingCycleService.getAllBillingCycles(),
      ]);

      setCurrencies(currenciesData);
      setBillingCycles(billingCyclesData);
    } catch (error) {
      console.error('Error loading options:', error);
      Alert.alert(
        'Configuration Error', 
        'Unable to connect to the database. Please check your internet connection and try again. If the problem persists, contact support.',
        [
          { text: 'OK', onPress: () => onClose() }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const populateForm = () => {
    if (!subscription) return;
    
    setFormData({
      providerId: subscription.provider_id || '',
      customProviderName: subscription.custom_provider_name || '',
      amount: subscription.amount.toString(),
      currencyId: subscription.currency_id,
      billingCycleId: subscription.billing_cycle_id,
      status: subscription.status,
      nextBillingDate: subscription.next_billing_date,
      endDate: subscription.end_date || '',
      autoRenew: subscription.auto_renew,
    });
    
    // Set the selected date for the date picker
    if (subscription.next_billing_date) {
      setSelectedDate(new Date(subscription.next_billing_date));
    }
    
    setErrors({});
    setShowDatePicker(false);
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0: // Pricing
        if (!formData.amount.trim()) {
          newErrors.amount = 'Please enter amount';
        } else {
          const amount = parseFloat(formData.amount);
          if (isNaN(amount) || amount <= 0) {
            newErrors.amount = 'Please enter a valid amount';
          }
        }
        if (!formData.currencyId) {
          newErrors.currencyId = 'Please select currency';
        }
        if (!formData.billingCycleId) {
          newErrors.billingCycleId = 'Please select billing cycle';
        }
        break;
      case 1: // Billing date
        if (!formData.nextBillingDate) {
          newErrors.nextBillingDate = 'Please select next billing date';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === totalSteps - 1) {
        handleSubmit();
      } else {
        nextStep();
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onClose();
    } else {
      previousStep();
    }
  };

  const handleSubmit = async () => {
    if (!subscription) return;

    setLoading(true);
    try {
      const updateData: SubscriptionUpdate = {
        provider_id: subscription.provider_id, // Keep the existing provider
        custom_provider_name: subscription.custom_provider_name, // Keep the existing custom provider name
        name: subscription.name, // Keep the existing name
        description: subscription.description, // Keep the existing description
        amount: parseFloat(formData.amount),
        currency_id: formData.currencyId,
        billing_cycle_id: formData.billingCycleId,
        status: formData.status as any,
        start_date: subscription.start_date, // Keep the existing start date
        next_billing_date: formData.nextBillingDate,
        end_date: formData.endDate || null,
        auto_renew: formData.autoRenew,
      };

      await SubscriptionService.updateSubscription(subscription.id, updateData);
      
      Alert.alert('Success', 'Subscription updated successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating subscription:', error);
      Alert.alert('Error', 'Failed to update subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setFormData(prev => ({ 
        ...prev, 
        nextBillingDate: selectedDate.toISOString().split('T')[0]
      }));
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };


  // Step content components
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPricingStep();
      case 1:
        return renderBillingDateStep();
      default:
        return null;
    }
  };


  const renderPricingStep = () => (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Provider Display */}
      <View className={`mb-6 p-4 rounded-xl border-2 ${
        isDark ? 'bg-dark-800 border-dark-700' : 'bg-secondary-50 border-secondary-200'
      }`}>
        <View className="flex-row items-center">
          <Text className="text-2xl mr-3">🏢</Text>
          <View className="flex-1">
            <Text className={`text-lg font-semibold ${
              isDark ? 'text-dark-100' : 'text-secondary-800'
            }`}>
              {subscription?.name}
            </Text>
            <Text className={`text-sm ${
              isDark ? 'text-dark-400' : 'text-secondary-500'
            }`}>
              {subscription?.description || 'Subscription Provider'}
            </Text>
          </View>
        </View>
      </View>

      <Text className={`text-base mb-6 ${
        isDark ? 'text-dark-400' : 'text-secondary-500'
      }`}>
        Enter the cost and billing cycle for this subscription.
      </Text>

      {/* Amount Input */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold mb-4 ${
          isDark ? 'text-dark-100' : 'text-secondary-800'
        }`}>
          Amount
        </Text>
        <View className={`p-4 rounded-xl ${
          isDark ? 'bg-dark-800' : 'bg-secondary-50'
        }`}>
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-3">💰</Text>
            <Text className={`text-sm font-medium ${
              isDark ? 'text-dark-300' : 'text-secondary-600'
            }`}>
              Monthly Cost
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <Text className={`text-3xl font-bold mr-3 ${
              isDark ? 'text-dark-100' : 'text-secondary-800'
            }`}>
              {formData.amount || '0.00'}
            </Text>
            <Text className={`text-lg ${
              isDark ? 'text-dark-400' : 'text-secondary-500'
            }`}>
              {currencies.find(c => c.id === formData.currencyId)?.code || 'RON'}
            </Text>
          </View>
          
          <View className="flex-row space-x-2 mt-4">
            {[10, 25, 50, 100].map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                className={`px-4 py-2 rounded-lg ${
                  formData.amount === amount.toString()
                    ? 'bg-primary-500'
                    : isDark 
                      ? 'bg-dark-700' 
                      : 'bg-secondary-200'
                }`}
              >
                <Text className={`text-sm font-medium ${
                  formData.amount === amount.toString()
                    ? 'text-white'
                    : isDark 
                      ? 'text-dark-300' 
                      : 'text-secondary-600'
                }`}>
                  {amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View className="mt-4">
            <Text className={`text-sm mb-2 ${
              isDark ? 'text-dark-400' : 'text-secondary-500'
            }`}>
              Or enter custom amount:
            </Text>
            <View className={`px-4 py-3 rounded-lg border ${
              isDark 
                ? 'bg-dark-700 border-dark-600' 
                : 'bg-white border-secondary-200'
            }`}>
              <Text className={`text-lg ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                {formData.amount || 'Enter amount'}
              </Text>
            </View>
          </View>
        </View>
        {errors.amount && (
          <Text className={`text-red-500 text-sm mt-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {errors.amount}
          </Text>
        )}
      </View>

      {/* Currency Selection */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold mb-4 ${
          isDark ? 'text-dark-100' : 'text-secondary-800'
        }`}>
          Currency
        </Text>
        <View className="space-y-2">
          {currencies.map((currency) => (
            <TouchableOpacity
              key={currency.id}
              onPress={() => setFormData(prev => ({ ...prev, currencyId: currency.id }))}
              className={`flex-row items-center justify-between p-4 rounded-xl border-2 ${
                formData.currencyId === currency.id
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
              {formData.currencyId === currency.id && (
                <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                  <Text className="text-white text-sm">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {errors.currencyId && (
          <Text className={`text-red-500 text-sm mt-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {errors.currencyId}
          </Text>
        )}
      </View>

      {/* Billing Cycle Selection */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold mb-4 ${
          isDark ? 'text-dark-100' : 'text-secondary-800'
        }`}>
          Billing Cycle
        </Text>
        <View className="space-y-2">
          {billingCycles.map((cycle) => (
            <TouchableOpacity
              key={cycle.id}
              onPress={() => setFormData(prev => ({ ...prev, billingCycleId: cycle.id }))}
              className={`flex-row items-center justify-between p-4 rounded-xl border-2 ${
                formData.billingCycleId === cycle.id
                  ? 'border-primary-500 bg-primary-50'
                  : isDark 
                    ? 'border-dark-700 bg-dark-800' 
                    : 'border-secondary-200 bg-white'
              }`}
            >
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">🔄</Text>
                <View>
                  <Text className={`text-base font-medium ${
                    isDark ? 'text-dark-100' : 'text-secondary-800'
                  }`}>
                    {cycle.name}
                  </Text>
                  <Text className={`text-sm ${
                    isDark ? 'text-dark-400' : 'text-secondary-500'
                  }`}>
                    {cycle.days} days
                  </Text>
                </View>
              </View>
              {formData.billingCycleId === cycle.id && (
                <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                  <Text className="text-white text-sm">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {errors.billingCycleId && (
          <Text className={`text-red-500 text-sm mt-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {errors.billingCycleId}
          </Text>
        )}
      </View>
    </ScrollView>
  );

  const renderBillingDateStep = () => {
    return (
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className={`text-base mb-6 ${
          isDark ? 'text-dark-400' : 'text-secondary-500'
        }`}>
          When will this subscription be billed next?
        </Text>

        {/* Date Selection Button */}
        <TouchableOpacity
          onPress={showDatePickerModal}
          className={`p-4 rounded-xl border-2 ${
            formData.nextBillingDate
              ? 'border-primary-500 bg-primary-50'
              : isDark 
                ? 'border-dark-700 bg-dark-800' 
                : 'border-secondary-200 bg-white'
          }`}
        >
          <View className="flex-row items-center">
            <Text className="text-2xl mr-3">📅</Text>
            <View className="flex-1">
              <Text className={`text-base font-medium ${
                isDark ? 'text-dark-100' : 'text-secondary-800'
              }`}>
                {formData.nextBillingDate 
                  ? selectedDate.toLocaleDateString()
                  : 'Select billing date'
                }
              </Text>
              <Text className={`text-sm ${
                isDark ? 'text-dark-400' : 'text-secondary-500'
              }`}>
                {formData.nextBillingDate 
                  ? 'Tap to change date'
                  : 'Choose when this subscription will be billed next'
                }
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={isDark ? '#8E8E93' : '#8E8E93'} 
            />
          </View>
        </TouchableOpacity>

        {/* Selected Date Display */}
        {formData.nextBillingDate && (
          <View className={`mt-4 p-4 rounded-xl ${
            isDark ? 'bg-dark-800' : 'bg-secondary-50'
          }`}>
            <Text className={`text-sm font-medium mb-2 ${
              isDark ? 'text-dark-300' : 'text-secondary-600'
            }`}>
              Selected Date:
            </Text>
            <Text className={`text-lg ${
              isDark ? 'text-dark-100' : 'text-secondary-800'
            }`}>
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>
        )}
        
        {errors.nextBillingDate && (
          <Text className={`text-red-500 text-sm mt-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {errors.nextBillingDate}
          </Text>
        )}

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
            style={{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }}
          />
        )}
      </ScrollView>
    );
  };

  if (!subscription) return null;

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Modal 
      visible={visible} 
      onClose={onClose} 
      fullScreen={true}
      showCloseButton={false}
    >
      <View className="flex-1">
        {/* Custom Header matching app style */}
        <View 
          className="bg-primary-500 px-5 pb-4 flex-row items-center justify-between"
          style={{ paddingTop: insets.top }}
        >
          <View className="flex-1" />
          
          <Text className="text-lg font-bold text-white text-center flex-2">
            Edit Subscription
          </Text>
          
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 items-end"
            activeOpacity={0.7}
          >
            <Ionicons 
              name="close" 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text className={`text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
              Step {currentStep + 1} of {totalSteps}
            </Text>
            <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>
          
          {/* Progress Bar */}
          <View className={`h-2 rounded-full ${isDark ? 'bg-dark-700' : 'bg-secondary-200'}`}>
            <View 
              className="h-2 rounded-full bg-primary-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </View>
        </View>

        {/* Step Title */}
        <View className="px-6 mb-6">
          <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
            {getStepTitle()}
          </Text>
          <Text className={`text-base ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
            {getStepDescription()}
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1 px-6">
          {renderStepContent()}
        </View>

        {/* Navigation Buttons */}
        <View className="px-6 pb-6 pt-4">
          <View className="flex-row justify-between items-center">
            {/* Back Button */}
            {currentStep > 0 && (
              <TouchableOpacity
                onPress={handleBack}
                className={`flex-row items-center px-4 py-3 rounded-xl ${
                  isDark ? 'bg-dark-800' : 'bg-secondary-100'
                }`}
              >
                <Ionicons 
                  name="chevron-back" 
                  size={20} 
                  color={isDark ? '#E5E5EA' : '#8E8E93'} 
                />
                <Text className={`ml-2 text-base font-medium ${
                  isDark ? 'text-dark-300' : 'text-secondary-600'
                }`}>
                  Back
                </Text>
              </TouchableOpacity>
            )}

            {/* Spacer for single button layout */}
            {currentStep === 0 && <View className="flex-1" />}

            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={loading}
              className={`flex-row items-center px-6 py-3 rounded-xl bg-primary-500 ${
                loading ? 'opacity-70' : ''
              }`}
            >
              <Text className="text-white text-base font-semibold mr-2">
                {currentStep === totalSteps - 1 ? 'Update Subscription' : 'Next'}
              </Text>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
