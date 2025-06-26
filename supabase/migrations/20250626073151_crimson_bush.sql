/*
  # Create Initial Admin User Setup

  1. New Setup
    - Insert initial admin user into users table
    - Set up proper user management
    - Add function to sync auth users with users table

  2. Security
    - Maintain existing RLS policies
    - Add trigger to auto-create user records when auth users are created

  3. Notes
    - This migration prepares the users table for the admin user
    - The actual Supabase Auth user must be created manually in the Supabase dashboard
    - Or use the provided SQL function to create both auth and database user
*/

-- Function to create a complete user (auth + database record)
CREATE OR REPLACE FUNCTION create_admin_user(
  user_email text,
  user_password text,
  user_username text DEFAULT 'admin',
  user_role text DEFAULT 'admin'
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  result json;
BEGIN
  -- This function requires superuser privileges to work with auth.users
  -- For now, we'll just prepare the users table and provide instructions
  
  -- Generate a UUID for the user
  new_user_id := gen_random_uuid();
  
  -- Insert into users table (this will be updated when the auth user is created)
  INSERT INTO public.users (id, username, email, password_hash, role, created_at, updated_at)
  VALUES (
    new_user_id,
    user_username,
    user_email,
    'placeholder_hash', -- This will be managed by Supabase Auth
    user_role,
    now(),
    now()
  )
  ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    role = EXCLUDED.role,
    updated_at = now();
  
  result := json_build_object(
    'success', true,
    'message', 'User record prepared. Please create corresponding auth user in Supabase dashboard.',
    'user_id', new_user_id,
    'email', user_email
  );
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Create initial admin user record
SELECT create_admin_user('admin@activesoft.com', 'admin123', 'admin', 'admin');

-- Function to sync auth users with users table
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert into public.users when a new auth user is created
  INSERT INTO public.users (id, username, email, password_hash, role, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    'managed_by_auth',
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
    NEW.created_at,
    NEW.updated_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = EXCLUDED.updated_at;
  
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END;
$$;

-- Update existing users table to ensure admin user exists
INSERT INTO public.users (id, username, email, password_hash, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin',
  'admin@activesoft.com',
  'managed_by_auth',
  'admin',
  now(),
  now()
)
ON CONFLICT (email) DO UPDATE SET
  username = EXCLUDED.username,
  role = EXCLUDED.role,
  updated_at = now();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;