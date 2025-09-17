import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';

interface EmptyStateCardProps {
  onAddSubscription: () => void;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ onAddSubscription }) => {
  const { isDark } = useTheme();

  return (
    <View className={`p-8 rounded-xl shadow-card items-center ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`}>
        <Ionicons 
          name="card-outline" 
          size={32} 
          color={isDark ? '#8E8E93' : '#8E8E93'} 
        />
      </View>
      
      <Text className={`text-lg font-semibold mb-2 text-center ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        No subscriptions yet
      </Text>
      
      <Text className={`text-sm text-center mb-6 leading-5 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
        Start tracking your subscriptions to get insights into your spending and never miss a renewal.
      </Text>
      
      <TouchableOpacity
        className={`px-6 py-3 rounded-xl items-center ${isDark ? 'bg-primary-600' : 'bg-primary-500'}`}
        onPress={onAddSubscription}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center">
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Add Your First Subscription</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
