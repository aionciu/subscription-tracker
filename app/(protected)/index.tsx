import { useRouter } from 'expo-router';
import React from 'react';
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { StableHeader } from '../../src/components/StableHeader';
import {
    EmptyStateCard,
    MonthlyTotalCard,
    NextPaymentCard,
    UpcomingRenewalsCard,
    YearlyProjectionCard
} from '../../src/components/dashboard';
import { useAuth } from '../../src/hooks/AuthContext';
import { useTheme } from '../../src/hooks/ThemeContext';
import { useDashboard } from '../../src/hooks/useDashboard';
import { getUserDisplayName } from '../../src/utils/userUtils';

const handleSignOutError = (error: unknown) => {
  console.error('Sign out error:', error);
};

const performSignOut = async (signOut: () => Promise<void>) => {
  try {
    await signOut();
  } catch (error) {
    handleSignOutError(error);
  }
};

const DashboardHeader = ({ user }: { user: any }) => {
  const { isDark } = useTheme();
  
  return (
    <View className="mb-6">
      <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        Welcome back, {getUserDisplayName(user)}!
      </Text>
      <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
        Track your subscriptions and manage your spending
      </Text>
    </View>
  );
};

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const { isDark } = useTheme();
  const router = useRouter();
  
  const {
    activeSubscriptionsCount,
    monthlyData,
    yearlyProjection,
    nextPayment,
    upcomingRenewals,
    savingsInsights,
    loading,
    refreshDashboard,
  } = useDashboard();

  const handleSignOut = () => {
    performSignOut(signOut);
  };

  const handleViewSubscriptions = () => {
    router.push('/(protected)/subscriptions');
  };

  const handleAvatarPress = () => {
    router.push('/(protected)/profile');
  };

  const handleAddSubscription = () => {
    router.push('/(protected)/subscriptions');
  };

  const handleNextPaymentPress = () => {
    if (nextPayment) {
      router.push('/(protected)/subscriptions');
    }
  };

  const handleRenewalPress = (subscription: any) => {
    router.push('/(protected)/subscriptions');
  };

  const handleViewAllRenewals = () => {
    router.push('/(protected)/subscriptions');
  };

  const hasSubscriptions = activeSubscriptionsCount > 0;

  return (
    <View className="flex-1">
      <StableHeader title="Dashboard" onAvatarPress={handleAvatarPress} />
      <View className={`flex-1 ${isDark ? 'bg-dark-900' : 'bg-secondary-50'}`}>
        <ScrollView 
          className="flex-1 p-5"
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refreshDashboard}
              tintColor={isDark ? '#8E8E93' : '#8E8E93'}
            />
          }
        >
          <DashboardHeader user={user} />
          
          {!hasSubscriptions ? (
            <EmptyStateCard onAddSubscription={handleAddSubscription} />
          ) : (
            <View className="space-y-4">
              {/* Next Payment Card */}
              {nextPayment && (
                <NextPaymentCard
                  subscription={nextPayment.subscription}
                  daysUntilPayment={nextPayment.daysUntilPayment}
                  formattedDate={nextPayment.formattedDate}
                  onPress={handleNextPaymentPress}
                />
              )}

              {/* Monthly Total and Yearly Projection */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <MonthlyTotalCard
                    total={monthlyData.total}
                    currency={monthlyData.currency}
                    activeSubscriptionsCount={activeSubscriptionsCount}
                  />
                </View>
                <View className="flex-1">
                  <YearlyProjectionCard
                    yearlyProjection={yearlyProjection}
                    currency={monthlyData.currency}
                    savingsInsights={savingsInsights}
                  />
                </View>
              </View>

              {/* Upcoming Renewals */}
              {upcomingRenewals.length > 0 && (
                <UpcomingRenewalsCard
                  upcomingRenewals={upcomingRenewals}
                  onViewAll={handleViewAllRenewals}
                  onRenewalPress={handleRenewalPress}
                />
              )}

              {/* Quick Actions */}
              <View className="mt-6 space-y-3">
                <TouchableOpacity
                  className={`p-4 rounded-xl items-center shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}
                  onPress={handleViewSubscriptions}
                  activeOpacity={0.7}
                >
                  <Text className={`text-base font-semibold ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
                    📱 Manage Subscriptions
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className={`p-4 rounded-xl items-center shadow-card bg-danger`}
                  onPress={handleSignOut}
                  activeOpacity={0.7}
                >
                  <Text className="text-white font-semibold">
                    🚪 Sign Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

