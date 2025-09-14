#!/usr/bin/env node

/**
 * Authentication Setup Script
 * 
 * This script provides guidance for setting up authentication in the Active Soft dashboard.
 * It doesn't automatically create users in Supabase, but provides clear instructions.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== Active Soft Authentication Setup ===\n');

// Check if .env file exists
const envPath = path.join(__dirname, '../../.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Please create a .env file in the project root with your Supabase credentials:\n');
  console.log('VITE_SUPABASE_URL=your_supabase_project_url');
  console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key\n');
} else {
  console.log('✅ .env file found');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('VITE_SUPABASE_URL') && envContent.includes('VITE_SUPABASE_ANON_KEY')) {
    console.log('✅ Supabase credentials found in .env file\n');
  } else {
    console.log('⚠️  Supabase credentials not found in .env file');
    console.log('Please add the following to your .env file:\n');
    console.log('VITE_SUPABASE_URL=your_supabase_project_url');
    console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key\n');
  }
}

console.log('=== Next Steps ===\n');

console.log('1. Create Admin User in Supabase Dashboard:');
console.log('   - Go to https://supabase.com/dashboard');
console.log('   - Select your project');
console.log('   - Navigate to Authentication → Users');
console.log('   - Click "Add user"');
console.log('   - Enter Email: admin@activesoft.com');
console.log('   - Enter Password: admin123');
console.log('   - Check "Auto Confirm User"');
console.log('   - Click "Create user"\n');

console.log('2. Test Login:');
console.log('   - Return to your application');
console.log('   - Go to /admin/login');
console.log('   - Use the credentials you just created\n');

console.log('For detailed instructions, see SETUP_INSTRUCTIONS.md or src/docs/AUTHENTICATION_FIX.md');