# Manual Migration Guide

Follow these steps to run the database migrations manually through the Supabase dashboard.

## Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com) and log in
2. Open your project dashboard
3. Navigate to **SQL Editor** in the left sidebar

## Step 2: Run Migrations in Order

### Migration 1: Initial Schema
Copy and paste the contents of `001_initial_schema.sql` into the SQL Editor and click **Run**.

### Migration 2: RLS Policies  
Copy and paste the contents of `002_rls_policies.sql` into the SQL Editor and click **Run**.

### Migration 3: Seed Data
Copy and paste the contents of `003_seed_data.sql` into the SQL Editor and click **Run**.

### Migration 4: Storage Setup
Copy and paste the contents of `004_storage_setup.sql` into the SQL Editor and click **Run**.

## Step 3: Verify Setup

After running all migrations, verify the setup by running these test queries:

### Check Tables Created
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### Check Seed Data
```sql
-- Check providers
SELECT COUNT(*) as provider_count FROM subscription_providers WHERE is_popular = true;

-- Check categories  
SELECT COUNT(*) as category_count FROM categories;

-- Check currencies
SELECT COUNT(*) as currency_count FROM currencies;
```

### Test RLS (Row Level Security)
```sql
-- This should return empty (no user authenticated)
SELECT * FROM subscriptions;
```

## Step 4: Test User Creation

1. Go to **Authentication > Users** in your Supabase dashboard
2. Create a test user manually or use your app's signup flow
3. Check that a user profile was created in the `users` table

## Troubleshooting

### If migrations fail:
- Check for syntax errors in the SQL
- Ensure you're running them in the correct order (001, 002, 003, 004)
- Check the Supabase logs for detailed error messages

### If RLS is blocking access:
- Verify that users are properly authenticated
- Check that the RLS policies are enabled
- Test with a service role key if needed

## Next Steps

After successful migration:
1. Update your `.env` file with the correct Supabase URL and keys
2. Test the authentication flow in your app
3. Try creating a subscription to verify everything works
