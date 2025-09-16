-- Row Level Security (RLS) policies for data isolation
-- This migration enables RLS and creates policies for per-user data access

-- Enable RLS on all user-facing tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can only see and modify their own profile
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Subscriptions table policies
-- Users can only see and modify their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON public.subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscriptions" ON public.subscriptions
    FOR DELETE USING (auth.uid() = user_id);

-- Notifications table policies
-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications" ON public.notifications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Feature flags table policies
-- Users can view global flags and their own user-specific flags
CREATE POLICY "Users can view global feature flags" ON public.feature_flags
    FOR SELECT USING (user_id IS NULL);

CREATE POLICY "Users can view own feature flags" ON public.feature_flags
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own feature flags" ON public.feature_flags
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feature flags" ON public.feature_flags
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for reference tables (no user data)
-- These tables contain only reference data that all users can read
CREATE POLICY "Anyone can view currencies" ON public.currencies
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view categories" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view billing cycles" ON public.billing_cycles
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view subscription providers" ON public.subscription_providers
    FOR SELECT USING (true);

-- Admin policies (for future admin functionality)
-- These policies allow service role to manage reference data
CREATE POLICY "Service role can manage currencies" ON public.currencies
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage categories" ON public.categories
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage billing cycles" ON public.billing_cycles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage subscription providers" ON public.subscription_providers
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage feature flags" ON public.feature_flags
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage notifications" ON public.notifications
    FOR ALL USING (auth.role() = 'service_role');

-- Function to handle user creation
-- This function will be called when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
