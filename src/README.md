# Source Code Structure

This directory contains the core application code organized following React Native best practices.

## 📁 Directory Structure

```
src/
├── types/           # TypeScript type definitions
│   ├── index.ts     # Export all types
│   ├── user.ts      # User-related types
│   ├── subscription.ts # Subscription types
│   ├── provider.ts  # Provider types
│   ├── category.ts  # Category types
│   ├── currency.ts  # Currency types
│   ├── billing-cycle.ts # Billing cycle types
│   ├── feature-flag.ts # Feature flag types
│   └── notification.ts # Notification types
├── services/        # API service classes
│   ├── index.ts     # Export all services
│   ├── supabaseClient.ts # Typed Supabase client
│   ├── userService.ts    # User operations
│   ├── subscriptionService.ts # Subscription CRUD
│   ├── providerService.ts # Provider operations
│   ├── categoryService.ts # Category operations
│   ├── currencyService.ts # Currency operations
│   └── billingCycleService.ts # Billing cycle operations
├── components/      # Reusable UI components
│   ├── AuthGuard.tsx
│   ├── StableHeader.tsx
│   ├── ThemeToggle.tsx
│   └── animations/
├── hooks/           # Custom React hooks and contexts
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── utils/           # Utility functions
│   └── userUtils.ts
└── constants/       # App constants (to be added)
```

## 🎯 Types Overview

### Core Types
- **User**: User profile and preferences
- **Subscription**: User's subscription data with relationships
- **Provider**: Subscription service providers
- **Category**: Subscription categories (Streaming, Software, etc.)
- **Currency**: Supported currencies (RON, EUR, USD, etc.)
- **BillingCycle**: Billing frequencies (Daily, Monthly, Yearly, etc.)
- **FeatureFlag**: Feature toggles for users
- **Notification**: Notification history and management

### Extended Types
- **SubscriptionWithDetails**: Subscription with all related data
- **ProviderWithCategory**: Provider with category information
- **UserWithCurrency**: User with currency information

## 🛠 Services Overview

### SupabaseClient
- Typed Supabase client with authentication helpers
- Session management utilities
- Authentication state checking

### Service Classes
Each service class provides typed methods for database operations:

#### UserService
- `getCurrentUserProfile()` - Get user profile with currency
- `updateProfile()` - Update user information
- `updateNotificationPreferences()` - Update notification settings

#### SubscriptionService
- `getUserSubscriptions()` - Get all user subscriptions
- `getActiveSubscriptions()` - Get only active subscriptions
- `createSubscription()` - Create new subscription
- `updateSubscription()` - Update existing subscription
- `deleteSubscription()` - Delete subscription
- `getUpcomingRenewals()` - Get renewals in next 30 days
- `calculateUserTotals()` - Calculate monthly/yearly totals

#### ProviderService
- `getAllProviders()` - Get all available providers
- `getPopularProviders()` - Get providers for onboarding
- `getProvidersByCategory()` - Filter by category
- `searchProviders()` - Search by name

#### CategoryService
- `getAllCategories()` - Get all categories
- `getCategoryById()` - Get specific category
- `getCategoryByName()` - Get category by name

#### CurrencyService
- `getAllCurrencies()` - Get all currencies
- `getCurrencyByCode()` - Get currency by code (RON, EUR, etc.)
- `getDefaultCurrency()` - Get RON as default

#### BillingCycleService
- `getAllBillingCycles()` - Get all billing cycles
- `getBillingCycleByType()` - Get by type (monthly, yearly, etc.)
- `getDefaultBillingCycle()` - Get monthly as default

## 🚀 Usage Examples

### Import Types
```typescript
import { User, Subscription, Provider } from '../src/types';
import { SubscriptionWithDetails } from '../src/types/subscription';
```

### Use Services
```typescript
import { SubscriptionService, UserService } from '../src/services';

// Get user's subscriptions
const subscriptions = await SubscriptionService.getUserSubscriptions();

// Create new subscription
const newSubscription = await SubscriptionService.createSubscription({
  name: 'Netflix',
  amount: 15.99,
  currency_id: 'ron-currency-id',
  billing_cycle_id: 'monthly-cycle-id',
  start_date: '2024-01-01',
  next_billing_date: '2024-02-01'
});

// Get user profile
const profile = await UserService.getCurrentUserProfile();
```

### Helper Functions
```typescript
import { convertToMonthlyAmount, calculateYearlyProjection } from '../src/types/subscription';

// Convert any billing cycle to monthly amount
const monthlyAmount = convertToMonthlyAmount(99.99, 'yearly'); // 8.33

// Calculate yearly projection
const yearlyTotal = calculateYearlyProjection(monthlyAmount); // 99.99
```

## 🔧 Constants and Enums

### Currency Codes
```typescript
import { CURRENCY_CODES } from '../src/types/currency';
// CURRENCY_CODES.RON, CURRENCY_CODES.EUR, etc.
```

### Category Names
```typescript
import { CATEGORY_NAMES } from '../src/types/category';
// CATEGORY_NAMES.STREAMING, CATEGORY_NAMES.SOFTWARE, etc.
```

### Popular Providers
```typescript
import { POPULAR_PROVIDERS } from '../src/types/provider';
// POPULAR_PROVIDERS.NETFLIX, POPULAR_PROVIDERS.SPOTIFY, etc.
```

## 🔒 Type Safety

All services are fully typed with:
- Input parameter validation
- Return type guarantees
- Database relationship handling
- Error handling with proper types

## 📝 Notes

- All services automatically handle user authentication
- RLS (Row Level Security) policies are enforced at the database level
- Services include proper error handling and null checks
- Helper functions are provided for common calculations
- Constants are available for common values to avoid magic strings
