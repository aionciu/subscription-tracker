import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../hooks/AuthContext';
import { OnboardingService } from '../services/onboardingService';
import { UserService } from '../services/userService';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (user && requireAuth) {
      checkUserProfile();
    }
  }, [user, requireAuth]);

  const checkUserProfile = async () => {
    try {
      setProfileLoading(true);
      
      // First check if user has completed onboarding
      const hasCompletedOnboarding = await OnboardingService.hasCompletedOnboarding();
      
      if (hasCompletedOnboarding) {
        // If onboarding is completed, fetch the full profile
        const profile = await UserService.getCurrentUserProfile();
        setUserProfile(profile);
      } else {
        // If onboarding is not completed, user needs onboarding
        setUserProfile(null);
      }
    } catch (error: any) {
      console.error('Error checking user profile:', error);
      // If profile doesn't exist (PGRST116 error), user needs onboarding
      if (error?.code === 'PGRST116') {
        setUserProfile(null);
      } else {
        // For other errors, still set to null to trigger onboarding
        setUserProfile(null);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-base text-secondary-500">
          Loading...
        </Text>
      </View>
    );
  }

  if (requireAuth && !user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!requireAuth && user) {
    return <Redirect href="/(protected)" />;
  }

  // If user is authenticated but doesn't have a profile, redirect to onboarding
  if (requireAuth && user && !userProfile) {
    return <Redirect href="/(onboarding)" />;
  }

  return <>{children}</>;
};
