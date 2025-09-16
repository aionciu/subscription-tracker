# Supabase Database Setup

This directory contains the database schema, migrations, and seed data for the subscription tracker app.

## Database Schema Overview

The database consists of the following main tables:

### Core Tables
- **users** - User profiles (extends Supabase auth.users)
- **subscriptions** - User subscription data
- **subscriptions_providers** - Available subscription services
- **categories** - Subscription categories (Streaming, Software, etc.)
- **billing_cycles** - Billing frequency options
- **currencies** - Supported currencies
- **feature_flags** - Feature toggles for users
- **notifications** - Notification history

### Relationships
- Users have many subscriptions
- Subscriptions belong to a provider (or custom)
- Subscriptions have a category, billing cycle, and currency
- Users can have feature flags (global or user-specific)

## Migration Files

1. **001_initial_schema.sql** - Creates all tables, indexes, and triggers
2. **002_rls_policies.sql** - Implements Row Level Security for data isolation
3. **003_seed_data.sql** - Populates reference tables with initial data
4. **004_storage_setup.sql** - Configures Supabase Storage for logos/avatars

## Running Migrations

### Using Supabase CLI

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

4. Run migrations:
```bash
supabase db push
```

### Manual Execution

You can also run the SQL files manually in the Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run each migration file in order (001, 002, 003, 004)

## Seed Data

The seed data includes:

- **Currencies**: RON (primary), EUR, USD, GBP, CHF, CAD, AUD
- **Categories**: 11 categories including Streaming, Software, Gaming, etc.
- **Billing Cycles**: Daily, Weekly, Monthly, Quarterly, Yearly
- **Providers**: 30+ popular subscription services
- **Feature Flags**: Default feature toggles

## Row Level Security (RLS)

All user data is protected by RLS policies:

- Users can only access their own data
- Reference tables (providers, categories, etc.) are publicly readable
- Service role has full access for admin operations

## Storage Configuration

Two storage buckets are configured:

- **provider-logos**: Public bucket for subscription provider logos
- **user-avatars**: User-specific bucket for profile pictures

## Helper Functions

The schema includes several helper functions:

- `get_popular_providers()` - Returns providers for onboarding
- `calculate_user_totals(user_uuid)` - Calculates user's subscription totals
- `get_avatar_url(user_uuid)` - Gets user's avatar URL
- `get_provider_logo_url(provider_name)` - Gets provider logo URL

## Environment Variables

Make sure your `.env` file includes:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Testing the Setup

After running migrations, you can test the setup:

1. Create a test user through your app's auth flow
2. Check that the user profile is created in the `users` table
3. Try creating a subscription to verify RLS policies work
4. Verify that reference data is accessible

## Troubleshooting

### Common Issues

1. **Migration fails**: Check that you're running migrations in the correct order
2. **RLS blocking access**: Verify that users are properly authenticated
3. **Storage upload fails**: Check bucket policies and file permissions
4. **Foreign key errors**: Ensure all referenced data exists before creating subscriptions

### Useful Queries

Check if RLS is working:
```sql
-- This should only return the current user's data
SELECT * FROM subscriptions WHERE user_id = auth.uid();
```

Verify seed data:
```sql
-- Check that providers were inserted
SELECT COUNT(*) FROM subscription_providers WHERE is_popular = true;
```

## Next Steps

After the database is set up:

1. Update your TypeScript interfaces to match the schema
2. Implement the subscription CRUD operations
3. Set up the onboarding flow using `get_popular_providers()`
4. Configure push notifications using the notifications table
5. Implement the dashboard using `calculate_user_totals()`
