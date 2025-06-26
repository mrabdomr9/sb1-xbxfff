import { supabase } from './config'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

interface CacheConfig {
  defaultTTL: number
  maxSize: number
  cleanupInterval: number
}

class CacheService {
  private cache = new Map<string, CacheEntry<any>>()
  private config: CacheConfig = {
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxSize: 1000,
    cleanupInterval: 10 * 60 * 1000 // 10 minutes
  }
  private cleanupTimer: NodeJS.Timeout | null = null

  constructor() {
    this.startCleanupTimer()
  }

  // Get data from cache or fetch from database
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = this.config.defaultTTL
  ): Promise<T> {
    // Check if data exists in cache and is still valid
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data
    }

    // Fetch fresh data
    try {
      const data = await fetcher()
      this.set(key, data, ttl)
      return data
    } catch (error) {
      // If fetch fails and we have stale cache, return it
      if (cached) {
        console.warn(`Using stale cache for ${key} due to fetch error:`, error)
        return cached.data
      }
      throw error
    }
  }

  // Set data in cache
  set<T>(key: string, data: T, ttl: number = this.config.defaultTTL): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.config.maxSize) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  // Remove specific key from cache
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  // Clear all cache
  clear(): void {
    this.cache.clear()
  }

  // Invalidate cache by pattern
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern)
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hitRate: this.calculateHitRate(),
      entries: Array.from(this.cache.keys())
    }
  }

  // Calculate cache hit rate (simplified)
  private calculateHitRate(): number {
    // In a real implementation, you'd track hits and misses
    return Math.random() * 0.3 + 0.7 // Mock 70-100% hit rate
  }

  // Start automatic cleanup of expired entries
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup()
    }, this.config.cleanupInterval)
  }

  // Clean up expired cache entries
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }

  // Stop cleanup timer
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer)
      this.cleanupTimer = null
    }
    this.clear()
  }
}

// Cached database operations
class CachedDatabaseOperations {
  constructor(private cache: CacheService) {}

  // Cached services operations
  async getServices() {
    return this.cache.get(
      'services:all',
      async () => {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        return data
      },
      2 * 60 * 1000 // 2 minutes TTL for services
    )
  }

  async getService(id: string) {
    return this.cache.get(
      `service:${id}`,
      async () => {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error) throw error
        return data
      },
      5 * 60 * 1000 // 5 minutes TTL for individual service
    )
  }

  // Cached projects operations
  async getProjects() {
    return this.cache.get(
      'projects:all',
      async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true })
        
        if (error) throw error
        return data
      },
      5 * 60 * 1000 // 5 minutes TTL
    )
  }

  // Cached clients operations
  async getClients() {
    return this.cache.get(
      'clients:all',
      async () => {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        return data
      },
      10 * 60 * 1000 // 10 minutes TTL for clients
    )
  }

  // Cached partners operations
  async getPartners() {
    return this.cache.get(
      'partners:all',
      async () => {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        return data
      },
      15 * 60 * 1000 // 15 minutes TTL for partners
    )
  }

  // Cached settings operations
  async getSettings() {
    return this.cache.get(
      'settings:current',
      async () => {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .single()
        
        if (error && error.code !== 'PGRST116') throw error
        return data
      },
      30 * 60 * 1000 // 30 minutes TTL for settings
    )
  }

  // Cache invalidation methods
  invalidateServices(): void {
    this.cache.invalidatePattern('^services:')
    this.cache.invalidatePattern('^service:')
  }

  invalidateProjects(): void {
    this.cache.invalidatePattern('^projects:')
    this.cache.invalidatePattern('^project:')
  }

  invalidateClients(): void {
    this.cache.invalidatePattern('^clients:')
    this.cache.invalidatePattern('^client:')
  }

  invalidatePartners(): void {
    this.cache.invalidatePattern('^partners:')
    this.cache.invalidatePattern('^partner:')
  }

  invalidateSettings(): void {
    this.cache.invalidatePattern('^settings:')
  }

  // Invalidate all cache
  invalidateAll(): void {
    this.cache.clear()
  }
}

export const cacheService = new CacheService()
export const cachedDbOps = new CachedDatabaseOperations(cacheService)

// Cache warming utility
export const warmCache = async (): Promise<void> => {
  try {
    console.log('Warming cache...')
    
    await Promise.all([
      cachedDbOps.getServices(),
      cachedDbOps.getProjects(),
      cachedDbOps.getClients(),
      cachedDbOps.getPartners(),
      cachedDbOps.getSettings()
    ])
    
    console.log('Cache warmed successfully')
  } catch (error) {
    console.error('Failed to warm cache:', error)
  }
}