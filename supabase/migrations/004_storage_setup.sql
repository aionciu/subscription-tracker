-- Supabase Storage setup for provider logos and user avatars
-- This migration configures storage buckets and policies

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('provider-logos', 'provider-logos', true),
('user-avatars', 'user-avatars', true);

-- Storage policies for provider logos (public read access)
CREATE POLICY "Provider logos are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'provider-logos');

CREATE POLICY "Service role can manage provider logos" ON storage.objects
    FOR ALL USING (bucket_id = 'provider-logos' AND auth.role() = 'service_role');

-- Storage policies for user avatars
CREATE POLICY "User avatars are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'user-avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'user-avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own avatar" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'user-avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own avatar" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'user-avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Function to generate avatar URL
CREATE OR REPLACE FUNCTION public.get_avatar_url(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
    avatar_url TEXT;
BEGIN
    SELECT url INTO avatar_url
    FROM storage.objects
    WHERE bucket_id = 'user-avatars'
    AND name LIKE user_uuid::text || '/%'
    LIMIT 1;
    
    RETURN avatar_url;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate provider logo URL
CREATE OR REPLACE FUNCTION public.get_provider_logo_url(provider_name TEXT)
RETURNS TEXT AS $$
DECLARE
    logo_url TEXT;
BEGIN
    SELECT url INTO logo_url
    FROM storage.objects
    WHERE bucket_id = 'provider-logos'
    AND name LIKE provider_name || '%'
    LIMIT 1;
    
    RETURN logo_url;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
