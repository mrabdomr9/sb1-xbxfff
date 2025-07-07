// Simple analytics utilities for tracking user interactions
// In a real application, this would integrate with Google Analytics, etc.

interface AnalyticsEvent {
  type: string;
  data: any;
  timestamp: string;
  sessionId: string;
}

class SimpleAnalytics {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadEvents();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadEvents(): void {
    try {
      const saved = localStorage.getItem('analytics_events');
      if (saved) {
        this.events = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load analytics events:', error);
    }
  }

  private saveEvents(): void {
    try {
      // Keep only last 1000 events to prevent localStorage bloat
      const recentEvents = this.events.slice(-1000);
      localStorage.setItem('analytics_events', JSON.stringify(recentEvents));
    } catch (error) {
      console.error('Failed to save analytics events:', error);
    }
  }

  // Track page views
  trackPageView(page: string, additionalData?: any): void {
    this.track('page_view', {
      page,
      url: window.location.href,
      referrer: document.referrer,
      ...additionalData
    });
  }

  // Track user actions
  trackAction(action: string, data?: any): void {
    this.track('action', {
      action,
      ...data
    });
  }

  // Track contact form submissions
  trackContactSubmission(data: any): void {
    this.track('contact_submission', data);
  }

  // Track service views
  trackServiceView(serviceId: string, serviceName: string): void {
    this.track('service_view', {
      serviceId,
      serviceName
    });
  }

  // Track downloads
  trackDownload(file: string, type: string): void {
    this.track('download', {
      file,
      type
    });
  }

  // Generic track method
  private track(type: string, data: any): void {
    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId
    };

    this.events.push(event);
    this.saveEvents();

    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  // Get analytics data for admin dashboard
  getAnalytics(days: number = 30): any {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentEvents = this.events.filter(
      event => new Date(event.timestamp) > cutoffDate
    );

    const pageViews = recentEvents.filter(e => e.type === 'page_view');
    const contactSubmissions = recentEvents.filter(e => e.type === 'contact_submission');
    const serviceViews = recentEvents.filter(e => e.type === 'service_view');
    const downloads = recentEvents.filter(e => e.type === 'download');

    // Calculate unique sessions
    const uniqueSessions = new Set(recentEvents.map(e => e.sessionId)).size;

    // Popular pages
    const pageViewCounts: { [key: string]: number } = {};
    pageViews.forEach(event => {
      const page = event.data.page || 'unknown';
      pageViewCounts[page] = (pageViewCounts[page] || 0) + 1;
    });

    // Popular services
    const serviceViewCounts: { [key: string]: number } = {};
    serviceViews.forEach(event => {
      const service = event.data.serviceName || 'unknown';
      serviceViewCounts[service] = (serviceViewCounts[service] || 0) + 1;
    });

    // Daily activity
    const dailyActivity: { [key: string]: number } = {};
    recentEvents.forEach(event => {
      const date = event.timestamp.split('T')[0];
      dailyActivity[date] = (dailyActivity[date] || 0) + 1;
    });

    return {
      summary: {
        totalEvents: recentEvents.length,
        uniqueSessions,
        pageViews: pageViews.length,
        contactSubmissions: contactSubmissions.length,
        serviceViews: serviceViews.length,
        downloads: downloads.length
      },
      popularPages: Object.entries(pageViewCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      popularServices: Object.entries(serviceViewCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      dailyActivity: Object.entries(dailyActivity)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-30), // Last 30 days
      recentContactSubmissions: contactSubmissions
        .slice(-10)
        .reverse(),
      recentDownloads: downloads
        .slice(-10)
        .reverse()
    };
  }

  // Clear all analytics data
  clearData(): void {
    this.events = [];
    localStorage.removeItem('analytics_events');
  }
}

// Create singleton instance
const analytics = new SimpleAnalytics();

export default analytics;

// Convenience functions
export const trackPageView = (page: string, data?: any) => analytics.trackPageView(page, data);
export const trackAction = (action: string, data?: any) => analytics.trackAction(action, data);
export const trackContactSubmission = (data: any) => analytics.trackContactSubmission(data);
export const trackServiceView = (serviceId: string, serviceName: string) => analytics.trackServiceView(serviceId, serviceName);
export const trackDownload = (file: string, type: string) => analytics.trackDownload(file, type);
export const getAnalytics = (days?: number) => analytics.getAnalytics(days);