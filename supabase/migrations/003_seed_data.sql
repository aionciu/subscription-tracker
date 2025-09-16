-- Seed data for reference tables
-- This migration populates the database with initial reference data

-- Insert currencies (focusing on Romanian market)
INSERT INTO public.currencies (code, name, symbol) VALUES
('RON', 'Romanian Leu', 'lei'),
('EUR', 'Euro', '€'),
('USD', 'US Dollar', '$'),
('GBP', 'British Pound', '£'),
('CHF', 'Swiss Franc', 'CHF'),
('CAD', 'Canadian Dollar', 'C$'),
('AUD', 'Australian Dollar', 'A$');

-- Insert categories
INSERT INTO public.categories (name, description, icon, color) VALUES
('Streaming', 'Video and music streaming services', 'play-circle', '#FF6B6B'),
('Software', 'Software subscriptions and licenses', 'computer', '#4ECDC4'),
('Cloud Storage', 'Cloud storage and backup services', 'cloud', '#45B7D1'),
('Gaming', 'Gaming subscriptions and services', 'gamepad', '#96CEB4'),
('News & Media', 'News subscriptions and digital magazines', 'newspaper', '#FFEAA7'),
('Productivity', 'Productivity and business tools', 'briefcase', '#DDA0DD'),
('Fitness & Health', 'Fitness apps and health services', 'heart', '#FF7675'),
('Education', 'Online courses and educational platforms', 'book', '#74B9FF'),
('Finance', 'Financial services and tools', 'credit-card', '#00B894'),
('Communication', 'Communication and messaging services', 'message-circle', '#6C5CE7'),
('Other', 'Other miscellaneous subscriptions', 'more-horizontal', '#636E72');

-- Insert billing cycles
INSERT INTO public.billing_cycles (name, type, days) VALUES
('Daily', 'daily', 1),
('Weekly', 'weekly', 7),
('Monthly', 'monthly', 30),
('Quarterly', 'quarterly', 90),
('Yearly', 'yearly', 365);

-- Insert popular subscription providers for Romanian market
INSERT INTO public.subscription_providers (name, description, website_url, category_id, is_popular) VALUES
-- Streaming
('Netflix', 'Video streaming service', 'https://netflix.com', (SELECT id FROM categories WHERE name = 'Streaming'), true),
('Spotify', 'Music streaming service', 'https://spotify.com', (SELECT id FROM categories WHERE name = 'Streaming'), true),
('Disney+', 'Disney streaming service', 'https://disneyplus.com', (SELECT id FROM categories WHERE name = 'Streaming'), true),
('HBO Max', 'HBO streaming service', 'https://hbomax.com', (SELECT id FROM categories WHERE name = 'Streaming'), true),
('Amazon Prime Video', 'Amazon video streaming', 'https://primevideo.com', (SELECT id FROM categories WHERE name = 'Streaming'), true),
('YouTube Premium', 'YouTube without ads', 'https://youtube.com/premium', (SELECT id FROM categories WHERE name = 'Streaming'), true),

-- Software
('Microsoft 365', 'Microsoft Office suite', 'https://microsoft.com/microsoft-365', (SELECT id FROM categories WHERE name = 'Software'), true),
('Adobe Creative Cloud', 'Creative software suite', 'https://adobe.com/creativecloud', (SELECT id FROM categories WHERE name = 'Software'), true),
('Figma', 'Design and prototyping tool', 'https://figma.com', (SELECT id FROM categories WHERE name = 'Software'), true),
('Notion', 'All-in-one workspace', 'https://notion.so', (SELECT id FROM categories WHERE name = 'Software'), true),
('Slack', 'Team communication platform', 'https://slack.com', (SELECT id FROM categories WHERE name = 'Software'), true),

-- Cloud Storage
('Google Drive', 'Google cloud storage', 'https://drive.google.com', (SELECT id FROM categories WHERE name = 'Cloud Storage'), true),
('Dropbox', 'Cloud storage service', 'https://dropbox.com', (SELECT id FROM categories WHERE name = 'Cloud Storage'), true),
('iCloud', 'Apple cloud storage', 'https://icloud.com', (SELECT id FROM categories WHERE name = 'Cloud Storage'), true),
('OneDrive', 'Microsoft cloud storage', 'https://onedrive.live.com', (SELECT id FROM categories WHERE name = 'Cloud Storage'), true),

-- Gaming
('PlayStation Plus', 'PlayStation online service', 'https://playstation.com/plus', (SELECT id FROM categories WHERE name = 'Gaming'), true),
('Xbox Game Pass', 'Xbox gaming subscription', 'https://xbox.com/gamepass', (SELECT id FROM categories WHERE name = 'Gaming'), true),
('Steam', 'PC gaming platform', 'https://store.steampowered.com', (SELECT id FROM categories WHERE name = 'Gaming'), true),
('Nintendo Switch Online', 'Nintendo online service', 'https://nintendo.com/switch/online', (SELECT id FROM categories WHERE name = 'Gaming'), true),

