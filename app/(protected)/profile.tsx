import React from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StableHeader } from '../../src/components/StableHeader';
import { ThemeToggle } from '../../src/components/ThemeToggle';
import { useAuth } from '../../src/hooks/AuthContext';
import { useTheme } from '../../src/hooks/ThemeContext';
import { formatDate, getUserAvatarText, getUserDisplayName, getUserProvider } from '../../src/utils/userUtils';

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

const UserInfo = ({ user }: { user: any }) => {
  const { isDark } = useTheme();
  
  return (
    <View className={`items-center mb-8 p-8 rounded-2xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <UserAvatar user={user} />
      <Text className={`text-2xl font-bold mb-1 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        {getUserDisplayName(user)}
      </Text>
      <Text className={`text-base ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
        {user?.email}
      </Text>
    </View>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  const { isDark } = useTheme();
  
  return (
    <View className={`flex-row justify-between items-center py-3 border-b ${isDark ? 'border-dark-700' : 'border-secondary-200'}`}>
      <Text className={`text-base ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>{label}</Text>
      <Text className={`text-base font-medium ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>{value}</Text>
    </View>
  );
};

const AccountInfo = ({ user }: { user: any }) => {
  const { isDark } = useTheme();
  
  return (
    <View className={`rounded-2xl p-5 mb-5 shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
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
};

const ActionButton = ({ 
  text, 
  onPress, 
  isDestructive = false 
}: { 
  text: string; 
  onPress: () => void; 
  isDestructive?: boolean; 
}) => {
  const { isDark } = useTheme();
  
  return (
    <TouchableOpacity 
      className={`p-4 rounded-xl items-center shadow-card ${isDestructive ? 'bg-danger mt-5' : isDark ? 'bg-dark-800' : 'bg-white'}`}
      onPress={onPress}
    >
      <Text className={`text-base font-semibold ${isDestructive ? 'text-white' : isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

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
  const { isDark } = useTheme();

  const handleSignOut = () => {
    showSignOutConfirmation(() => performSignOut(signOut));
  };

  const handleAvatarPress = () => {
    // Already on profile tab, no navigation needed
  };

  return (
    <View className="flex-1">
      <StableHeader title="Profile" onAvatarPress={handleAvatarPress} />
      <View className={`flex-1 ${isDark ? 'bg-dark-900' : 'bg-secondary-50'}`}>
        <ScrollView className="flex-1 p-5">
          <UserInfo user={user} />
          <AccountInfo user={user} />
          <ThemeToggle className="mb-5" />
          <ActionButtons onSignOut={handleSignOut} />
        </ScrollView>
      </View>
    </View>
  );
}

