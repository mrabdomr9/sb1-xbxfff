import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminLoginPage = () => {
  const { t, isRTL } = useLanguage();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simple demo authentication
    if (credentials.email === 'admin@activesoft.sa' && credentials.password === 'admin123') {
      // Success
      setTimeout(() => {
        setIsSubmitting(false);
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          email: credentials.email,
          name: 'Admin User',
          role: 'Administrator'
        }));
        navigate('/admin/dashboard');
      }, 1500);
    } else {
      // Error
      setTimeout(() => {
        setIsSubmitting(false);
        setError('Invalid email or password. Please check your credentials and try again.');
      }, 1500);
    }
  };

  const demoCredentials = [
    { email: 'admin@activesoft.sa', password: 'admin123', role: 'Administrator' },
    { email: 'manager@activesoft.sa', password: 'manager123', role: 'Manager' },
    { email: 'editor@activesoft.sa', password: 'editor123', role: 'Content Editor' }
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setCredentials({ email, password });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#213c4d] via-[#2a4a5d] to-[#04968d] flex items-center justify-center py-12 px-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#04968d]/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-200">Access the administration dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-400/50 text-red-100 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <span className="text-lg mr-2">⚠️</span>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                📧 Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent placeholder-gray-300 text-white backdrop-blur-sm"
                placeholder="admin@activesoft.sa"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent placeholder-gray-300 text-white backdrop-blur-sm pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#04968d] text-white py-4 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Sign In</span>
                  <span className="ml-2">🔓</span>
                </div>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-blue-100 mb-3 flex items-center">
              <span className="mr-2">🎯</span>
              Demo Credentials:
            </h3>
            <div className="space-y-2">
              {demoCredentials.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoCredentials(demo.email, demo.password)}
                  className="w-full text-left p-2 bg-white/10 hover:bg-white/20 rounded text-sm text-blue-100 hover:text-white transition-colors"
                >
                  <div className="font-medium">{demo.role}</div>
                  <div className="text-xs opacity-75">{demo.email}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Forgot your password? 🤔
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-sm">
            © 2024 Active Soft. All rights reserved.
          </p>
          <div className="mt-2">
            <a
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center"
            >
              <span className="mr-1">🌐</span>
              Back to main website
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-amber-500/20 border border-amber-400/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-start">
            <span className="text-amber-200 mr-2">🛡️</span>
            <div className="text-sm text-amber-100">
              <div className="font-medium mb-1">Security Notice:</div>
              <div className="text-xs opacity-90">
                This is a demo environment. In production, use strong passwords and enable two-factor authentication.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;