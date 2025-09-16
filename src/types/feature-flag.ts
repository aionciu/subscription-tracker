// Feature flag types and interfaces
export interface FeatureFlag {
  id: string;
  name: string;
  description: string | null;
  is_enabled: boolean;
  user_id: string | null; // null for global flags
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface FeatureFlagInsert {
  name: string;
  description?: string | null;
  is_enabled?: boolean;
  user_id?: string | null;
  metadata?: Record<string, any> | null;
}

export interface FeatureFlagUpdate {
  name?: string;
  description?: string | null;
  is_enabled?: boolean;
  user_id?: string | null;
  metadata?: Record<string, any> | null;
}

// Predefined feature flags
export const FEATURE_FLAGS = {
  PREMIUM_FEATURES: 'premium_features',
  ADVANCED_ANALYTICS: 'advanced_analytics',
  EXPORT_DATA: 'export_data',
  DARK_MODE: 'dark_mode',
  NOTIFICATIONS: 'notifications',
  BACKUP_SYNC: 'backup_sync',
} as const;

export type FeatureFlagName = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

// Helper function to check if a feature is enabled
export function isFeatureEnabled(
  flags: FeatureFlag[],
  featureName: FeatureFlagName,
  userId?: string
): boolean {
  // First check for user-specific flag
  if (userId) {
    const userFlag = flags.find(
      flag => flag.name === featureName && flag.user_id === userId
    );
    if (userFlag) {
      return userFlag.is_enabled;
    }
  }
  
  // Then check for global flag
  const globalFlag = flags.find(
    flag => flag.name === featureName && flag.user_id === null
  );
  
  return globalFlag ? globalFlag.is_enabled : false;
}
