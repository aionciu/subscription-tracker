// Notification types and interfaces
export interface Notification {
  id: string;
  user_id: string;
  subscription_id: string;
  type: string;
  title: string;
  message: string;
  sent_at: string;
  read_at: string | null;
  metadata: Record<string, any> | null;
}

export interface NotificationInsert {
  user_id: string;
  subscription_id: string;
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, any> | null;
}

export interface NotificationUpdate {
  read_at?: string | null;
  metadata?: Record<string, any> | null;
}

// Notification types
export const NOTIFICATION_TYPES = {
  RENEWAL_REMINDER: 'renewal_reminder',
  PAYMENT_DUE: 'payment_due',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  SUBSCRIPTION_EXPIRED: 'subscription_expired',
  WELCOME: 'welcome',
  FEATURE_UPDATE: 'feature_update',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// Helper function to create notification messages
export function createNotificationMessage(
  type: NotificationType,
  subscriptionName: string,
  daysUntilRenewal?: number
): { title: string; message: string } {
  switch (type) {
    case 'renewal_reminder':
      return {
        title: 'Subscription Renewal Reminder',
        message: `Your ${subscriptionName} subscription will renew in ${daysUntilRenewal} days.`,
      };
    case 'payment_due':
      return {
        title: 'Payment Due',
        message: `Payment for ${subscriptionName} is due today.`,
      };
    case 'subscription_cancelled':
      return {
        title: 'Subscription Cancelled',
        message: `Your ${subscriptionName} subscription has been cancelled.`,
      };
    case 'subscription_expired':
      return {
        title: 'Subscription Expired',
        message: `Your ${subscriptionName} subscription has expired.`,
      };
    case 'welcome':
      return {
        title: 'Welcome to Subscription Tracker!',
        message: 'Start tracking your subscriptions and never miss a renewal again.',
      };
    case 'feature_update':
      return {
        title: 'New Feature Available',
        message: 'Check out the latest features in your subscription tracker.',
      };
    default:
      return {
        title: 'Notification',
        message: 'You have a new notification.',
      };
  }
}
