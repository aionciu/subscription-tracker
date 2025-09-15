import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
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
  <View style={styles.header}>
    <Text style={styles.welcomeText}>
      Welcome back, {getUserDisplayName(user)}!
    </Text>
    <Text style={styles.subtitle}>
      Manage your subscriptions and track your spending
    </Text>
  </View>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const StatsContainer = () => (
  <View style={styles.statsContainer}>
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
    style={[styles.actionButton, isDestructive && styles.signOutButton]}
    onPress={onPress}
  >
    <Text style={[styles.actionButtonText, isDestructive && styles.signOutButtonText]}>
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
  <View style={styles.actionsContainer}>
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

  return (
    <View style={{ flex: 1 }}>
      <StableHeader title="Dashboard" />
      <View style={styles.container}>
        <ScrollView style={styles.content}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
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
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    gap: 16,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 20,
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
  },
  signOutButtonText: {
    color: '#fff',
  },
});
