-- Add onboarding_completed field to users table
ALTER TABLE public.users ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;

-- Create index for better performance
CREATE INDEX idx_users_onboarding_completed ON public.users(onboarding_completed);
