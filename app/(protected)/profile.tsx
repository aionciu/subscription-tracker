import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
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
  <View style={styles.avatarContainer}>
    <Text style={styles.avatarText}>
      {getUserAvatarText(user)}
    </Text>
  </View>
);

const UserInfo = ({ user }: { user: any }) => (
  <View style={styles.profileSection}>
    <UserAvatar user={user} />
    <Text style={styles.nameText}>
      {getUserDisplayName(user)}
    </Text>
    <Text style={styles.emailText}>
      {user?.email}
    </Text>
  </View>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const AccountInfo = ({ user }: { user: any }) => (
  <View style={styles.infoSection}>
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
    style={[styles.actionButton, isDestructive && styles.signOutButton]}
    onPress={onPress}
  >
    <Text style={[styles.actionButtonText, isDestructive && styles.signOutButtonText]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const ActionButtons = ({ onSignOut }: { onSignOut: () => void }) => (
  <View style={styles.actionsSection}>
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

  return (
    <View style={{ flex: 1 }}>
      <StableHeader title="Profile" />
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <UserInfo user={user} />
          <AccountInfo user={user} />
          <ActionButtons onSignOut={handleSignOut} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  actionsSection: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  signOutButton: {
    backgroundColor: '#ff3b30',
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#fff',
  },
});
