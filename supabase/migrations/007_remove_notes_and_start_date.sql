-- Migration to remove notes field and make start_date optional
-- This migration removes the notes field entirely and makes start_date nullable
-- since we only need next_billing_date for tracking subscriptions

-- First, update existing subscriptions to set start_date to next_billing_date if start_date is null
UPDATE subscriptions 
SET start_date = next_billing_date 
WHERE start_date IS NULL;

-- Make start_date nullable
ALTER TABLE subscriptions ALTER COLUMN start_date DROP NOT NULL;

-- Remove the notes column entirely
ALTER TABLE subscriptions DROP COLUMN IF EXISTS notes;

-- Update the auto-populate function to not set notes
CREATE OR REPLACE FUNCTION auto_populate_subscription_fields()
RETURNS TRIGGER AS $$
BEGIN
    -- Only auto-populate if provider_id is provided and name/description are empty
    IF NEW.provider_id IS NOT NULL THEN
        -- Get provider details
        SELECT 
            sp.name,
            sp.description
        INTO 
            NEW.name,
            NEW.description
        FROM subscription_providers sp
        WHERE sp.id = NEW.provider_id;
        
        -- If provider not found, keep existing values
        IF NOT FOUND THEN
            -- Keep existing values or set defaults
            NEW.name := COALESCE(NEW.name, 'Unknown Provider');
            NEW.description := COALESCE(NEW.description, '');
        END IF;
    END IF;
    
    -- Set start_date to next_billing_date if not provided
    IF NEW.start_date IS NULL THEN
        NEW.start_date := NEW.next_billing_date;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
