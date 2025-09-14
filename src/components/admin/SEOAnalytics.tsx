import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, Users, Globe, Search, BarChart3 } from 'lucide-react';

interface SEOMetrics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topKeywords: Array<{ keyword: string; position: number; clicks: number }>;
  topPages: Array<{ page: string; views: number }>;
}

const SEOAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate SEO metrics (in production, integrate with Google Analytics/Search Console)
    const loadSEOMetrics = async () => {
      setLoading(true);
      
      // Mock data - replace with real analytics API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics({
        pageViews: 15420,
        uniqueVisitors: 8930,
        bounceRate: 32.5,
        avgSessionDuration: '3:45',
        topKeywords: [
          { keyword: 'Oracle ERP implementation Egypt', position: 3, clicks: 245 },
          { keyword: 'custom desktop applications', position: 5, clicks: 189 },
          { keyword: 'enterprise software solutions', position: 7, clicks: 156 },
          { keyword: 'ERP consulting Egypt', position: 4, clicks: 134 },
          { keyword: 'Windows desktop development', position: 8, clicks: 98 }
        ],
        topPages: [
          { page: '/', views: 5420 },
          { page: '/services', views: 3210 },
          { page: '/clients', views: 2890 },
          { page: '/contact', views: 2100 },
          { page: '/brochures', views: 1800 }
        ]
      });
      
      setLoading(false);
    };

    loadSEOMetrics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Search className="w-6 h-6 text-[#04968d]" />
        <h3 className="text-lg font-semibold">SEO Performance</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Eye className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{metrics.pageViews.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Page Views</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{metrics.uniqueVisitors.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Unique Visitors</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{metrics.bounceRate}%</div>
          <div className="text-sm text-gray-600">Bounce Rate</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <BarChart3 className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{metrics.avgSessionDuration}</div>
          <div className="text-sm text-gray-600">Avg. Session</div>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Top Ranking Keywords</h4>
        <div className="space-y-2">
          {metrics.topKeywords.map((keyword, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-800">{keyword.keyword}</span>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-600">Position {keyword.position}</span>
                <span className="text-xs text-gray-600">{keyword.clicks} clicks</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Top Performing Pages</h4>
        <div className="space-y-2">
          {metrics.topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-800">{page.page}</span>
              <span className="text-xs text-gray-600">{page.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SEOAnalytics;