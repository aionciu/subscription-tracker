// Database types matching the Supabase schema
// These types are generated to match the database tables exactly

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          currency_id: string | null
          timezone: string
          notification_preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          currency_id?: string | null
          timezone?: string
          notification_preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          currency_id?: string | null
          timezone?: string
          notification_preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      currencies: {
        Row: {
          id: string
          code: string
          name: string
          symbol: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          symbol: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          symbol?: string
          is_active?: boolean
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      billing_cycles: {
        Row: {
          id: string
          name: string
          type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
          days: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
          days: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
          days?: number
          is_active?: boolean
          created_at?: string
        }
      }
      subscription_providers: {
        Row: {
          id: string
          name: string
          description: string | null
          website_url: string | null
          logo_url: string | null
          category_id: string | null
          is_popular: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          website_url?: string | null
          logo_url?: string | null
          category_id?: string | null
          is_popular?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          website_url?: string | null
          logo_url?: string | null
          category_id?: string | null
          is_popular?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          provider_id: string | null
          custom_provider_name: string | null
          name: string
          description: string | null
          amount: number
          currency_id: string
          billing_cycle_id: string
          status: 'active' | 'paused' | 'cancelled' | 'expired'
          start_date: string
          next_billing_date: string
          end_date: string | null
          auto_renew: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider_id?: string | null
          custom_provider_name?: string | null
          name: string
          description?: string | null
          amount: number
          currency_id: string
          billing_cycle_id: string
          status?: 'active' | 'paused' | 'cancelled' | 'expired'
          start_date: string
          next_billing_date: string
          end_date?: string | null
          auto_renew?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider_id?: string | null
          custom_provider_name?: string | null
          name?: string
          description?: string | null
          amount?: number
          currency_id?: string
          billing_cycle_id?: string
          status?: 'active' | 'paused' | 'cancelled' | 'expired'
          start_date?: string
          next_billing_date?: string
          end_date?: string | null
          auto_renew?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      feature_flags: {
        Row: {
          id: string
          name: string
          description: string | null
          is_enabled: boolean
          user_id: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          is_enabled?: boolean
          user_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          is_enabled?: boolean
          user_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          subscription_id: string
          type: string
          title: string
          message: string
          sent_at: string
          read_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id: string
          type: string
          title: string
          message: string
          sent_at?: string
          read_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          subscription_id?: string
          type?: string
          title?: string
          message?: string
          sent_at?: string
          read_at?: string | null
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_popular_providers: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          description: string | null
          website_url: string | null
          category_name: string
          category_color: string | null
        }[]
      }
      calculate_user_totals: {
        Args: {
          user_uuid: string
        }
        Returns: {
          monthly_total: number
          yearly_projection: number
          active_subscriptions: number
          next_payment_date: string | null
          next_payment_amount: number | null
        }[]
      }
      get_avatar_url: {
        Args: {
          user_uuid: string
        }
        Returns: string | null
      }
      get_provider_logo_url: {
        Args: {
          provider_name: string
        }
        Returns: string | null
      }
    }
    Enums: {
      billing_cycle_type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
      subscription_status: 'active' | 'paused' | 'cancelled' | 'expired'
    }
  }
}

// Convenience types for common use cases
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update']

export type Provider = Database['public']['Tables']['subscription_providers']['Row']
export type ProviderInsert = Database['public']['Tables']['subscription_providers']['Insert']
export type ProviderUpdate = Database['public']['Tables']['subscription_providers']['Update']

export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export type BillingCycle = Database['public']['Tables']['billing_cycles']['Row']
export type BillingCycleInsert = Database['public']['Tables']['billing_cycles']['Insert']
export type BillingCycleUpdate = Database['public']['Tables']['billing_cycles']['Update']

export type Currency = Database['public']['Tables']['currencies']['Row']
export type CurrencyInsert = Database['public']['Tables']['currencies']['Insert']
export type CurrencyUpdate = Database['public']['Tables']['currencies']['Update']

export type FeatureFlag = Database['public']['Tables']['feature_flags']['Row']
export type FeatureFlagInsert = Database['public']['Tables']['feature_flags']['Insert']
export type FeatureFlagUpdate = Database['public']['Tables']['feature_flags']['Update']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

// Extended types with relationships
export type SubscriptionWithDetails = Subscription & {
  provider: Provider | null
  category: Category | null
  currency: Currency
  billing_cycle: BillingCycle
}

export type ProviderWithCategory = Provider & {
  category: Category | null
}

export type UserWithCurrency = User & {
  currency: Currency | null
}

// Function return types
export type PopularProvider = Database['public']['Functions']['get_popular_providers']['Returns'][0]
export type UserTotals = Database['public']['Functions']['calculate_user_totals']['Returns'][0]
