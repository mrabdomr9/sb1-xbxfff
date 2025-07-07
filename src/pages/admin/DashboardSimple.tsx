import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface DashboardStats {
  totalServices: number;
  totalProjects: number;
  totalContacts: number;
  recentActivity: {
    type: string;
    message: string;
    time: string;
  }[];
}

const DashboardSimple = () => {
  const navigate = useNavigate();
  const { t, language, isRTL } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 12,
    totalProjects: 25,
    totalContacts: 120,
    recentActivity: [
      { type: 'contact', message: 'New contact form submission', time: '2 hours ago' },
      { type: 'project', message: 'Oracle project updated', time: '4 hours ago' },
      { type: 'portfolio', message: 'New portfolio item added', time: '1 day ago' },
      { type: 'service', message: 'Service updated', time: '2 days ago' }
    ]
  });

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }

    // Load stats from localStorage
    const savedServices = JSON.parse(localStorage.getItem('services') || '[]');
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const savedContacts = JSON.parse(localStorage.getItem('contact_submissions') || '[]');

    setStats(prev => ({
      ...prev,
      totalServices: savedServices.length,
      totalProjects: savedProjects.length,
      totalContacts: savedContacts.length
    }));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const quickActions = [
    {
      title: language === 'ar' ? 'إدارة الخدمات' : 'Manage Services',
      description: language === 'ar' ? 'إضافة وتعديل خدمات Oracle' : 'Add and edit Oracle services',
      icon: '🔧',
      color: 'from-blue-500 to-blue-600',
      link: '/admin/services',
      count: stats.totalServices
    },

    {
      title: language === 'ar' ? 'أعمالنا السابقة' : 'Portfolio Management',
      description: language === 'ar' ? 'إدارة الأعمال والمشاريع السابقة' : 'Manage portfolio and past projects',
      icon: '💼',
      color: 'from-purple-500 to-purple-600',
      link: '/admin/portfolio',
      count: JSON.parse(localStorage.getItem('portfolio_items') || '[]').length
    },
    {
      title: language === 'ar' ? 'إدارة المشاريع' : 'Manage Projects',
      description: language === 'ar' ? 'تتبع مشاريع Oracle' : 'Track Oracle projects',
      icon: '📊',
      color: 'from-cyan-500 to-cyan-600',
      link: '/admin/projects',
      count: stats.totalProjects
    },
    {
      title: language === 'ar' ? 'رسائل التواصل' : 'Contact Messages',
      description: language === 'ar' ? 'رسائل العملاء والاستفسارات' : 'Client messages and inquiries',
      icon: '📞',
      color: 'from-orange-500 to-orange-600',
      link: '/admin/contacts',
      count: stats.totalContacts
    },
    {
      title: language === 'ar' ? 'التحليلات' : 'Analytics',
      description: language === 'ar' ? 'إحصائيات الموقع' : 'Website analytics',
      icon: '📈',
      color: 'from-indigo-500 to-indigo-600',
      link: '/admin/analytics',
      count: 'Live'
    },
    {
      title: language === 'ar' ? 'إدارة المحتوى' : 'Content Management',
      description: language === 'ar' ? 'إدارة محتوى صفحات الموقع' : 'Manage website content',
      icon: '📝',
      color: 'from-pink-500 to-pink-600',
      link: '/admin/content',
      count: JSON.parse(localStorage.getItem('content_sections') || '[]').length
    },
    {
      title: language === 'ar' ? 'الإعدادات' : 'Settings',
      description: language === 'ar' ? 'إعدادات الشركة' : 'Company settings',
      icon: '⚙️',
      color: 'from-gray-500 to-gray-600',
      link: '/admin/settings',
      count: 'Config'
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <span className="text-3xl">📊</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}
                </h1>
                <p className="text-gray-600">
                  {language === 'ar' ? 'إدارة موقع Active Soft Oracle ERP' : 'Manage Active Soft Oracle ERP'}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Link 
                to="/"
                className="text-gray-600 hover:text-[#04968d] transition-colors"
              >
                {language === 'ar' ? 'عرض الموقع' : 'View Site'}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'إجمالي الخدمات' : 'Total Services'}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalServices}</p>
              </div>
              <span className="text-4xl">🔧</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalClients}</p>
              </div>
              <span className="text-4xl">🏢</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'إجمالي المشاريع' : 'Total Projects'}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalProjects}</p>
              </div>
              <span className="text-4xl">📊</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <p className="text-gray-600 text-sm">
                  {language === 'ar' ? 'إجمالي الرسائل' : 'Total Messages'}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalContacts}</p>
              </div>
              <span className="text-4xl">📞</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`group relative bg-gradient-to-r ${action.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden`}
            >
              <div className="p-6">
                <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-4xl">{action.icon}</span>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    {action.count}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {action.title}
                </h3>
                <p className={`text-white/90 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                  {action.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 group-hover:bg-white/50 transition-colors"></div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className={`text-xl font-bold text-gray-800 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
          </h3>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="p-2 bg-[#04968d] text-white rounded-lg">
                  <span className="text-lg">
                    {activity.type === 'contact' ? '📧' :
                     activity.type === 'project' ? '📊' :
                     activity.type === 'client' ? '🏢' : '🔧'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 
                      (activity.type === 'contact' ? 'رسالة تواصل جديدة' :
                       activity.type === 'project' ? 'تم تحديث مشروع Oracle' :
                       activity.type === 'client' ? 'تم إضافة قصة نجاح جديدة' : 'تم تحديث خدمة') :
                      activity.message
                    }
                  </p>
                  <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSimple;