import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import { SubscriptionWithDetails } from '../../types/subscription';
import { formatCurrency } from '../../utils/currencyUtils';

interface NextPaymentCardProps {
  subscription: SubscriptionWithDetails;
  daysUntilPayment: number;
  formattedDate: string;
  onPress?: () => void;
}

export const NextPaymentCard: React.FC<NextPaymentCardProps> = ({
  subscription,
  daysUntilPayment,
  formattedDate,
  onPress
}) => {
  const { isDark } = useTheme();

  const getDaysText = () => {
    if (daysUntilPayment === 0) return 'Today';
    if (daysUntilPayment === 1) return 'Tomorrow';
    if (daysUntilPayment < 0) return `${Math.abs(daysUntilPayment)} days overdue`;
    return `${daysUntilPayment} days`;
  };

  const getUrgencyColor = () => {
    if (daysUntilPayment < 0) return 'text-danger';
    if (daysUntilPayment <= 3) return 'text-warning';
    if (daysUntilPayment <= 7) return 'text-primary-500';
    return isDark ? 'text-dark-400' : 'text-secondary-500';
  };

  const getUrgencyIcon = () => {
    if (daysUntilPayment < 0) return 'warning';
    if (daysUntilPayment <= 3) return 'alert-circle';
    if (daysUntilPayment <= 7) return 'time';
    return 'calendar';
  };

  return (
    <TouchableOpacity
      className={`p-5 rounded-xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <Ionicons 
            name={getUrgencyIcon() as any} 
            size={20} 
            color={daysUntilPayment <= 3 ? '#FF6B6B' : '#007AFF'} 
          />
          <Text className={`ml-2 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-secondary-600'}`}>
            Next Payment
          </Text>
        </View>
        <Text className={`text-sm font-semibold ${getUrgencyColor()}`}>
          {getDaysText()}
        </Text>
      </View>

      <View className="mb-3">
        <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
          {subscription.name}
        </Text>
        <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          {formattedDate}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className={`text-2xl font-bold text-primary-500`}>
          {formatCurrency(subscription.amount, subscription.currency)}
        </Text>
        <Ionicons 
          name="chevron-forward" 
          size={16} 
          color={isDark ? '#8E8E93' : '#8E8E93'} 
        />
      </View>
    </TouchableOpacity>
  );
};
