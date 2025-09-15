import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { StableHeader } from '../../components/StableHeader';
import { useTheme } from '../../contexts/ThemeContext';

export default function SubscriptionsScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  const handleAvatarPress = () => {
    router.push('/(protected)/profile');
  };

  return (
    <View className="flex-1">
      <StableHeader title="Subscriptions" onAvatarPress={handleAvatarPress} />
      <View className={`flex-1 ${isDark ? 'bg-dark-900' : 'bg-secondary-50'}`}>
        <ScrollView className="flex-1 p-5">
          <View className="mb-8">
            <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>Your Subscriptions</Text>
            <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              Track and manage all your subscription services
            </Text>
          </View>

          <View className={`items-center p-10 rounded-2xl mb-8 shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
            <Text className="text-5xl mb-4">📱</Text>
            <Text className={`text-xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>No subscriptions yet</Text>
            <Text className={`text-base text-center leading-6 mb-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              Add your first subscription to start tracking your spending
            </Text>
            
            <TouchableOpacity className="bg-primary-500 px-6 py-3 rounded-lg">
              <Text className="text-white text-base font-semibold">+ Add Subscription</Text>
            </TouchableOpacity>
          </View>

          <View className={`p-5 rounded-2xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
            <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>💡 Tips</Text>
            <View className="mb-2">
              <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>• Track recurring payments</Text>
            </View>
            <View className="mb-2">
              <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>• Set renewal reminders</Text>
            </View>
            <View className="mb-2">
              <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>• Monitor spending trends</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

