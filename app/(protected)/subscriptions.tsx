import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StableHeader } from '../../components/StableHeader';

export default function SubscriptionsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <StableHeader title="Subscriptions" />
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Subscriptions</Text>
            <Text style={styles.subtitle}>
              Track and manage all your subscription services
            </Text>
          </View>

          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📱</Text>
            <Text style={styles.emptyTitle}>No subscriptions yet</Text>
            <Text style={styles.emptySubtitle}>
              Add your first subscription to start tracking your spending
            </Text>
            
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Subscription</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Tips</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipText}>• Track recurring payments</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipText}>• Set renewal reminders</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipText}>• Monitor spending trends</Text>
            </View>
          </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsSection: {
    backgroundColor: '#fff',
    padding: 20,
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
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
