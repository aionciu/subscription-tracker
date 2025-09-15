import { User } from '@supabase/supabase-js';

/**
 * Extracts the display name from user metadata or falls back to email
 */
export const getUserDisplayName = (user: User | null): string => {
  return user?.user_metadata?.full_name || user?.email || 'User';
};

/**
 * Extracts the first character of the user's name for avatar display
 */
export const getUserAvatarText = (user: User | null): string => {
  const fullName = user?.user_metadata?.full_name;
  const email = user?.email;
  
  if (fullName) {
    return fullName.charAt(0).toUpperCase();
  }
  
  if (email) {
    return email.charAt(0).toUpperCase();
  }
  
  return 'U';
};

/**
 * Formats a date string to a readable format
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

/**
 * Gets the authentication provider from user metadata
 */
export const getUserProvider = (user: User | null): string => {
  return user?.app_metadata?.provider || 'Google';
};
