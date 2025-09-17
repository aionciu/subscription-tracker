import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { SubscriptionWithDetails } from '../types';
import { getDaysUntilString, safeFormatDate } from '../utils/dateUtils';
import { Card } from './ui/Card';

interface SubscriptionCardProps {
  subscription: SubscriptionWithDetails;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onPress,
  onEdit,
  onDelete,
}) => {
  const { isDark } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'paused':
        return 'text-yellow-500';
      case 'cancelled':
        return 'text-red-500';
      case 'expired':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '●';
      case 'paused':
        return '⏸';
      case 'cancelled':
        return '✕';
      case 'expired':
        return '○';
      default:
        return '○';
    }
  };

  const formatAmount = (amount: number, currencyCode: string) => {
    return `${amount.toFixed(2)} ${currencyCode}`;
  };

  const formatDate = (dateString: string) => {
    return safeFormatDate(dateString);
  };

  const getDaysUntilRenewal = (nextBillingDate: string) => {
    return getDaysUntilString(nextBillingDate);
  };

  return (
    <Card onPress={onPress} className="mb-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          {/* Provider Name and Status */}
          <View className="flex-row items-center mb-2">
            <Text className={`text-lg font-bold ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
              {subscription.provider?.name || subscription.custom_provider_name}
            </Text>
            <View className="ml-2 flex-row items-center">
              <Text className={`text-sm ${getStatusColor(subscription.status)}`}>
                {getStatusIcon(subscription.status)}
              </Text>
              <Text className={`text-sm ml-1 capitalize ${getStatusColor(subscription.status)}`}>
                {subscription.status}
              </Text>
            </View>
          </View>

          {/* Amount and Billing Cycle */}
          <View className="flex-row items-center mb-2">
            <Text className={`text-xl font-bold ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
              {formatAmount(subscription.amount, subscription.currency.code)}
            </Text>
            <Text className={`text-sm ml-2 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              per {subscription.billing_cycle.type}
            </Text>
          </View>

          {/* Next Billing Date */}
          <View className="flex-row items-center mb-2">
            <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              Next billing: {formatDate(subscription.next_billing_date)}
            </Text>
            <View className={`ml-2 px-2 py-1 rounded-full ${
              getDaysUntilRenewal(subscription.next_billing_date) === 'Overdue' 
                ? 'bg-red-100' 
                : getDaysUntilRenewal(subscription.next_billing_date) === 'Today' || 
                  getDaysUntilRenewal(subscription.next_billing_date) === 'Tomorrow'
                ? 'bg-yellow-100'
                : 'bg-green-100'
            }`}>
              <Text className={`text-xs font-medium ${
                getDaysUntilRenewal(subscription.next_billing_date) === 'Overdue' 
                  ? 'text-red-700' 
                  : getDaysUntilRenewal(subscription.next_billing_date) === 'Today' || 
                    getDaysUntilRenewal(subscription.next_billing_date) === 'Tomorrow'
                  ? 'text-yellow-700'
                  : 'text-green-700'
              }`}>
                {getDaysUntilRenewal(subscription.next_billing_date)}
              </Text>
            </View>
          </View>

          {/* Category */}
          {subscription.category && (
            <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              {subscription.category.name}
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View className="flex-row ml-3">
          {onEdit && (
            <TouchableOpacity
              onPress={onEdit}
              className="p-2 mr-1"
              activeOpacity={0.7}
            >
              <Text className={`text-lg ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                ✏️
              </Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              className="p-2"
              activeOpacity={0.7}
            >
              <Text className={`text-lg ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                🗑️
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
};
