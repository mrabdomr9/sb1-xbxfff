import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAnalytics, trackPageView } from '../../utils/analytics';

interface AnalyticsData {
  summary: {
    totalEvents: number;
    uniqueSessions: number;
    pageViews: number;
    contactSubmissions: number;
    serviceViews: number;
    downloads: number;
  };
  popularPages: [string, number][];
  popularServices: [string, number][];
  dailyActivity: [string, number][];
  recentContactSubmissions: any[];
  recentDownloads: any[];
}

const DashboardEnhanced = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30); // days

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    
    // Track page view
    trackPageView('admin_dashboard', {
      title: 'Admin Dashboard - Oracle ERP Management',
      section: 'administration'
    });

    loadAnalytics();
  }, [navigate, timeRange]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      const analyticsData = getAnalytics(timeRange);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Get system data
  const getSystemStats = () => {
    const services = JSON.parse(localStorage.getItem('oracleServices') || '[]');
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    
    return {
      totalServices: services.length,
      activeServices: services.filter((s: any) => s.isActive).length,
      totalSubmissions: submissions.length,
      newSubmissions: submissions.filter((s: any) => s.status === 'new').length,
      systemUptime: '99.9%',
      lastBackup: new Date().toLocaleDateString()
    };
  };

  const systemStats = getSystemStats();

  const quickActions = [
    {
      title: 'Oracle Services',
      description: 'Manage ERP services and offerings',
      icon: '🔧',
      color: 'from-blue-500 to-blue-600',
      link: '/admin/services',
      count: systemStats.activeServices
    },
    {
      title: 'Contact Submissions',
      description: 'Review customer inquiries',
      icon: '💬',
      color: 'from-green-500 to-green-600',
      link: '/admin/contact-submissions',
      count: systemStats.newSubmissions,
      urgent: systemStats.newSubmissions > 0
    },
    {
      title: 'Oracle Projects',
      description: 'Track Oracle implementations',
      icon: '📊',
      color: 'from-purple-500 to-purple-600',
      link: '/admin/oracle-projects',
      count: '12+'
    },
    {
      title: 'Oracle Modules',
      description: 'Manage Oracle Cloud modules',
      icon: '☁️',
      color: 'from-indigo-500 to-indigo-600',
      link: '/admin/oracle-modules',
      count: '25+'
    },
    {
      title: 'Performance Monitor',
      description: 'Oracle system monitoring',
      icon: '📊',
      color: 'from-cyan-500 to-cyan-600',
      link: '/admin/oracle-performance',
      count: 'Live'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View detailed analytics',
      icon: '📈',
      color: 'from-purple-500 to-purple-600',
      link: '/admin/analytics',
      count: 'Live'
    },
    {
      title: 'Company Settings',
      description: 'Configure company info',
      icon: '⚙️',
      color: 'from-gray-500 to-gray-600',
      link: '/admin/settings',
      count: 'Config'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Oracle ERP Admin</h1>
                <p className="text-gray-600">Enterprise Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Time Display */}
              <div className="hidden md:flex flex-col items-end">
                <div className="text-lg font-bold text-gray-800">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-sm text-gray-500">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-800">Admin User</span>
                  <span className="text-xs text-gray-500">Oracle ERP Manager</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <span className="mr-2">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#213c4d] to-[#04968d] text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Oracle ERP Dashboard</h2>
              <p className="text-lg opacity-90">
                Manage your enterprise Oracle solutions and monitor business performance
              </p>
            </div>
            <div className="hidden lg:block text-6xl opacity-20">
              🏆
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{systemStats.totalServices}</div>
              <div className="text-sm opacity-80">Oracle Services</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{systemStats.totalSubmissions}</div>
              <div className="text-sm opacity-80">Total Inquiries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
              <div className="text-sm opacity-80">System Uptime</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support Available</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className={`bg-gradient-to-r ${action.color} p-6 text-white relative`}>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{action.icon}</span>
                  {action.urgent && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      URGENT
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
                {action.count && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-sm font-bold">{action.count}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t group-hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-600 group-hover:text-[#04968d] font-medium">
                  Manage →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Admin Quick Navigation */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[
              { path: '/admin/analytics', label: 'Analytics', icon: '📈', color: 'from-purple-500 to-purple-600' },
              { path: '/admin/oracle-performance', label: 'Performance', icon: '📊', color: 'from-cyan-500 to-cyan-600' },
              { path: '/admin/oracle-modules', label: 'Oracle Modules', icon: '🏛️', color: 'from-indigo-500 to-indigo-600' },
              { path: '/admin/oracle-projects', label: 'Oracle Projects', icon: '📋', color: 'from-blue-500 to-blue-600' },
              { path: '/admin/services', label: 'Services', icon: '🔧', color: 'from-green-500 to-green-600' },
              { path: '/admin/clients', label: 'Clients', icon: '🏢', color: 'from-orange-500 to-orange-600' },
              { path: '/admin/partners', label: 'Partners', icon: '🤝', color: 'from-pink-500 to-pink-600' },
              { path: '/admin/projects', label: 'Projects', icon: '📁', color: 'from-teal-500 to-teal-600' },
              { path: '/admin/users', label: 'Users', icon: '👥', color: 'from-red-500 to-red-600' },
              { path: '/admin/contacts', label: 'Contacts', icon: '📞', color: 'from-yellow-500 to-yellow-600' },
              { path: '/admin/brochures', label: 'Brochures', icon: '📄', color: 'from-lime-500 to-lime-600' },
              { path: '/admin/settings', label: 'Settings', icon: '⚙️', color: 'from-gray-500 to-gray-600' }
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center p-4 bg-gradient-to-r ${item.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 group transform hover:scale-105`}
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-sm font-medium text-center">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Analytics Overview */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Website Analytics</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                >
                  <option value={7}>Last 7 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={90}>Last 90 days</option>
                </select>
              </div>
            </div>

            {analyticsLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04968d] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading analytics...</p>
                </div>
              </div>
            ) : analytics ? (
              <div>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analytics.summary.pageViews}</div>
                    <div className="text-sm text-gray-600">Page Views</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analytics.summary.uniqueSessions}</div>
                    <div className="text-sm text-gray-600">Unique Visitors</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{analytics.summary.contactSubmissions}</div>
                    <div className="text-sm text-gray-600">Inquiries</div>
                  </div>
                </div>

                {/* Popular Pages */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Popular Pages</h4>
                  <div className="space-y-2">
                    {analytics.popularPages.slice(0, 5).map(([page, count], index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-gray-700 capitalize">{page}</span>
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-200 rounded-full h-2 w-24">
                            <div 
                              className="bg-[#04968d] h-2 rounded-full"
                              style={{ 
                                width: `${Math.min((count / (analytics.popularPages[0]?.[1] || 1)) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600 w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Activity Chart */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Daily Activity</h4>
                  <div className="flex items-end space-x-1 h-24">
                    {analytics.dailyActivity.slice(-14).map(([date, count], index) => {
                      const maxCount = Math.max(...analytics.dailyActivity.map(([,c]) => c));
                      const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="bg-[#04968d] rounded-t w-full transition-all duration-300"
                            style={{ height: `${height}%`, minHeight: '2px' }}
                            title={`${date}: ${count} events`}
                          ></div>
                          <div className="text-xs text-gray-500 mt-1 transform rotate-45 origin-left">
                            {new Date(date).getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No analytics data available
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            
            {analytics?.recentContactSubmissions && analytics.recentContactSubmissions.length > 0 ? (
              <div className="space-y-4">
                {analytics.recentContactSubmissions.slice(0, 5).map((submission, index) => (
                  <div key={index} className="border-l-4 border-[#04968d] pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-800">New Contact Submission</p>
                        <p className="text-sm text-gray-600">{submission.data?.service || 'General Inquiry'}</p>
                        <p className="text-xs text-gray-500">{new Date(submission.timestamp).toLocaleString()}</p>
                      </div>
                      <span className="text-lg">📧</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">📊</div>
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-gray-800">Oracle Services</p>
                <p className="text-sm text-green-600">All systems operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-gray-800">Database</p>
                <p className="text-sm text-green-600">Connected & synchronized</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-gray-800">Email Service</p>
                <p className="text-sm text-green-600">Notifications active</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-gray-800">Backup System</p>
                <p className="text-sm text-green-600">Last backup: {systemStats.lastBackup}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEnhanced;