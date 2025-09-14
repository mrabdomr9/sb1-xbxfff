# How to Fix the Login Issue

## Problem Description

The login issue occurs because the application requires an admin user to be created in the Supabase Authentication system before you can log in. This is a security measure to ensure only authorized users can access the admin dashboard.

## Solution Steps

### Step 1: Create Admin User in Supabase Dashboard

1. **Access your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Sign in with your account
   - Select your project

2. **Navigate to Authentication Section**
   - Click on "Authentication" in the left sidebar
   - Click on the "Users" tab

3. **Add a New User**
   - Click the "Add user" button
   - Fill in the following details:
     - **Email**: `admin@activesoft.com`
     - **Password**: `admin123` (or any secure password of your choice)
     - **Auto Confirm User**: Check this box (important!)
   - Click "Create user"

4. **Verify User Creation**
   - The user should appear in the users list
   - The status should show as "Confirmed"

### Step 2: Test the Login

1. **Return to your application**
   - Go to the login page (usually `/admin/login`)
   - Enter the credentials you just created:
     - **Email**: `admin@activesoft.com`
     - **Password**: `admin123` (or whatever you set)

2. **Successful Login**
   - You should be redirected to the admin dashboard
   - A corresponding record will be automatically created in the `users` table

## Common Issues and Solutions

### Issue: "Invalid login credentials" Error

**Cause**: The admin user doesn't exist in Supabase Authentication

**Solution**: 
- Follow Step 1 above to create the admin user
- Make sure to check "Auto Confirm User" when creating the user

### Issue: "Email not confirmed" Error

**Cause**: The user account exists but hasn't been confirmed

**Solution**:
- When creating the user in Supabase, make sure to check "Auto Confirm User"
- Or manually confirm the user in the Supabase Dashboard

### Issue: Password Requirements

**Note**: The login form requires a minimum of 6 characters for the password. If you're using a different password than the default `admin123`, make sure it meets this requirement.

## Technical Details

### How Authentication Works

1. **Supabase Auth** handles the actual authentication (password verification, session management)
2. **Custom users table** stores additional profile information
3. **Automatic sync** creates user profiles in the public.users table when auth users are created
4. **Row Level Security (RLS)** controls data access based on authentication status

### Files Modified to Improve User Experience

1. **src/validations/authValidation.ts**
   - Reduced minimum password length from 8 to 6 characters to accommodate the default password

2. **src/lib/database/auth.ts**
   - Enhanced error messages to guide users to create the admin user in Supabase

3. **src/components/auth/LoginForm.tsx**
   - Added helpful error messages and setup instructions directly in the UI

## Security Best Practices

1. **Change the default password** immediately after first login
2. **Use a strong, unique password** in production environments
3. **Enable Two-Factor Authentication (2FA)** if available in your Supabase plan
4. **Regularly review user access** and permissions

## Verification Checklist

Before reporting issues, please verify:

- [ ] Admin user created in Supabase Dashboard Authentication > Users
- [ ] User status shows as "Confirmed"
- [ ] Environment variables are correctly set in `.env` file:
  ```
  VITE_SUPABASE_URL=your_supabase_project_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```
- [ ] All database migrations have run successfully
- [ ] RLS policies are properly configured

## Need Further Assistance?

If you're still experiencing issues:

1. **Check browser console** for detailed error messages
2. **Verify Supabase project settings** and credentials
3. **Ensure all migrations** have run successfully
4. **Check RLS policies** in Database > Authentication > Policies

The most common cause of login issues is simply forgetting to create the admin user in the Supabase Dashboard. Make sure you complete Step 1!