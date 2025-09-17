import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import { Currency } from '../../types/currency';
import { formatCurrency } from '../../utils/currencyUtils';

interface MonthlyTotalCardProps {
  total: number;
  currency: Currency | null;
  activeSubscriptionsCount: number;
}

export const MonthlyTotalCard: React.FC<MonthlyTotalCardProps> = ({
  total,
  currency,
  activeSubscriptionsCount
}) => {
  const { isDark } = useTheme();

  if (!currency) {
    return (
      <View className={`p-5 rounded-xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
        <View className="flex-row items-center mb-3">
          <Ionicons 
            name="card-outline" 
            size={20} 
            color={isDark ? '#8E8E93' : '#8E8E93'} 
          />
          <Text className={`ml-2 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
            Monthly Total
          </Text>
        </View>
        <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
          {formatCurrency(0, { id: 'ron', code: 'RON', name: 'Romanian Leu', symbol: 'lei', is_active: true, created_at: '' })}
        </Text>
        <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          No active subscriptions
        </Text>
      </View>
    );
  }

  return (
    <View className={`p-5 rounded-xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <View className="flex-row items-center mb-3">
        <Ionicons 
          name="card-outline" 
          size={20} 
          color="#007AFF" 
        />
        <Text className={`ml-2 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
          Monthly Total
        </Text>
      </View>
      
      <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        {formatCurrency(total, currency)}
      </Text>
      
      <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
        {activeSubscriptionsCount} active subscription{activeSubscriptionsCount !== 1 ? 's' : ''}
      </Text>
    </View>
  );
};
