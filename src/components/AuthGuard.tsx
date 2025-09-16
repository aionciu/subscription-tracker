import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../hooks/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
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

  if (requireAuth && !user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!requireAuth && user) {
    return <Redirect href="/(protected)" />;
  }

  return <>{children}</>;
};
