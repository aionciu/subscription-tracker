import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import { Currency } from '../../types/currency';
import { formatCurrency } from '../../utils/currencyUtils';

interface YearlyProjectionCardProps {
  yearlyProjection: number;
  currency: Currency | null;
  savingsInsights: string[];
}

export const YearlyProjectionCard: React.FC<YearlyProjectionCardProps> = ({
  yearlyProjection,
  currency,
  savingsInsights
}) => {
  const { isDark } = useTheme();

  if (!currency) {
    return (
      <View className={`p-5 rounded-xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
        <View className="flex-row items-center mb-3">
          <Ionicons 
            name="trending-up-outline" 
            size={20} 
            color={isDark ? '#8E8E93' : '#8E8E93'} 
          />
          <Text className={`ml-2 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
            Yearly Projection
          </Text>
        </View>
        <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
          {formatCurrency(0, { id: 'ron', code: 'RON', name: 'Romanian Leu', symbol: 'lei', is_active: true, created_at: '' })}
        </Text>
        <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          Add subscriptions to see projections
        </Text>
      </View>
    );
  }

  return (
    <View className={`p-5 rounded-xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <View className="flex-row items-center mb-3">
        <Ionicons 
          name="trending-up-outline" 
          size={20} 
          color="#34C759" 
        />
        <Text className={`ml-2 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
          Yearly Projection
        </Text>
      </View>
      
      <Text className={`text-2xl font-bold mb-3 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        {formatCurrency(yearlyProjection, currency)}
      </Text>
      
      {savingsInsights.length > 0 && (
        <View className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-700">
          <Text className={`text-xs font-medium mb-2 ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
            💡 Savings Insights
          </Text>
          {savingsInsights.slice(0, 2).map((insight, index) => (
            <Text 
              key={index}
              className={`text-xs mb-1 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}
            >
              {insight}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};
