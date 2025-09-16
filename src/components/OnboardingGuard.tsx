import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../hooks/AuthContext';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-base text-secondary-500">
          Loading...
        </Text>
      </View>
    );
  }

  // Only allow onboarding for authenticated users without profiles
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
};
