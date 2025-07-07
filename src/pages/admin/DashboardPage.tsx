import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAnalytics } from '../../utils/analytics';

interface DashboardStats {
  totalServices: number;
  activeProjects: number;
  happyClients: number;
  newMessages: number;
  totalUsers: number;
  systemStatus: 'online' | 'maintenance' | 'offline';
}

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

interface RecentActivity {
  id: number;
  type: 'contact' | 'download' | 'login' | 'update';
  description: string;
  time: string;
  user?: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminUser, setAdminUser] = useState<any>(null);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    const userData = localStorage.getItem('adminUser');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }

    if (userData) {
      setAdminUser(JSON.parse(userData));
    }
  }, [navigate]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Demo data - in real app would come from API
  const stats: DashboardStats = {
    totalServices: 12,
    activeProjects: 25,
    happyClients: 150,
    newMessages: 8,
    totalUsers: 3,
    systemStatus: 'online'
  };

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'contact',
      description: 'New contact form submission from Saudi Aramco',
      time: '5 minutes ago',
      user: 'System'
    },
    {
      id: 2,
      type: 'download',
      description: 'Oracle ERP brochure downloaded',
      time: '12 minutes ago'
    },
    {
      id: 3,
      type: 'login',
      description: 'Manager user logged in',
      time: '1 hour ago',
      user: 'manager@activesoft.sa'
    },
    {
      id: 4,
      type: 'update',
      description: 'Service portfolio updated',
      time: '2 hours ago',
      user: 'admin@activesoft.sa'
    },
    {
      id: 5,
      type: 'download',
      description: 'Desktop Apps brochure downloaded',
      time: '3 hours ago'
    }
  ];

  const dashboardCards = [
    {
      title: 'Manage Services',
      description: 'Update service offerings and descriptions',
      icon: '🔧',
      link: '/admin/services',
      count: stats.totalServices,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Manage Projects', 
      description: 'Update latest projects showcase',
      icon: '💼',
      link: '/admin/projects',
      count: stats.activeProjects,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Manage Clients',
      description: 'Update client portfolio',
      icon: '🏢',
      link: '/admin/clients',
      count: stats.happyClients,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Contact Messages',
      description: 'View and manage contact submissions',
      icon: '💬',
      link: '/admin/contacts',
      count: stats.newMessages,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Manage Partners',
      description: 'Update partner companies',
      icon: '🤝',
      link: '/admin/partners',
      count: 15,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Manage Users',
      description: 'Add or remove admin users',
      icon: '👥',
      link: '/admin/users',
      count: stats.totalUsers,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Manage Brochures',
      description: 'Update service brochures',
      icon: '📄',
      link: '/admin/brochures',
      count: 6,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Settings',
      description: 'Update your profile and password',
      icon: '⚙️',
      link: '/admin/settings',
      count: null,
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contact': return '📧';
      case 'download': return '📥';
      case 'login': return '👤';
      case 'update': return '✏️';
      default: return '📝';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04968d]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-[#213c4d]">
                Active Soft
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-lg text-gray-600">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">{formatDate(currentTime)}</div>
                <div className="text-lg font-semibold text-[#04968d]">{formatTime(currentTime)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Welcome back,</div>
                <div className="font-semibold text-gray-800">{adminUser.name}</div>
              </div>
              <Link to="/" className="text-gray-600 hover:text-[#04968d] transition-colors">
                🌐 View Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                🔐 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#04968d] to-[#213c4d] text-white rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Welcome to Admin Dashboard, {adminUser.name}! 👋
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  Manage your website content and monitor system performance from here
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      stats.systemStatus === 'online' ? 'bg-green-400' : 
                      stats.systemStatus === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <span className="capitalize">System {stats.systemStatus}</span>
                  </div>
                  <span className="text-sm opacity-75">Last updated: now</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl mb-4">📊</div>
                <div className="text-sm opacity-75">Dashboard v2.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#04968d]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Services</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalServices}</p>
              </div>
              <div className="text-4xl">🔧</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-gray-800">{stats.activeProjects}</p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Happy Clients</p>
                <p className="text-3xl font-bold text-gray-800">{stats.happyClients}+</p>
              </div>
              <div className="text-4xl">😊</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Messages</p>
                <p className="text-3xl font-bold text-gray-800">{stats.newMessages}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#04968d] transition-colors">
                      {card.title}
                    </h3>
                    {card.count !== null && (
                      <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full">
                        {card.count}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  <div className="flex items-center text-[#04968d] text-sm font-medium">
                    <span>Manage</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔔 Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="text-lg">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.user && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <p className="text-xs text-gray-500">{activity.user}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Link
                  to="/admin/contacts"
                  className="text-[#04968d] hover:text-[#037f72] text-sm font-medium flex items-center justify-center"
                >
                  View All Activity
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">🛠️ System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-gray-600">Server Status</div>
              <div className="font-semibold text-green-600">Online</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">💾</div>
              <div className="text-sm text-gray-600">Database</div>
              <div className="font-semibold text-green-600">Connected</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm text-gray-600">Security</div>
              <div className="font-semibold text-green-600">Secure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;