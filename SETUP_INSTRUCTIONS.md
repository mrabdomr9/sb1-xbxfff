# Authentication Setup Instructions

## ⚠️ CRITICAL: Create Admin User in Supabase Dashboard

The authentication error occurs because **no admin user exists** in your Supabase Authentication system. You **MUST** create this user manually through the Supabase Dashboard.

## Step-by-Step Setup Process

### Step 1: Create Admin User (REQUIRED)

1. **Open your Supabase project dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click "Users" tab

3. **Add the admin user**
   - Click "Add user" button
   - **Email**: `admin@activesoft.com`
   - **Password**: `admin123` (or your preferred secure password)
   - **Auto Confirm User**: ✅ Check this box (important!)
   - Click "Create user"

4. **Verify user creation**
   - The user should appear in the users list
   - Status should show as "Confirmed"

### Step 2: Test Login

1. **Go to your app's login page**
   - Navigate to `/admin/login`
   - Use email: `admin@activesoft.com`
   - Use password: `admin123` (or whatever you set)

2. **Successful login should**
   - Redirect you to `/admin` dashboard
   - Create a corresponding record in the `users` table automatically
   - Show no authentication errors

## Troubleshooting Common Issues

### ❌ "Invalid login credentials"
**Cause**: User doesn't exist in Supabase Auth
**Solution**: Follow Step 1 above to create the user

### ❌ "User profile not found"
**Cause**: User exists in Auth but not in users table
**Solution**: The migration should handle this automatically. If not, check:
- Migration `create_auth_user_sync.sql` ran successfully
- RLS policies are properly configured

### ❌ "Access denied" or RLS errors
**Cause**: Row Level Security policies are too restrictive
**Solution**: 
- Check that the migration ran successfully
- Verify RLS policies in Database > Authentication > Policies

### ❌ Login page won't load
**Cause**: Environment variables not configured
**Solution**: Check your `.env` file has:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Verification Checklist

- [ ] Admin user created in Supabase Dashboard Authentication > Users
- [ ] User status shows as "Confirmed"
- [ ] Migration `create_auth_user_sync.sql` ran successfully
- [ ] Environment variables are correctly set
- [ ] Can successfully log in at `/admin/login`
- [ ] User record appears in Database > users table after login

## Security Best Practices

1. **Change default password immediately after first login**
2. **Use a strong password in production**
3. **Enable 2FA if available in your Supabase plan**
4. **Regularly review user access and permissions**

## How the Authentication Works

1. **Supabase Auth** handles password verification and session management
2. **Custom users table** stores additional profile information
3. **Automatic sync** creates user profiles when auth users are created
4. **RLS policies** control data access based on authentication status

## Need Help?

If you're still experiencing issues:

1. Check the browser console for detailed error messages
2. Verify your Supabase project settings and keys
3. Ensure all migrations have run successfully
4. Check that RLS policies are properly configured

The most common issue is simply forgetting to create the admin user in the Supabase Dashboard - make sure you complete Step 1!