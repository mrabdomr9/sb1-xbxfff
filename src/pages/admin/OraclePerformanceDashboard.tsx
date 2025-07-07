import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface SystemHealth {
  module: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  lastChecked: string;
}

interface UsageStatistics {
  module: string;
  dailyUsers: number;
  transactions: number;
  dataVolume: number;
  peakHours: string[];
}

const OraclePerformanceDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'health' | 'usage'>('overview');
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Performance metrics data
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    {
      id: 'response-time',
      name: 'Average Response Time',
      value: 2.3,
      unit: 'seconds',
      target: 3.0,
      status: 'good',
      trend: 'stable',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'throughput',
      name: 'Transaction Throughput',
      value: 1250,
      unit: 'TPS',
      target: 1000,
      status: 'excellent',
      trend: 'up',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'cpu-usage',
      name: 'CPU Utilization',
      value: 65,
      unit: '%',
      target: 80,
      status: 'good',
      trend: 'stable',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'memory-usage',
      name: 'Memory Usage',
      value: 78,
      unit: '%',
      target: 85,
      status: 'good',
      trend: 'up',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'error-rate',
      name: 'Error Rate',
      value: 0.5,
      unit: '%',
      target: 1.0,
      status: 'excellent',
      trend: 'down',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'concurrent-users',
      name: 'Concurrent Users',
      value: 450,
      unit: 'users',
      target: 500,
      status: 'good',
      trend: 'stable',
      lastUpdated: new Date().toISOString()
    }
  ]);

  // System health data
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([
    {
      module: 'Oracle Financials Cloud',
      status: 'online',
      uptime: 99.8,
      responseTime: 1.2,
      errorRate: 0.1,
      activeUsers: 150,
      lastChecked: new Date().toISOString()
    },
    {
      module: 'Oracle HCM Cloud',
      status: 'online',
      uptime: 99.9,
      responseTime: 0.8,
      errorRate: 0.05,
      activeUsers: 200,
      lastChecked: new Date().toISOString()
    },
    {
      module: 'Oracle SCM Cloud',
      status: 'degraded',
      uptime: 98.5,
      responseTime: 3.2,
      errorRate: 1.2,
      activeUsers: 80,
      lastChecked: new Date().toISOString()
    },
    {
      module: 'Oracle Analytics Cloud',
      status: 'online',
      uptime: 99.6,
      responseTime: 1.5,
      errorRate: 0.3,
      activeUsers: 45,
      lastChecked: new Date().toISOString()
    }
  ]);

  // Usage statistics
  const [usageStats, setUsageStats] = useState<UsageStatistics[]>([
    {
      module: 'Oracle Financials Cloud',
      dailyUsers: 150,
      transactions: 15000,
      dataVolume: 2.5,
      peakHours: ['09:00-11:00', '14:00-16:00']
    },
    {
      module: 'Oracle HCM Cloud',
      dailyUsers: 200,
      transactions: 8000,
      dataVolume: 1.8,
      peakHours: ['08:00-10:00', '13:00-15:00']
    },
    {
      module: 'Oracle SCM Cloud',
      dailyUsers: 80,
      transactions: 12000,
      dataVolume: 3.2,
      peakHours: ['10:00-12:00', '15:00-17:00']
    },
    {
      module: 'Oracle Analytics Cloud',
      dailyUsers: 45,
      transactions: 2000,
      dataVolume: 0.9,
      peakHours: ['09:00-11:00', '16:00-18:00']
    }
  ]);

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh data
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const refreshData = () => {
    // Simulate data refresh with small variations
    setPerformanceMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value + (Math.random() - 0.5) * metric.value * 0.1,
      lastUpdated: new Date().toISOString()
    })));

    setSystemHealth(prev => prev.map(health => ({
      ...health,
      responseTime: Math.max(0.1, health.responseTime + (Math.random() - 0.5) * 0.5),
      activeUsers: Math.max(0, Math.round(health.activeUsers + (Math.random() - 0.5) * 10)),
      lastChecked: new Date().toISOString()
    })));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': case 'online': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'critical': case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': case 'online': return '🟢';
      case 'good': return '🔵';
      case 'warning': case 'degraded': return '🟡';
      case 'critical': case 'offline': return '🔴';
      default: return '⚪';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const calculateOverallHealth = () => {
    const totalModules = systemHealth.length;
    const onlineModules = systemHealth.filter(h => h.status === 'online').length;
    const degradedModules = systemHealth.filter(h => h.status === 'degraded').length;
    
    if (onlineModules === totalModules) return 'excellent';
    if (degradedModules === 0) return 'good';
    if (degradedModules <= totalModules / 2) return 'warning';
    return 'critical';
  };

  const overallHealth = calculateOverallHealth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">📊</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Oracle Performance Dashboard</h1>
                <p className="text-gray-600">Real-time monitoring and performance analytics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Auto-refresh controls */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Auto-refresh</span>
                </label>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="text-sm px-2 py-1 border border-gray-300 rounded"
                  disabled={!autoRefresh}
                >
                  <option value={15}>15s</option>
                  <option value={30}>30s</option>
                  <option value={60}>60s</option>
                </select>
              </div>
              
              {/* Manual refresh */}
              <button
                onClick={refreshData}
                className="bg-[#04968d] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
              >
                <span className="mr-2">🔄</span>
                Refresh
              </button>
              
              {/* Last updated */}
              <div className="text-sm text-gray-500">
                Last updated: {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Overall Status Banner */}
        <div className={`rounded-xl p-6 mb-8 ${getStatusColor(overallHealth)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{getStatusIcon(overallHealth)}</span>
              <div>
                <h2 className="text-2xl font-bold">
                  Oracle Systems Status: {overallHealth.charAt(0).toUpperCase() + overallHealth.slice(1)}
                </h2>
                <p className="opacity-80">
                  {systemHealth.filter(h => h.status === 'online').length} of {systemHealth.length} modules online
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {Math.round((systemHealth.filter(h => h.status === 'online').length / systemHealth.length) * 100)}%
              </div>
              <div className="opacity-80">System Availability</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'metrics', label: 'Performance Metrics', icon: '⚡' },
                { id: 'health', label: 'System Health', icon: '🏥' },
                { id: 'usage', label: 'Usage Analytics', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
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

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Performance Indicators */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Key Performance Indicators</h3>
                <div className="grid grid-cols-2 gap-4">
                  {performanceMetrics.slice(0, 4).map((metric) => (
                    <div key={metric.id} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">
                        {metric.value.toFixed(metric.unit === '%' ? 1 : 2)}
                        <span className="text-sm text-gray-600 ml-1">{metric.unit}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{metric.name}</div>
                      <div className="flex items-center justify-center mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(metric.status)}`}>
                          {metric.status}
                        </span>
                        <span className="ml-2">{getTrendIcon(metric.trend)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status Summary */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">System Status Summary</h3>
                <div className="space-y-4">
                  {systemHealth.map((health, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span>{getStatusIcon(health.status)}</span>
                        <div>
                          <div className="font-medium text-gray-800">{health.module}</div>
                          <div className="text-sm text-gray-600">
                            {health.activeUsers} active users
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">
                          {health.uptime.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">uptime</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <span className="text-yellow-600">⚠️</span>
                    <div>
                      <div className="font-medium text-yellow-800">High Response Time</div>
                      <div className="text-sm text-yellow-700">
                        Oracle SCM Cloud experiencing slower response times
                      </div>
                      <div className="text-xs text-yellow-600 mt-1">5 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-green-600">✅</span>
                    <div>
                      <div className="font-medium text-green-800">Performance Improved</div>
                      <div className="text-sm text-green-700">
                        Oracle Financials Cloud response time back to normal
                      </div>
                      <div className="text-xs text-green-600 mt-1">15 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-blue-600">ℹ️</span>
                    <div>
                      <div className="font-medium text-blue-800">Maintenance Scheduled</div>
                      <div className="text-sm text-blue-700">
                        Oracle Analytics Cloud maintenance window: 2:00 AM - 4:00 AM
                      </div>
                      <div className="text-xs text-blue-600 mt-1">2 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Today's Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">
                      {usageStats.reduce((sum, stat) => sum + stat.dailyUsers, 0)}
                    </div>
                    <div className="text-sm opacity-90">Total Active Users</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">
                      {(usageStats.reduce((sum, stat) => sum + stat.transactions, 0) / 1000).toFixed(1)}K
                    </div>
                    <div className="text-sm opacity-90">Transactions</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">
                      {usageStats.reduce((sum, stat) => sum + stat.dataVolume, 0).toFixed(1)}GB
                    </div>
                    <div className="text-sm opacity-90">Data Processed</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">99.7%</div>
                    <div className="text-sm opacity-90">Avg Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceMetrics.map((metric) => (
                <div key={metric.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-800">
                      {metric.value.toFixed(metric.unit === '%' ? 1 : 2)}
                      <span className="text-lg text-gray-600 ml-1">{metric.unit}</span>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium">{metric.target} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">
                        {new Date(metric.lastUpdated).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar for percentage metrics */}
                  {metric.unit === '%' && (
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            metric.status === 'excellent' ? 'bg-green-500' :
                            metric.status === 'good' ? 'bg-blue-500' :
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(metric.value, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* System Health Tab */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              {systemHealth.map((health, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{getStatusIcon(health.status)}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{health.module}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(health.status)}`}>
                          {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Last Checked</div>
                      <div className="font-medium">
                        {new Date(health.lastChecked).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {health.uptime.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {health.responseTime.toFixed(1)}s
                      </div>
                      <div className="text-sm text-gray-600">Response Time</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {health.errorRate.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Error Rate</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {health.activeUsers}
                      </div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                  </div>
                  
                  {/* Visual indicators */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Uptime</div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${health.uptime}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Performance</div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            health.responseTime < 2 ? 'bg-green-500' :
                            health.responseTime < 3 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.max(20, 100 - (health.responseTime * 20))}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Reliability</div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            health.errorRate < 0.5 ? 'bg-green-500' :
                            health.errorRate < 1 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.max(20, 100 - (health.errorRate * 50))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Usage Analytics Tab */}
          {activeTab === 'usage' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {usageStats.map((usage, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">{usage.module}</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{usage.dailyUsers}</div>
                      <div className="text-sm text-gray-600">Daily Users</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {(usage.transactions / 1000).toFixed(1)}K
                      </div>
                      <div className="text-sm text-gray-600">Transactions</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {usage.dataVolume.toFixed(1)}GB
                      </div>
                      <div className="text-sm text-gray-600">Data Volume</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Peak Usage Hours</h4>
                    <div className="flex flex-wrap gap-2">
                      {usage.peakHours.map((hour, hourIndex) => (
                        <span 
                          key={hourIndex}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {hour}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OraclePerformanceDashboard;