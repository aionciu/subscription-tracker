import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StableHeader } from '../../components/StableHeader';

export default function SubscriptionsScreen() {
  return (
    <View className="flex-1">
      <StableHeader title="Subscriptions" />
      <View className="flex-1 bg-secondary-50">
        <ScrollView className="flex-1 p-5">
          <View className="mb-8">
            <Text className="text-2xl font-bold text-secondary-900 mb-2">Your Subscriptions</Text>
            <Text className="text-base text-secondary-500 leading-6">
              Track and manage all your subscription services
            </Text>
          </View>

          <View className="items-center bg-white p-10 rounded-2xl mb-8 shadow-card">
            <Text className="text-5xl mb-4">📱</Text>
            <Text className="text-xl font-bold text-secondary-900 mb-2">No subscriptions yet</Text>
            <Text className="text-base text-secondary-500 text-center leading-6 mb-6">
              Add your first subscription to start tracking your spending
            </Text>
            
            <TouchableOpacity className="bg-primary-500 px-6 py-3 rounded-lg">
              <Text className="text-white text-base font-semibold">+ Add Subscription</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white p-5 rounded-2xl shadow-card">
            <Text className="text-lg font-bold text-secondary-900 mb-4">💡 Tips</Text>
            <View className="mb-2">
              <Text className="text-base text-secondary-500 leading-6">• Track recurring payments</Text>
            </View>
            <View className="mb-2">
              <Text className="text-base text-secondary-500 leading-6">• Set renewal reminders</Text>
            </View>
            <View className="mb-2">
              <Text className="text-base text-secondary-500 leading-6">• Monitor spending trends</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

