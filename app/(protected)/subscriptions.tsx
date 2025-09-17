import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AddSubscriptionModal } from '../../src/components/AddSubscriptionModal';
import { ConfirmModal } from '../../src/components/ConfirmModal';
import { EditSubscriptionModal } from '../../src/components/EditSubscriptionModal';
import { FloatingActionButton } from '../../src/components/FloatingActionButton';
import { StableHeader } from '../../src/components/StableHeader';
import { SubscriptionCard } from '../../src/components/SubscriptionCard';
import { useTheme } from '../../src/hooks/ThemeContext';
import { SubscriptionService } from '../../src/services/subscriptionService';
import { SubscriptionWithDetails } from '../../src/types';

export default function SubscriptionsScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  
  // State
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionWithDetails | null>(null);
  
  // Action states
  const [actionLoading, setActionLoading] = useState(false);

  const handleAvatarPress = () => {
    router.push('/(protected)/profile');
  };

  const loadSubscriptions = async () => {
    try {
      setError(null);
      const data = await SubscriptionService.getUserSubscriptions();
      setSubscriptions(data);
    } catch (err) {
      console.error('Error loading subscriptions:', err);
      setError('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSubscriptions();
    setRefreshing(false);
  };

  const handleAddSubscription = () => {
    setShowAddModal(true);
  };

  const handleEditSubscription = (subscription: SubscriptionWithDetails) => {
    setSelectedSubscription(subscription);
    setShowEditModal(true);
  };

  const handleDeleteSubscription = (subscription: SubscriptionWithDetails) => {
    setSelectedSubscription(subscription);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSubscription) return;

    setActionLoading(true);
    try {
      await SubscriptionService.deleteSubscription(selectedSubscription.id);
      await loadSubscriptions(); // Refresh the list
      setShowDeleteModal(false);
      setSelectedSubscription(null);
    } catch (err) {
      console.error('Error deleting subscription:', err);
      // Error handling could be improved with a toast notification
    } finally {
      setActionLoading(false);
    }
  };

  const handleModalSuccess = () => {
    loadSubscriptions(); // Refresh the list after add/edit
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedSubscription(null);
  };

  // Load subscriptions on mount
  useEffect(() => {
    loadSubscriptions();
  }, []);

  const renderEmptyState = () => (
    <View className={`items-center p-10 rounded-2xl mb-8 shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <Text className="text-5xl mb-4">📱</Text>
      <Text className={`text-xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        No subscriptions yet
      </Text>
      <Text className={`text-base text-center leading-6 mb-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
        Add your first subscription to start tracking your spending
      </Text>
      
      <TouchableOpacity 
        className="bg-primary-500 px-6 py-3 rounded-lg"
        onPress={handleAddSubscription}
        activeOpacity={0.8}
      >
        <Text className="text-white text-base font-semibold">+ Add Subscription</Text>
      </TouchableOpacity>
    </View>
  );

  const renderErrorState = () => (
    <View className={`items-center p-10 rounded-2xl mb-8 shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <Text className="text-5xl mb-4">⚠️</Text>
      <Text className={`text-xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        Something went wrong
      </Text>
      <Text className={`text-base text-center leading-6 mb-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
        {error}
      </Text>
      
      <TouchableOpacity 
        className="bg-primary-500 px-6 py-3 rounded-lg"
        onPress={loadSubscriptions}
        activeOpacity={0.8}
      >
        <Text className="text-white text-base font-semibold">Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoadingState = () => (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className={`text-base mt-4 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
        Loading subscriptions...
      </Text>
    </View>
  );

  const renderSubscriptionsList = () => (
    <View className="mb-8">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onPress={() => handleEditSubscription(subscription)}
          onEdit={() => handleEditSubscription(subscription)}
          onDelete={() => handleDeleteSubscription(subscription)}
        />
      ))}
    </View>
  );

  const renderTips = () => (
    <View className={`p-5 rounded-2xl shadow-card ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
        💡 Tips
      </Text>
      <View className="mb-2">
        <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          • Track recurring payments
        </Text>
      </View>
      <View className="mb-2">
        <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          • Set renewal reminders
        </Text>
      </View>
      <View className="mb-2">
        <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          • Monitor spending trends
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <StableHeader title="Subscriptions" onAvatarPress={handleAvatarPress} />
      <View className={`flex-1 ${isDark ? 'bg-dark-900' : 'bg-secondary-50'}`}>
        <ScrollView 
          className="flex-1 p-5"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View className="mb-8">
            <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
              Your Subscriptions
            </Text>
            <Text className={`text-base leading-6 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              Track and manage all your subscription services
            </Text>
          </View>

          {loading ? (
            renderLoadingState()
          ) : error ? (
            renderErrorState()
          ) : subscriptions.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              {renderSubscriptionsList()}
              {renderTips()}
            </>
          )}
        </ScrollView>

        {/* Floating Action Button */}
        {!loading && !error && (
          <FloatingActionButton onPress={handleAddSubscription} />
        )}
      </View>

      {/* Modals */}
      <AddSubscriptionModal
        visible={showAddModal}
        onClose={handleCloseModals}
        onSuccess={handleModalSuccess}
      />

      <EditSubscriptionModal
        visible={showEditModal}
        onClose={handleCloseModals}
        onSuccess={handleModalSuccess}
        subscription={selectedSubscription}
      />

      <ConfirmModal
        visible={showDeleteModal}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        title="Delete Subscription"
        message={`Are you sure you want to delete "${selectedSubscription?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={actionLoading}
      />
    </View>
  );
}

