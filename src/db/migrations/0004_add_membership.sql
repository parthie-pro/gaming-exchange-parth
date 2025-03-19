-- Create the membership enum type
CREATE TYPE membership AS ENUM ('free', 'pro');

-- Add missing columns to profiles table
ALTER TABLE profiles 
  ADD COLUMN membership membership NOT NULL DEFAULT 'free',
  ADD COLUMN stripe_customer_id TEXT,
  ADD COLUMN stripe_subscription_id TEXT; 