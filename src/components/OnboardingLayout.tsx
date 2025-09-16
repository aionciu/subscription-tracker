import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '../hooks/OnboardingContext';
import { useTheme } from '../hooks/ThemeContext';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextButtonText?: string;
  onNext?: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  showBackButton = true,
  showNextButton = true,
  nextButtonText = 'Next',
  onNext,
  onBack,
  isLoading = false,
}) => {
  const { state, nextStep, previousStep } = useOnboarding();
  const { isDark } = useTheme();
  const router = useRouter();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Update step tracking before navigating back
      previousStep();
      
      // Use router.back() to go to previous screen in navigation stack
      router.back();
    }
  };

  const progressPercentage = ((state.currentStep + 1) / state.totalSteps) * 100;

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      {/* Progress Bar */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row justify-between items-center mb-3">
          <Text className={`text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
            Step {state.currentStep + 1} of {state.totalSteps}
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
          {state.steps[state.currentStep]?.title || 'Onboarding'}
        </Text>
        <Text className={`text-base ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          {state.steps[state.currentStep]?.description || 'Complete your setup'}
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        {children}
      </View>

      {/* Navigation Buttons */}
      <View className="px-6 pb-6 pt-4">
        <View className="flex-row justify-between items-center">
          {/* Back Button */}
          {showBackButton && state.currentStep > 0 && (
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
          {!showBackButton && <View className="flex-1" />}

          {/* Next Button */}
          {showNextButton && (
            <TouchableOpacity
              onPress={handleNext}
              disabled={isLoading}
              className={`flex-row items-center px-6 py-3 rounded-xl bg-primary-500 ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              <Text className="text-white text-base font-semibold mr-2">
                {nextButtonText}
              </Text>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
