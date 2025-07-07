-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_username TEXT;
  counter INTEGER := 1;
BEGIN
  -- Start with the preferred username
  new_username := COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1));
  
  -- Check if username already exists and generate unique one if needed
  WHILE EXISTS (SELECT 1 FROM public.users WHERE username = new_username) LOOP
    new_username := COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)) || '_' || counter;
    counter := counter + 1;
  END LOOP;
  
  -- Try to insert the user
  BEGIN
    INSERT INTO public.users (id, username, email, password_hash, role, created_at, updated_at)
    VALUES (
      new.id,
      new_username,
      new.email,
      '', -- Password hash is managed by Supabase Auth
      COALESCE(new.raw_user_meta_data->>'role', 'admin'),
      new.created_at,
      new.updated_at
    );
  EXCEPTION
    WHEN unique_violation THEN
      -- Update existing record if there's a conflict
      UPDATE public.users 
      SET 
        username = new_username,
        role = COALESCE(new.raw_user_meta_data->>'role', 'admin'),
        updated_at = new.updated_at
      WHERE id = new.id OR email = new.email;
  END;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger AS $$
BEGIN
  UPDATE public.users
  SET
    email = new.email,
    updated_at = new.updated_at
  WHERE id = new.id;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user updates
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- Create function to handle user deletion
CREATE OR REPLACE FUNCTION public.handle_user_delete()
RETURNS trigger AS $$
BEGIN
  DELETE FROM public.users WHERE id = old.id;
  RETURN old;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user deletion
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_delete();

-- Sync existing auth users to public.users table with conflict resolution
DO $$
DECLARE
  auth_user RECORD;
  new_username TEXT;
  counter INTEGER := 1;
  existing_user_id UUID;
BEGIN
  FOR auth_user IN 
    SELECT 
      au.id,
      COALESCE(au.raw_user_meta_data->>'username', split_part(au.email, '@', 1)) as username,
      au.email,
      COALESCE(au.raw_user_meta_data->>'role', 'admin') as role,
      au.created_at,
      au.updated_at
    FROM auth.users au
  LOOP
    -- Check if user already exists by id or email
    SELECT id INTO existing_user_id 
    FROM public.users 
    WHERE id = auth_user.id OR email = auth_user.email 
    LIMIT 1;
    
    IF existing_user_id IS NOT NULL THEN
      -- Update existing user
      UPDATE public.users 
      SET 
        id = auth_user.id,
        email = auth_user.email,
        role = auth_user.role,
        updated_at = auth_user.updated_at
      WHERE id = existing_user_id;
    ELSE
      -- Generate unique username
      new_username := auth_user.username;
      counter := 1;
      
      WHILE EXISTS (SELECT 1 FROM public.users WHERE username = new_username) LOOP
        new_username := auth_user.username || '_' || counter;
        counter := counter + 1;
      END LOOP;
      
      -- Insert new user
      BEGIN
        INSERT INTO public.users (id, username, email, password_hash, role, created_at, updated_at)
        VALUES (
          auth_user.id,
          new_username,
          auth_user.email,
          '',
          auth_user.role,
          auth_user.created_at,
          auth_user.updated_at
        );
      EXCEPTION
        WHEN unique_violation THEN
          -- If still conflicts, update existing record
          UPDATE public.users 
          SET 
            id = auth_user.id,
            username = new_username,
            role = auth_user.role,
            updated_at = auth_user.updated_at
          WHERE email = auth_user.email;
      END;
    END IF;
    
    existing_user_id := NULL; -- Reset for next iteration
  END LOOP;
END $$;

-- Update RLS policies for users table to work with auth
DROP POLICY IF EXISTS "Authenticated users can read users" ON public.users;
CREATE POLICY "Authenticated users can read users"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "System can insert user profiles" ON public.users;
CREATE POLICY "System can insert user profiles"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.user_activity_logs TO authenticated;
GRANT ALL ON public.operation_logs TO authenticated;