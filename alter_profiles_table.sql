-- Create the membership enum type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership') THEN
    CREATE TYPE membership AS ENUM ('free', 'pro');
  END IF;
END$$;

-- Add missing columns to profiles table (with checks to avoid errors if they already exist)
DO $$
BEGIN
  -- Check if membership column exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'membership') THEN
    ALTER TABLE profiles ADD COLUMN membership membership NOT NULL DEFAULT 'free';
  END IF;
  
  -- Check if stripe_customer_id column exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id') THEN
    ALTER TABLE profiles ADD COLUMN stripe_customer_id TEXT;
  END IF;
  
  -- Check if stripe_subscription_id column exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'stripe_subscription_id') THEN
    ALTER TABLE profiles ADD COLUMN stripe_subscription_id TEXT;
  END IF;
END$$; 