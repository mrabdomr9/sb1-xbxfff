import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AnalyticsData {
  pageViews: {
    page: string;
    views: number;
    uniqueViews: number;
    bounceRate: number;
    avgTimeOnPage: number;
  }[];
  userEngagement: {
    totalUsers: number;
    returningUsers: number;
    newUsers: number;
    avgSessionDuration: number;
    pageviewsPerSession: number;
  };
  conversions: {
    contactFormSubmissions: number;
    roiCalculatorUsage: number;
    knowledgeBaseAccess: number;
    serviceInquiries: number;
  };
  trafficSources: {
    source: string;
    users: number;
    percentage: number;
  }[];
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  geographicData: {
    country: string;
    users: number;
    percentage: number;
  }[];
  oracleMetrics: {
    modulesViewed: {
      module: string;
      views: number;
    }[];
    popularServices: {
      service: string;
      inquiries: number;
    }[];
    roiCalculations: {
      date: string;
      calculations: number;
      avgROI: number;
    }[];
  };
}

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState<'overview' | 'traffic' | 'engagement' | 'oracle'>('overview');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: [
      { page: 'Home', views: 12543, uniqueViews: 8932, bounceRate: 35.2, avgTimeOnPage: 125 },
      { page: 'Oracle ERP Services', views: 8765, uniqueViews: 6543, bounceRate: 28.7, avgTimeOnPage: 198 },
      { page: 'ROI Calculator', views: 5432, uniqueViews: 4321, bounceRate: 15.3, avgTimeOnPage: 342 },
      { page: 'Knowledge Base', views: 4567, uniqueViews: 3456, bounceRate: 22.1, avgTimeOnPage: 267 },
      { page: 'Success Stories', views: 3456, uniqueViews: 2765, bounceRate: 31.5, avgTimeOnPage: 156 },
      { page: 'Contact Us', views: 2987, uniqueViews: 2543, bounceRate: 18.9, avgTimeOnPage: 89 }
    ],
    userEngagement: {
      totalUsers: 15432,
      returningUsers: 4321,
      newUsers: 11111,
      avgSessionDuration: 245,
      pageviewsPerSession: 3.7
    },
    conversions: {
      contactFormSubmissions: 234,
      roiCalculatorUsage: 432,
      knowledgeBaseAccess: 1567,
      serviceInquiries: 187
    },
    trafficSources: [
      { source: 'Direct', users: 5432, percentage: 35.2 },
      { source: 'Google Search', users: 4321, percentage: 28.0 },
      { source: 'LinkedIn', users: 2345, percentage: 15.2 },
      { source: 'Oracle Community', users: 1654, percentage: 10.7 },
      { source: 'Email Marketing', users: 987, percentage: 6.4 },
      { source: 'Other', users: 693, percentage: 4.5 }
    ],
    deviceStats: {
      desktop: 67.8,
      mobile: 24.5,
      tablet: 7.7
    },
    geographicData: [
      { country: 'Egypt', users: 6543, percentage: 42.4 },
      { country: 'Saudi Arabia', users: 3456, percentage: 22.4 },
      { country: 'UAE', users: 2345, percentage: 15.2 },
      { country: 'Kuwait', users: 1234, percentage: 8.0 },
      { country: 'Qatar', users: 987, percentage: 6.4 },
      { country: 'Other', users: 867, percentage: 5.6 }
    ],
    oracleMetrics: {
      modulesViewed: [
        { module: 'Oracle Financials Cloud', views: 3456 },
        { module: 'Oracle HCM Cloud', views: 2345 },
        { module: 'Oracle SCM Cloud', views: 1987 },
        { module: 'Oracle Analytics Cloud', views: 1654 },
        { module: 'Oracle Integration Cloud', views: 1234 }
      ],
      popularServices: [
        { service: 'Oracle ERP Implementation', inquiries: 87 },
        { service: 'Oracle Cloud Migration', inquiries: 65 },
        { service: 'Oracle Training Services', inquiries: 43 },
        { service: 'Oracle Support & Maintenance', inquiries: 32 },
        { service: 'Oracle Consulting', inquiries: 28 }
      ],
      roiCalculations: [
        { date: '2024-01-01', calculations: 45, avgROI: 287.5 },
        { date: '2024-01-02', calculations: 52, avgROI: 312.8 },
        { date: '2024-01-03', calculations: 38, avgROI: 298.2 },
        { date: '2024-01-04', calculations: 61, avgROI: 334.7 },
        { date: '2024-01-05', calculations: 47, avgROI: 301.9 }
      ]
    }
  });

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }

    // Load analytics data from localStorage
    const savedAnalytics = localStorage.getItem('analytics_events');
    if (savedAnalytics) {
      try {
        const events = JSON.parse(savedAnalytics);
        // Process events to generate analytics data
        processAnalyticsEvents(events);
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      }
    }
  }, [navigate]);

  const processAnalyticsEvents = (events: any[]) => {
    // Process raw events into analytics data
    // This would normally be done by a proper analytics service
    console.log('Processing analytics events:', events.length);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getGrowthColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (value: number) => {
    return value >= 0 ? '📈' : '📉';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">📊</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
                <p className="text-gray-600">Track performance and user engagement</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Date Range Selector */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              {/* Export Button */}
              <button className="bg-[#04968d] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
                <span>📋</span>
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Metric Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'traffic', label: 'Traffic Sources', icon: '🌐' },
                { id: 'engagement', label: 'User Engagement', icon: '👥' },
                { id: 'oracle', label: 'Oracle Metrics', icon: '🏛️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMetric(tab.id as any)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                    activeMetric === tab.id
                      ? 'border-[#04968d] text-[#04968d]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeMetric === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600">Total Users</div>
                  <span className="text-2xl">👥</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {formatNumber(analyticsData.userEngagement.totalUsers)}
                </div>
                <div className="flex items-center text-sm">
                  <span className={`${getGrowthColor(12.5)} mr-1`}>
                    {getGrowthIcon(12.5)} +12.5%
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600">Page Views</div>
                  <span className="text-2xl">📄</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {formatNumber(analyticsData.pageViews.reduce((sum, page) => sum + page.views, 0))}
                </div>
                <div className="flex items-center text-sm">
                  <span className={`${getGrowthColor(8.3)} mr-1`}>
                    {getGrowthIcon(8.3)} +8.3%
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600">Conversions</div>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {analyticsData.conversions.contactFormSubmissions}
                </div>
                <div className="flex items-center text-sm">
                  <span className={`${getGrowthColor(15.7)} mr-1`}>
                    {getGrowthIcon(15.7)} +15.7%
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600">Avg Session</div>
                  <span className="text-2xl">⏱️</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {formatDuration(analyticsData.userEngagement.avgSessionDuration)}
                </div>
                <div className="flex items-center text-sm">
                  <span className={`${getGrowthColor(5.2)} mr-1`}>
                    {getGrowthIcon(5.2)} +5.2%
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>
            </div>

            {/* Page Performance */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Page Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Page</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Views</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Unique Views</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Bounce Rate</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.pageViews.map((page, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-800">{page.page}</td>
                        <td className="py-3 px-4 text-right">{formatNumber(page.views)}</td>
                        <td className="py-3 px-4 text-right">{formatNumber(page.uniqueViews)}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            page.bounceRate < 30 ? 'bg-green-100 text-green-800' :
                            page.bounceRate < 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {page.bounceRate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">{formatDuration(page.avgTimeOnPage)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Device and Geographic Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Device Stats */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Device Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(analyticsData.deviceStats).map(([device, percentage]) => (
                    <div key={device} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {device === 'desktop' ? '🖥️' : device === 'mobile' ? '📱' : '📱'}
                        </span>
                        <span className="font-medium text-gray-800 capitalize">{device}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#04968d] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-12 text-right">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Data */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Top Countries</h3>
                <div className="space-y-4">
                  {analyticsData.geographicData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🌍</span>
                        <span className="font-medium text-gray-800">{country.country}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">{formatNumber(country.users)}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-12 text-right">
                          {country.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Traffic Sources Tab */}
        {activeMetric === 'traffic' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Traffic Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{source.source}</h4>
                      <span className="text-2xl">
                        {source.source === 'Direct' ? '🔗' :
                         source.source === 'Google Search' ? '🔍' :
                         source.source === 'LinkedIn' ? '💼' :
                         source.source === 'Oracle Community' ? '🏛️' :
                         source.source === 'Email Marketing' ? '📧' : '🌐'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">
                      {formatNumber(source.users)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-[#04968d] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {source.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Engagement Tab */}
        {activeMetric === 'engagement' && (
          <div className="space-y-8">
            {/* Engagement Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600">New vs Returning</div>
                  <span className="text-2xl">👤</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">New Users</span>
                    <span className="font-semibold">{formatNumber(analyticsData.userEngagement.newUsers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Returning Users</span>
                    <span className="font-semibold">{formatNumber(analyticsData.userEngagement.returningUsers)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600">Session Quality</div>
                  <span className="text-2xl">📊</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Avg Duration</span>
                    <span className="font-semibold">{formatDuration(analyticsData.userEngagement.avgSessionDuration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Pages/Session</span>
                    <span className="font-semibold">{analyticsData.userEngagement.pageviewsPerSession.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-600">Conversions</div>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Contact Forms</span>
                    <span className="font-semibold">{analyticsData.conversions.contactFormSubmissions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">ROI Calculator</span>
                    <span className="font-semibold">{analyticsData.conversions.roiCalculatorUsage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Conversion Funnel</h3>
              <div className="space-y-4">
                {[
                  { step: 'Website Visitors', count: analyticsData.userEngagement.totalUsers, percentage: 100 },
                  { step: 'Service Page Views', count: 8765, percentage: 56.8 },
                  { step: 'ROI Calculator Usage', count: analyticsData.conversions.roiCalculatorUsage, percentage: 2.8 },
                  { step: 'Contact Form Submissions', count: analyticsData.conversions.contactFormSubmissions, percentage: 1.5 },
                  { step: 'Service Inquiries', count: analyticsData.conversions.serviceInquiries, percentage: 1.2 }
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-32 text-sm font-medium text-gray-700">{step.step}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{formatNumber(step.count)} users</span>
                        <span className="text-sm font-medium">{step.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-[#04968d] to-[#037f72] h-3 rounded-full transition-all duration-500"
                          style={{ width: `${step.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Oracle Metrics Tab */}
        {activeMetric === 'oracle' && (
          <div className="space-y-8">
            {/* Oracle Module Performance */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Oracle Module Interest</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analyticsData.oracleMetrics.modulesViewed.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">{module.module}</h4>
                      <span className="text-lg">🏛️</span>
                    </div>
                    <div className="text-2xl font-bold text-[#04968d] mb-1">
                      {formatNumber(module.views)}
                    </div>
                    <div className="text-xs text-gray-600">views</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Inquiries */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Oracle Services</h3>
              <div className="space-y-4">
                {analyticsData.oracleMetrics.popularServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-[#04968d] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-800">{service.service}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-[#04968d]">{service.inquiries}</span>
                      <span className="text-sm text-gray-600">inquiries</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Calculator Analytics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">ROI Calculator Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {analyticsData.conversions.roiCalculatorUsage}
                  </div>
                  <div className="text-sm text-gray-600">Total Calculations</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {analyticsData.oracleMetrics.roiCalculations.reduce((sum, day) => sum + day.avgROI, 0) / analyticsData.oracleMetrics.roiCalculations.length}%
                  </div>
                  <div className="text-sm text-gray-600">Average ROI</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {Math.round((analyticsData.conversions.contactFormSubmissions / analyticsData.conversions.roiCalculatorUsage) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;