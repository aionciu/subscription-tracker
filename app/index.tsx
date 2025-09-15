import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
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

  // Redirect based on authentication status
  if (user) {
    return <Redirect href="/(protected)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
