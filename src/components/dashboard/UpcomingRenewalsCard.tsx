import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import { SubscriptionWithDetails } from '../../types/subscription';
import { formatCurrency } from '../../utils/currencyUtils';

interface UpcomingRenewal {
  subscription: SubscriptionWithDetails;
  daysUntilPayment: number;
  formattedDate: string;
}

interface UpcomingRenewalsCardProps {
  upcomingRenewals: UpcomingRenewal[];
  onViewAll?: () => void;
  onRenewalPress?: (subscription: SubscriptionWithDetails) => void;
}

export const UpcomingRenewalsCard: React.FC<UpcomingRenewalsCardProps> = ({
  upcomingRenewals,
  onViewAll,
  onRenewalPress
}) => {
  const { isDark } = useTheme();

  if (upcomingRenewals.length === 0) {
    return (
      <View className={`p-5 rounded-xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons 
              name="calendar-outline" 
              size={20} 
              color={isDark ? '#8E8E93' : '#8E8E93'} 
            />
            <Text className={`ml-2 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
              Upcoming Renewals
            </Text>
          </View>
        </View>
        <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          No renewals in the next 30 days
        </Text>
      </View>
    );
  }

  return (
    <View className={`p-5 rounded-xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons 
            name="calendar-outline" 
            size={20} 
            color="#007AFF" 
          />
          <Text className={`ml-2 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
            Upcoming Renewals
          </Text>
        </View>
        {upcomingRenewals.length > 3 && (
          <TouchableOpacity onPress={onViewAll}>
            <Text className="text-primary-500 text-sm font-medium">View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row space-x-3">
          {upcomingRenewals.slice(0, 3).map((renewal, index) => (
            <TouchableOpacity
              key={renewal.subscription.id}
              className={`p-3 rounded-lg min-w-[140px] ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}
              onPress={() => onRenewalPress?.(renewal.subscription)}
              activeOpacity={0.7}
            >
              <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
                {renewal.subscription.name}
              </Text>
              <Text className={`text-xs mb-2 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                {renewal.formattedDate}
              </Text>
              <Text className={`text-sm font-bold text-primary-500`}>
                {formatCurrency(renewal.subscription.amount, renewal.subscription.currency)}
              </Text>
              <Text className={`text-xs mt-1 ${renewal.daysUntilPayment <= 3 ? 'text-warning' : 'text-secondary-500'}`}>
                {renewal.daysUntilPayment === 0 ? 'Today' : 
                 renewal.daysUntilPayment === 1 ? 'Tomorrow' : 
                 `${renewal.daysUntilPayment} days`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
