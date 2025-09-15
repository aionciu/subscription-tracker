import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { StableHeader } from '../../components/StableHeader';
import { useAuth } from '../../contexts/AuthContext';
import { getUserDisplayName } from '../../utils/userUtils';

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

const DashboardHeader = ({ user }: { user: any }) => (
  <View className="mb-8">
    <Text className="text-2xl font-bold text-secondary-900 mb-2">
      Welcome back, {getUserDisplayName(user)}!
    </Text>
    <Text className="text-base text-secondary-500 leading-6">
      Manage your subscriptions and track your spending
    </Text>
  </View>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <View className="bg-white p-5 rounded-xl flex-1 mx-1 items-center shadow-card">
    <Text className="text-3xl font-bold text-primary-500 mb-1">{number}</Text>
    <Text className="text-sm text-secondary-500 text-center">{label}</Text>
  </View>
);

const StatsContainer = () => (
  <View className="flex-row justify-between mb-8">
    <StatCard number="0" label="Active Subscriptions" />
    <StatCard number="$0" label="Monthly Cost" />
  </View>
);

const ActionButton = ({ 
  text, 
  onPress, 
  isDestructive = false 
}: { 
  text: string; 
  onPress: () => void; 
  isDestructive?: boolean; 
}) => (
  <TouchableOpacity
    className={`p-5 rounded-xl items-center shadow-card ${isDestructive ? 'bg-danger' : 'bg-white'}`}
    onPress={onPress}
  >
    <Text className={`text-base font-semibold ${isDestructive ? 'text-white' : 'text-secondary-900'}`}>
      {text}
    </Text>
  </TouchableOpacity>
);

const ActionsContainer = ({ 
  onViewSubscriptions, 
  onSignOut 
}: { 
  onViewSubscriptions: () => void; 
  onSignOut: () => void; 
}) => (
  <View className="gap-4">
    <ActionButton 
      text="📱 View Subscriptions" 
      onPress={onViewSubscriptions} 
    />
    <ActionButton 
      text="🚪 Sign Out" 
      onPress={onSignOut} 
      isDestructive={true} 
    />
  </View>
);

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    performSignOut(signOut);
  };

  const handleViewSubscriptions = () => {
    router.push('/(protected)/subscriptions');
  };

  const handleAvatarPress = () => {
    router.push('/(protected)/profile');
  };

  return (
    <View className="flex-1">
      <StableHeader title="Dashboard" onAvatarPress={handleAvatarPress} />
      <View className="flex-1 bg-secondary-50">
        <ScrollView className="flex-1 p-5">
          <DashboardHeader user={user} />
          <StatsContainer />
          <ActionsContainer 
            onViewSubscriptions={handleViewSubscriptions}
            onSignOut={handleSignOut}
          />
        </ScrollView>
      </View>
    </View>
  );
}

