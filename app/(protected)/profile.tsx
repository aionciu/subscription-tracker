import React from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { StableHeader } from '../../components/StableHeader';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate, getUserAvatarText, getUserDisplayName, getUserProvider } from '../../utils/userUtils';

const showSignOutConfirmation = (onConfirm: () => Promise<void>) => {
  Alert.alert(
    'Sign Out',
    'Are you sure you want to sign out?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: onConfirm,
      },
    ]
  );
};

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

const UserAvatar = ({ user }: { user: any }) => (
  <View className="w-20 h-20 rounded-full bg-primary-500 justify-center items-center mb-4">
    <Text className="text-4xl font-bold text-white">
      {getUserAvatarText(user)}
    </Text>
  </View>
);

const UserInfo = ({ user }: { user: any }) => (
  <View className="items-center mb-8 bg-white p-8 rounded-2xl shadow-card">
    <UserAvatar user={user} />
    <Text className="text-2xl font-bold text-secondary-900 mb-1">
      {getUserDisplayName(user)}
    </Text>
    <Text className="text-base text-secondary-500">
      {user?.email}
    </Text>
  </View>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center py-3 border-b border-secondary-200">
    <Text className="text-base text-secondary-500">{label}</Text>
    <Text className="text-base font-medium text-secondary-900">{value}</Text>
  </View>
);

const AccountInfo = ({ user }: { user: any }) => (
  <View className="bg-white rounded-2xl p-5 mb-5 shadow-card">
    <InfoItem 
      label="Account Created" 
      value={formatDate(user?.created_at)} 
    />
    <InfoItem 
      label="Last Sign In" 
      value={formatDate(user?.last_sign_in_at)} 
    />
    <InfoItem 
      label="Provider" 
      value={getUserProvider(user)} 
    />
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
    className={`p-4 rounded-xl items-center shadow-card ${isDestructive ? 'bg-danger mt-5' : 'bg-white'}`}
    onPress={onPress}
  >
    <Text className={`text-base font-semibold ${isDestructive ? 'text-white' : 'text-secondary-900'}`}>
      {text}
    </Text>
  </TouchableOpacity>
);

const ActionButtons = ({ onSignOut }: { onSignOut: () => void }) => (
  <View className="gap-3">
    <ActionButton text="📧 Change Email" onPress={() => {}} />
    <ActionButton text="🔒 Privacy Settings" onPress={() => {}} />
    <ActionButton text="📱 Export Data" onPress={() => {}} />
    <ActionButton 
      text="🚪 Sign Out" 
      onPress={onSignOut} 
      isDestructive={true} 
    />
  </View>
);

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    showSignOutConfirmation(() => performSignOut(signOut));
  };

  const handleAvatarPress = () => {
    // Already on profile tab, no navigation needed
  };

  return (
    <View className="flex-1">
      <StableHeader title="Profile" onAvatarPress={handleAvatarPress} />
      <View className="flex-1 bg-secondary-50">
        <ScrollView className="flex-1 p-5">
          <UserInfo user={user} />
          <AccountInfo user={user} />
          <ActionButtons onSignOut={handleSignOut} />
        </ScrollView>
      </View>
    </View>
  );
}