-- News & Media
('The New York Times', 'American newspaper', 'https://nytimes.com', (SELECT id FROM categories WHERE name = 'News & Media'), true),
('The Guardian', 'British newspaper', 'https://theguardian.com', (SELECT id FROM categories WHERE name = 'News & Media'), true),
('Medium', 'Online publishing platform', 'https://medium.com', (SELECT id FROM categories WHERE name = 'News & Media'), true),

-- Productivity
('Trello', 'Project management tool', 'https://trello.com', (SELECT id FROM categories WHERE name = 'Productivity'), true),
('Asana', 'Work management platform', 'https://asana.com', (SELECT id FROM categories WHERE name = 'Productivity'), true),
('Monday.com', 'Work operating system', 'https://monday.com', (SELECT id FROM categories WHERE name = 'Productivity'), true),

-- Fitness & Health
('MyFitnessPal', 'Fitness and nutrition tracking', 'https://myfitnesspal.com', (SELECT id FROM categories WHERE name = 'Fitness & Health'), true),
('Headspace', 'Meditation and mindfulness', 'https://headspace.com', (SELECT id FROM categories WHERE name = 'Fitness & Health'), true),
('Calm', 'Meditation and sleep app', 'https://calm.com', (SELECT id FROM categories WHERE name = 'Fitness & Health'), true),

-- Education
('Coursera', 'Online learning platform', 'https://coursera.org', (SELECT id FROM categories WHERE name = 'Education'), true),
('Udemy', 'Online course marketplace', 'https://udemy.com', (SELECT id FROM categories WHERE name = 'Education'), true),
('LinkedIn Learning', 'Professional development', 'https://linkedin.com/learning', (SELECT id FROM categories WHERE name = 'Education'), true),

-- Finance
('Mint', 'Personal finance management', 'https://mint.com', (SELECT id FROM categories WHERE name = 'Finance'), true),
('YNAB', 'You Need A Budget', 'https://ynab.com', (SELECT id FROM categories WHERE name = 'Finance'), true),
('PocketGuard', 'Budget and expense tracker', 'https://pocketguard.com', (SELECT id FROM categories WHERE name = 'Finance'), true),

-- Communication
('Zoom', 'Video conferencing platform', 'https://zoom.us', (SELECT id FROM categories WHERE name = 'Communication'), true),
('Skype', 'Communication platform', 'https://skype.com', (SELECT id FROM categories WHERE name = 'Communication'), true),
('Discord Nitro', 'Gaming communication premium', 'https://discord.com/nitro', (SELECT id FROM categories WHERE name = 'Communication'), true);

-- Insert default feature flags
INSERT INTO public.feature_flags (name, description, is_enabled, user_id) VALUES
-- Global feature flags
('premium_features', 'Enable premium features for users', false, NULL),
('advanced_analytics', 'Show advanced analytics dashboard', false, NULL),
('export_data', 'Allow users to export their data', true, NULL),
('dark_mode', 'Enable dark mode theme', true, NULL),
('notifications', 'Enable push notifications', true, NULL),
('backup_sync', 'Enable automatic data backup and sync', true, NULL);

-- Create a function to get popular providers for onboarding
CREATE OR REPLACE FUNCTION public.get_popular_providers()
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    website_url TEXT,
    category_name TEXT,
    category_color TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sp.id,
        sp.name,
        sp.description,
        sp.website_url,
        c.name as category_name,
        c.color as category_color
    FROM public.subscription_providers sp
    JOIN public.categories c ON sp.category_id = c.id
    WHERE sp.is_popular = true AND sp.is_active = true
    ORDER BY c.name, sp.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to calculate subscription totals
CREATE OR REPLACE FUNCTION public.calculate_user_totals(user_uuid UUID)
RETURNS TABLE (
    monthly_total DECIMAL(10,2),
    yearly_projection DECIMAL(10,2),
    active_subscriptions INTEGER,
    next_payment_date DATE,
    next_payment_amount DECIMAL(10,2)
) AS $$
BEGIN
    RETURN QUERY
    WITH monthly_converted AS (
        SELECT 
            s.amount,
            CASE bc.type
                WHEN 'daily' THEN s.amount * 30
                WHEN 'weekly' THEN s.amount * 4.33
                WHEN 'monthly' THEN s.amount
                WHEN 'quarterly' THEN s.amount / 3
                WHEN 'yearly' THEN s.amount / 12
            END as monthly_amount
        FROM public.subscriptions s
        JOIN public.billing_cycles bc ON s.billing_cycle_id = bc.id
        WHERE s.user_id = user_uuid AND s.status = 'active'
    )
    SELECT 
        COALESCE(SUM(monthly_amount), 0) as monthly_total,
        COALESCE(SUM(monthly_amount) * 12, 0) as yearly_projection,
        COUNT(*)::INTEGER as active_subscriptions,
        (SELECT MIN(next_billing_date) FROM public.subscriptions WHERE user_id = user_uuid AND status = 'active') as next_payment_date,
        (SELECT s.amount FROM public.subscriptions s WHERE s.user_id = user_uuid AND s.status = 'active' AND s.next_billing_date = (SELECT MIN(next_billing_date) FROM public.subscriptions WHERE user_id = user_uuid AND status = 'active') LIMIT 1) as next_payment_amount
    FROM monthly_converted;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
