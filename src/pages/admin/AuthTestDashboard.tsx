import React, { useState, useEffect } from 'react';
import { 
  User, 
  UserPlus, 
  Edit, 
  Database, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Loader2,
  Key,
  Mail,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../../hooks/useDatabaseIntegration';
import { supabase } from '../../lib/database/config';

interface TestResult {
  operation: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
  timestamp: Date;
  data?: any;
}

const AuthTestDashboard = () => {
  const { user, session, loading, signIn, signOut } = useAuth();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');

  // Test credentials
  const [testEmail, setTestEmail] = useState('test@activesoft.com');
  const [testPassword, setTestPassword] = useState('testpassword123');
  const [testUsername, setTestUsername] = useState('testuser');

  const addTestResult = (operation: string, status: TestResult['status'], message: string, data?: any) => {
    setTestResults(prev => [...prev, {
      operation,
      status,
      message,
      timestamp: new Date(),
      data
    }]);
  };

  // Test 1: Check current authentication status
  const testCurrentAuth = async () => {
    setCurrentTest('Checking current authentication status...');
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        addTestResult('Current Auth Check', 'error', `Session error: ${error.message}`);
        return;
      }

      if (session) {
        addTestResult('Current Auth Check', 'success', `User authenticated: ${session.user.email}`, {
          userId: session.user.id,
          email: session.user.email,
          role: session.user.user_metadata?.role || 'admin'
        });
      } else {
        addTestResult('Current Auth Check', 'warning', 'No active session found');
      }
    } catch (error) {
      addTestResult('Current Auth Check', 'error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test 2: Check users table structure and data
  const testUsersTable = async () => {
    setCurrentTest('Checking users table...');
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(10);

      if (error) {
        addTestResult('Users Table Check', 'error', `Database error: ${error.message}`);
        return;
      }

      addTestResult('Users Table Check', 'success', `Found ${data?.length || 0} users in database`, data);
    } catch (error) {
      addTestResult('Users Table Check', 'error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test 3: Test sign up (create new user)
  const testSignUp = async () => {
    setCurrentTest('Testing user sign up...');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            username: testUsername,
            role: 'admin'
          }
        }
      });

      if (error) {
        addTestResult('Sign Up Test', 'error', `Sign up failed: ${error.message}`);
        return;
      }

      if (data.user) {
        addTestResult('Sign Up Test', 'success', `User created successfully: ${data.user.email}`, {
          userId: data.user.id,
          email: data.user.email,
          needsConfirmation: !data.user.email_confirmed_at
        });

        // Check if user was created in users table
        setTimeout(async () => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user!.id)
            .single();

          if (userError) {
            addTestResult('User Profile Sync', 'warning', `User profile not found in database: ${userError.message}`);
          } else {
            addTestResult('User Profile Sync', 'success', 'User profile created in database', userData);
          }
        }, 2000);
      }
    } catch (error) {
      addTestResult('Sign Up Test', 'error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test 4: Test sign in
  const testSignIn = async () => {
    setCurrentTest('Testing user sign in...');
    
    try {
      const result = await signIn(testEmail, testPassword);
      
      if (result.error) {
        addTestResult('Sign In Test', 'error', `Sign in failed: ${result.error}`);
        return;
      }

      if (result.user) {
        addTestResult('Sign In Test', 'success', `Sign in successful: ${result.user.email}`, result.user);
      }
    } catch (error) {
      addTestResult('Sign In Test', 'error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test 5: Test user data update
  const testUpdateUser = async () => {
    setCurrentTest('Testing user data update...');
    
    if (!user) {
      addTestResult('Update User Test', 'warning', 'No authenticated user to update');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          username: `${testUsername}_updated`,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        addTestResult('Update User Test', 'error', `Update failed: ${error.message}`);
        return;
      }

      addTestResult('Update User Test', 'success', 'User data updated successfully', data);
    } catch (error) {
      addTestResult('Update User Test', 'error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test 6: Test RLS policies
  const testRLSPolicies = async () => {
    setCurrentTest('Testing Row Level Security policies...');
    
    try {
      // Test reading users table
      const { data: readData, error: readError } = await supabase
        .from('users')
        .select('id, username, email, role')
        .limit(5);

      if (readError) {
        addTestResult('RLS Read Test', 'error', `Read access denied: ${readError.message}`);
      } else {
        addTestResult('RLS Read Test', 'success', `Read access granted, found ${readData?.length || 0} users`);
      }

      // Test writing to users table (should only work for own record)
      if (user) {
        const { error: writeError } = await supabase
          .from('users')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', user.id);

        if (writeError) {
          addTestResult('RLS Write Test', 'error', `Write access denied: ${writeError.message}`);
        } else {
          addTestResult('RLS Write Test', 'success', 'Write access granted for own record');
        }
      }
    } catch (error) {
      addTestResult('RLS Policies Test', 'error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test 7: Test admin user creation
  const testAdminUserExists = async () => {
    setCurrentTest('Checking admin user...');
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'admin@activesoft.com')
        .single();

      if (error && error.code === 'PGRST116') {
        addTestResult('Admin User Check', 'warning', 'Admin user not found in database. Please create admin@activesoft.com in Supabase Dashboard.');
        return;
      }

      if (error) {
        addTestResult('Admin User Check', 'error', `Database error: ${error.message}`);
        return;
      }

      addTestResult('Admin User Check', 'success', 'Admin user found in database', {
        username: data.username,
        email: data.email,
        role: data.role,
        created_at: data.created_at
      });
    } catch (error) {
      addTestResult('Admin User Check', 'error', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    await testCurrentAuth();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testUsersTable();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testAdminUserExists();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testRLSPolicies();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Only test sign up if not already authenticated
    if (!user) {
      await testSignUp();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await testSignIn();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    await testUpdateUser();
    
    setCurrentTest('');
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Authentication & Database Testing</h1>
        <p className="text-gray-600 mb-6">
          Comprehensive testing of authentication system and user database operations
        </p>

        {/* Current Auth Status */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Shield className="w-6 h-6 text-[#04968d] mr-2" />
              Current Authentication Status
            </h2>
            {loading && <Loader2 className="w-5 h-5 animate-spin text-[#04968d]" />}
          </div>
          
          {user ? (
            <div className="space-y-2">
              <p className="text-green-600 font-medium">✓ Authenticated</p>
              <div className="text-sm text-gray-600">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>User ID:</strong> {user.id}</p>
              </div>
              <button
                onClick={signOut}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-red-600 font-medium">✗ Not Authenticated</p>
              <p className="text-sm text-gray-600">Please run tests or sign in manually</p>
            </div>
          )}
        </div>

        {/* Test Configuration */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="w-6 h-6 text-[#04968d] mr-2" />
            Test Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Email</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Password</label>
              <input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Username</label>
              <input
                type="text"
                value={testUsername}
                onChange={(e) => setTestUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04968d] focus:border-[#04968d]"
              />
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Test Controls</h2>
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-[#04968d] text-white px-6 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50 flex items-center space-x-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Running Tests...</span>
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  <span>Run All Authentication Tests</span>
                </>
              )}
            </button>
          </div>

          {isRunning && currentTest && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-blue-700 font-medium">{currentTest}</p>
            </div>
          )}
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(result.status)}
                <h3 className="font-semibold">{result.operation}</h3>
              </div>
              <span className="text-xs text-gray-500">
                {result.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm mb-2">{result.message}</p>
            {result.data && (
              <details className="text-xs">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                  View Data
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}

        {testResults.length === 0 && !isRunning && (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tests Run Yet</h3>
            <p className="text-gray-500 mb-6">Click "Run All Authentication Tests" to start testing</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Setup Instructions</h3>
        <div className="text-blue-700 space-y-2">
          <p><strong>1. Create Admin User:</strong> Go to Supabase Dashboard → Authentication → Users → Add User</p>
          <p><strong>2. Use Email:</strong> admin@activesoft.com</p>
          <p><strong>3. Set Password:</strong> admin123 (or your preferred password)</p>
          <p><strong>4. Check "Auto Confirm User"</strong> to skip email confirmation</p>
          <p><strong>5. Run Tests:</strong> Click the "Run All Authentication Tests" button above</p>
        </div>
      </div>
    </div>
  );
};

export default AuthTestDashboard;