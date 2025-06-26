import { supabase } from './config'
import { authService } from './auth'

interface DashboardMetrics {
  totalServices: number
  totalProjects: number
  totalClients: number
  totalPartners: number
  totalSubmissions: number
  recentSubmissions: number
  popularServices: Array<{ title: string; views: number }>
  monthlyGrowth: {
    services: number
    projects: number
    clients: number
    submissions: number
  }
}

interface UserActivity {
  user_id: string
  username: string
  action: string
  timestamp: string
  table_name?: string
  record_id?: string
}

interface SystemHealth {
  database_status: 'healthy' | 'warning' | 'error'
  response_time: number
  active_connections: number
  last_backup: string
  storage_usage: number
}

class AnalyticsService {
  // Get comprehensive dashboard metrics
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      const [
        servicesCount,
        projectsCount,
        clientsCount,
        partnersCount,
        submissionsCount,
        recentSubmissionsCount,
        popularServices,
        monthlyGrowth
      ] = await Promise.all([
        this.getTableCount('services'),
        this.getTableCount('projects'),
        this.getTableCount('clients'),
        this.getTableCount('partners'),
        this.getTableCount('contact_submissions'),
        this.getRecentSubmissionsCount(),
        this.getPopularServices(),
        this.getMonthlyGrowth()
      ])

      return {
        totalServices: servicesCount,
        totalProjects: projectsCount,
        totalClients: clientsCount,
        totalPartners: partnersCount,
        totalSubmissions: submissionsCount,
        recentSubmissions: recentSubmissionsCount,
        popularServices,
        monthlyGrowth
      }
    } catch (error) {
      console.error('Failed to get dashboard metrics:', error)
      throw error
    }
  }

  // Get count for any table
  private async getTableCount(tableName: string): Promise<number> {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error(`Failed to get count for ${tableName}:`, error)
      return 0
    }

    return count || 0
  }

  // Get recent submissions (last 7 days)
  private async getRecentSubmissionsCount(): Promise<number> {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { count, error } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString())

    if (error) {
      console.error('Failed to get recent submissions count:', error)
      return 0
    }

    return count || 0
  }

  // Get popular services (mock data for now - would need view tracking)
  private async getPopularServices(): Promise<Array<{ title: string; views: number }>> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('title')
        .limit(5)

      if (error) throw error

      // Mock view data - in production, you'd track actual views
      return (data || []).map((service, index) => ({
        title: service.title,
        views: Math.floor(Math.random() * 1000) + 100
      }))
    } catch (error) {
      console.error('Failed to get popular services:', error)
      return []
    }
  }

  // Calculate monthly growth rates
  private async getMonthlyGrowth(): Promise<DashboardMetrics['monthlyGrowth']> {
    const currentMonth = new Date()
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    try {
      const [
        currentServices,
        lastMonthServices,
        currentProjects,
        lastMonthProjects,
        currentClients,
        lastMonthClients,
        currentSubmissions,
        lastMonthSubmissions
      ] = await Promise.all([
        this.getCountSince('services', currentMonth),
        this.getCountSince('services', lastMonth),
        this.getCountSince('projects', currentMonth),
        this.getCountSince('projects', lastMonth),
        this.getCountSince('clients', currentMonth),
        this.getCountSince('clients', lastMonth),
        this.getCountSince('contact_submissions', currentMonth),
        this.getCountSince('contact_submissions', lastMonth)
      ])

      return {
        services: this.calculateGrowthRate(lastMonthServices, currentServices),
        projects: this.calculateGrowthRate(lastMonthProjects, currentProjects),
        clients: this.calculateGrowthRate(lastMonthClients, currentClients),
        submissions: this.calculateGrowthRate(lastMonthSubmissions, currentSubmissions)
      }
    } catch (error) {
      console.error('Failed to calculate monthly growth:', error)
      return { services: 0, projects: 0, clients: 0, submissions: 0 }
    }
  }

  // Get count since specific date
  private async getCountSince(tableName: string, date: Date): Promise<number> {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .gte('created_at', date.toISOString())

    if (error) {
      console.error(`Failed to get count since date for ${tableName}:`, error)
      return 0
    }

    return count || 0
  }

  // Calculate growth rate percentage
  private calculateGrowthRate(previous: number, current: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  // Get user activity logs
  async getUserActivity(limit: number = 50): Promise<UserActivity[]> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('Authentication required')
      }

      const { data, error } = await supabase
        .from('operation_logs')
        .select(`
          user_id,
          action,
          timestamp,
          table_name,
          record_id,
          users!inner(username)
        `)
        .order('timestamp', { ascending: false })
        .limit(limit)

      if (error) throw error

      return (data || []).map(log => ({
        user_id: log.user_id,
        username: log.users.username,
        action: log.action,
        timestamp: log.timestamp,
        table_name: log.table_name,
        record_id: log.record_id
      }))
    } catch (error) {
      console.error('Failed to get user activity:', error)
      return []
    }
  }

  // Generate reports
  async generateReport(type: 'services' | 'contacts' | 'users', dateRange: {
    start: string
    end: string
  }): Promise<any[]> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('Authentication required')
      }

      let tableName = type
      if (type === 'contacts') tableName = 'contact_submissions'

      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .gte('created_at', dateRange.start)
        .lte('created_at', dateRange.end)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data || []
    } catch (error) {
      console.error(`Failed to generate ${type} report:`, error)
      return []
    }
  }

  // Export data to CSV format
  async exportToCSV(data: any[], filename: string): Promise<string> {
    try {
      if (!data.length) return ''

      const headers = Object.keys(data[0])
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => {
            const value = row[header]
            // Escape commas and quotes in CSV
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          }).join(',')
        )
      ].join('\n')

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      window.URL.revokeObjectURL(url)

      return csvContent
    } catch (error) {
      console.error('Failed to export CSV:', error)
      throw error
    }
  }

  // Get system health metrics
  async getSystemHealth(): Promise<SystemHealth> {
    try {
      const startTime = Date.now()
      
      // Test database response time
      await supabase.from('settings').select('id').limit(1)
      const responseTime = Date.now() - startTime

      // Mock other metrics (in production, these would come from monitoring tools)
      return {
        database_status: responseTime < 1000 ? 'healthy' : responseTime < 3000 ? 'warning' : 'error',
        response_time: responseTime,
        active_connections: Math.floor(Math.random() * 50) + 10,
        last_backup: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        storage_usage: Math.floor(Math.random() * 80) + 10
      }
    } catch (error) {
      console.error('Failed to get system health:', error)
      return {
        database_status: 'error',
        response_time: 0,
        active_connections: 0,
        last_backup: '',
        storage_usage: 0
      }
    }
  }

  // Real-time data subscription
  subscribeToChanges(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table },
        callback
      )
      .subscribe()
  }

  // Unsubscribe from real-time changes
  unsubscribeFromChanges(subscription: any) {
    if (subscription) {
      supabase.removeChannel(subscription)
    }
  }
}

export const analyticsService = new AnalyticsService()