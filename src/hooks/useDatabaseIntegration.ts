import { useState, useEffect, useCallback } from 'react'
import { authService } from '../lib/database/auth'
import { useAuthStore } from '../store/authStore'
import { 
  servicesOps, 
  projectsOps, 
  clientsOps, 
  partnersOps, 
  brochuresOps,
  contactSubmissionsOps,
  settingsOps,
  servicesOperations,
  contactOperations
} from '../lib/database/operations'
import { analyticsService } from '../lib/database/analytics'
import { cachedDbOps, cacheService } from '../lib/database/cache'
import type { DatabaseResult } from '../lib/database/operations'

// Generic hook for database operations
export function useDatabase<T>(tableName: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const operations = {
    services: servicesOps,
    projects: projectsOps,
    clients: clientsOps,
    partners: partnersOps,
    brochures: brochuresOps,
    contact_submissions: contactSubmissionsOps,
    settings: settingsOps
  }[tableName]

  const loadData = useCallback(async (options?: any) => {
    if (!operations) return

    setLoading(true)
    setError(null)

    try {
      const result = await operations.findMany(options)
      if (result.error) {
        setError(result.error)
      } else {
        setData(result.data || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [operations])

  const create = useCallback(async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    if (!operations) return { data: null, error: 'Operations not available' }

    setLoading(true)
    const result = await operations.create(item)
    
    if (result.data) {
      setData(prev => [result.data!, ...prev])
      // Invalidate cache
      cacheService.invalidatePattern(`^${tableName}:`)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
    return result
  }, [operations, tableName])

  const update = useCallback(async (id: string, item: Partial<T>) => {
    if (!operations) return { data: null, error: 'Operations not available' }

    setLoading(true)
    const result = await operations.update(id, item)
    
    if (result.data) {
      setData(prev => prev.map(d => (d as any).id === id ? result.data! : d))
      // Invalidate cache
      cacheService.invalidatePattern(`^${tableName}:`)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
    return result
  }, [operations, tableName])

  const remove = useCallback(async (id: string) => {
    if (!operations) return { data: null, error: 'Operations not available' }

    setLoading(true)
    const result = await operations.delete(id)
    
    if (result.data) {
      setData(prev => prev.filter(d => (d as any).id !== id))
      // Invalidate cache
      cacheService.invalidatePattern(`^${tableName}:`)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
    return result
  }, [operations, tableName])

  return {
    data,
    loading,
    error,
    loadData,
    create,
    update,
    remove,
    refresh: loadData
  }
}

// Specific hooks for each entity type
export function useServices() {
  const db = useDatabase('services')
  
  const createService = useCallback(async (serviceData: any) => {
    return servicesOperations.createService(serviceData)
  }, [])

  const getServicesWithPricing = useCallback(async () => {
    return servicesOperations.getServicesWithPricing()
  }, [])

  return {
    ...db,
    createService,
    getServicesWithPricing
  }
}

export function useProjects() {
  const db = useDatabase('projects')
  
  const reorderProjects = useCallback(async (startIndex: number, endIndex: number) => {
    // Implement reordering logic
    const items = [...db.data]
    const [reorderedItem] = items.splice(startIndex, 1)
    items.splice(endIndex, 0, reorderedItem)
    
    // Update order_index for all affected items
    const updates = items.map((item, index) => 
      db.update((item as any).id, { order_index: index })
    )
    
    await Promise.all(updates)
    await db.refresh()
  }, [db])

  return {
    ...db,
    reorderProjects
  }
}

export function useClients() {
  return useDatabase('clients')
}

export function usePartners() {
  return useDatabase('partners')
}

export function useBrochures() {
  return useDatabase('brochures')
}

export function useContactSubmissions() {
  const db = useDatabase('contact_submissions')
  
  const createSubmission = useCallback(async (submissionData: any) => {
    return contactOperations.createSubmission(submissionData)
  }, [])

  const getSubmissionsByDateRange = useCallback(async (startDate: string, endDate: string) => {
    return contactOperations.getSubmissionsByDateRange(startDate, endDate)
  }, [])

  return {
    ...db,
    createSubmission,
    getSubmissionsByDateRange
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSettings = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await settingsOps.findMany()
      if (result.error) {
        setError(result.error)
      } else {
        setSettings(result.data?.[0] || null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSettings = useCallback(async (newSettings: any) => {
    setLoading(true)
    
    let result
    if (settings?.id) {
      result = await settingsOps.update(settings.id, newSettings)
    } else {
      result = await settingsOps.create(newSettings)
    }
    
    if (result.data) {
      setSettings(result.data)
      // Invalidate cache
      cacheService.invalidatePattern('^settings:')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
    return result
  }, [settings])

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  return {
    settings,
    loading,
    error,
    updateSettings,
    refresh: loadSettings
  }
}

// Analytics hook
export function useAnalytics() {
  const [metrics, setMetrics] = useState<any>(null)
  const [userActivity, setUserActivity] = useState<any[]>([])
  const [systemHealth, setSystemHealth] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Get auth state from store
  const { user, isInitialized } = useAuthStore()

  const loadDashboardMetrics = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await analyticsService.getDashboardMetrics()
      setMetrics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadUserActivity = useCallback(async (limit = 50) => {
    try {
      const data = await analyticsService.getUserActivity(limit)
      setUserActivity(data)
    } catch (err) {
      console.error('Failed to load user activity:', err)
    }
  }, [])

  const loadSystemHealth = useCallback(async () => {
    try {
      const data = await analyticsService.getSystemHealth()
      setSystemHealth(data)
    } catch (err) {
      console.error('Failed to load system health:', err)
    }
  }, [])

  const generateReport = useCallback(async (
    type: 'services' | 'contacts' | 'users',
    dateRange: { start: string; end: string }
  ) => {
    return analyticsService.generateReport(type, dateRange)
  }, [])

  const exportToCSV = useCallback(async (data: any[], filename: string) => {
    return analyticsService.exportToCSV(data, filename)
  }, [])

  const subscribeToChanges = useCallback((table: string, callback: (payload: any) => void) => {
    return analyticsService.subscribeToChanges(table, callback)
  }, [])

  const unsubscribeFromChanges = useCallback((subscription: any) => {
    analyticsService.unsubscribeFromChanges(subscription)
  }, [])

  useEffect(() => {
    // Only load data after auth is initialized
    if (isInitialized) {
      loadDashboardMetrics()
      loadSystemHealth()
      
      // Only load user activity if user is authenticated
      if (user) {
        loadUserActivity()
      }
    }
  }, [isInitialized, user, loadDashboardMetrics, loadUserActivity, loadSystemHealth])

  return {
    metrics,
    userActivity,
    systemHealth,
    loading,
    error,
    loadDashboardMetrics,
    loadUserActivity,
    loadSystemHealth,
    generateReport,
    exportToCSV,
    subscribeToChanges,
    unsubscribeFromChanges,
    refresh: loadDashboardMetrics
  }
}

// Authentication hook - integrates Supabase auth with Zustand store
export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Get Zustand auth store actions
  const { setAuth, clearAuth, setIsInitialized } = useAuthStore()

  useEffect(() => {
    // Set initialization to false at start
    setIsInitialized(false)
    
    // Initialize auth service and sync with Zustand store
    authService.initialize().then(() => {
      const currentUser = authService.getCurrentUser()
      const currentSession = authService.getCurrentSession()
      
      setUser(currentUser)
      setSession(currentSession)
      
      // Sync with Zustand store
      if (currentUser && currentSession) {
        setAuth(currentUser, currentSession.access_token)
      } else {
        // Clear Zustand store if no valid session exists
        clearAuth()
      }
      
      setLoading(false)
      // Set initialization to true after completion
      setIsInitialized(true)
    }).catch((err) => {
      console.error('Failed to initialize auth service:', err)
      setLoading(false)
      // Set initialization to true even on error so app doesn't hang
      setIsInitialized(true)
    })
  }, [setAuth, clearAuth, setIsInitialized])

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    const result = await authService.signIn(email, password)
    
    if (result.error) {
      setError(result.error)
    } else {
      setUser(result.user)
      setSession(result.session)
      
      // Sync with Zustand store
      if (result.user && result.session) {
        setAuth(result.user, result.session.access_token)
      }
    }
    
    setLoading(false)
    return result
  }, [setAuth])

  const signOut = useCallback(async () => {
    setLoading(true)
    const result = await authService.signOut()
    
    if (!result.error) {
      setUser(null)
      setSession(null)
      
      // Clear Zustand store
      clearAuth()
    }
    
    setLoading(false)
    return result
  }, [clearAuth])

  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated()
  }, [])

  const hasRole = useCallback((role: string) => {
    return authService.hasRole(role)
  }, [])

  return {
    user,
    session,
    loading,
    error,
    signIn,
    signOut,
    isAuthenticated,
    hasRole
  }
}

// Cache management hook
export function useCache() {
  const getStats = useCallback(() => {
    return cacheService.getStats()
  }, [])

  const clearCache = useCallback(() => {
    cacheService.clear()
  }, [])

  const invalidatePattern = useCallback((pattern: string) => {
    cacheService.invalidatePattern(pattern)
  }, [])

  return {
    getStats,
    clearCache,
    invalidatePattern
  }
}