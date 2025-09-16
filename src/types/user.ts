// User types and interfaces
import { Database } from '../../types/database';

export type User = Database['public']['Tables']['users']['Row'];

export interface NotificationPreferences {
  push: boolean;
  email: boolean;
  days_before: number;
}

export interface UserWithCurrency extends User {
  currency: Currency | null;
}

export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

// Import Currency type (will be defined in currency.ts)
import { Currency } from './currency';
