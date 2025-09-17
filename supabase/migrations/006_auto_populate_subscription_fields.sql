-- Migration to auto-populate subscription name and description from provider
-- This migration adds triggers to automatically populate name and description
-- from the selected provider when creating or updating subscriptions

-- Function to auto-populate subscription fields from provider
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
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for INSERT operations
CREATE TRIGGER auto_populate_subscription_fields_insert
    BEFORE INSERT ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION auto_populate_subscription_fields();

-- Create trigger for UPDATE operations (only when provider changes)
CREATE TRIGGER auto_populate_subscription_fields_update
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    WHEN (OLD.provider_id IS DISTINCT FROM NEW.provider_id)
    EXECUTE FUNCTION auto_populate_subscription_fields();

-- Update existing subscriptions to populate name and description from provider
UPDATE subscriptions 
SET 
    name = sp.name,
    description = sp.description
FROM subscription_providers sp
WHERE subscriptions.provider_id = sp.id
AND (subscriptions.name IS NULL OR subscriptions.name = '' OR subscriptions.description IS NULL OR subscriptions.description = '');
