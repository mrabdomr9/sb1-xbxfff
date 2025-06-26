import { supabase, withRetry } from './config'
import { authService } from './auth'
import type { PostgrestError } from '@supabase/supabase-js'

// Base interface for all database entities
interface BaseEntity {
  id: string
  created_at?: string
  updated_at?: string
}

// Generic database operation result
interface DatabaseResult<T> {
  data: T | null
  error: string | null
  count?: number
}

// Input validation utilities
class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

const validateRequired = (value: any, fieldName: string): void => {
  if (value === null || value === undefined || value === '') {
    throw new ValidationError(`${fieldName} is required`, fieldName)
  }
}

const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format', 'email')
  }
}

const validateUrl = (url: string, fieldName: string): void => {
  try {
    new URL(url)
  } catch {
    throw new ValidationError(`Invalid URL format for ${fieldName}`, fieldName)
  }
}

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

// Generic CRUD operations class
class DatabaseOperations<T extends BaseEntity> {
  constructor(private tableName: string) {}

  // Create operation with validation
  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResult<T>> {
    try {
      // Validate user authentication
      if (!authService.isAuthenticated()) {
        return { data: null, error: 'Authentication required' }
      }

      // Sanitize string inputs
      const sanitizedData = this.sanitizeData(data)

      const result = await withRetry(async () => {
        const { data: insertedData, error } = await supabase
          .from(this.tableName)
          .insert([sanitizedData])
          .select()
          .single()

        if (error) throw error
        return insertedData
      })

      // Log the operation
      await this.logOperation('create', result.id)

      return { data: result as T, error: null }
    } catch (error) {
      console.error(`Create operation failed for ${this.tableName}:`, error)
      return { 
        data: null, 
        error: this.getErrorMessage(error)
      }
    }
  }

  // Read operations with filtering and pagination
  async findMany(options: {
    filters?: Record<string, any>
    orderBy?: { column: string; ascending: boolean }
    limit?: number
    offset?: number
    search?: { column: string; query: string }
  } = {}): Promise<DatabaseResult<T[]>> {
    try {
      let query = supabase.from(this.tableName).select('*', { count: 'exact' })

      // Apply filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            query = query.eq(key, value)
          }
        })
      }

      // Apply search
      if (options.search) {
        query = query.ilike(options.search.column, `%${options.search.query}%`)
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending 
        })
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit)
      }
      if (options.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1)
      }

      const { data, error, count } = await query

      if (error) throw error

      return { 
        data: data as T[], 
        error: null, 
        count: count || 0 
      }
    } catch (error) {
      console.error(`Find operation failed for ${this.tableName}:`, error)
      return { 
        data: null, 
        error: this.getErrorMessage(error),
        count: 0
      }
    }
  }

  // Find single record by ID
  async findById(id: string): Promise<DatabaseResult<T>> {
    try {
      validateRequired(id, 'id')

      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return { data: data as T, error: null }
    } catch (error) {
      console.error(`Find by ID failed for ${this.tableName}:`, error)
      return { 
        data: null, 
        error: this.getErrorMessage(error)
      }
    }
  }

  // Update operation
  async update(id: string, data: Partial<Omit<T, 'id' | 'created_at'>>): Promise<DatabaseResult<T>> {
    try {
      // Validate user authentication
      if (!authService.isAuthenticated()) {
        return { data: null, error: 'Authentication required' }
      }

      validateRequired(id, 'id')

      // Sanitize string inputs
      const sanitizedData = this.sanitizeData(data)
      
      // Add updated_at timestamp
      const updateData = {
        ...sanitizedData,
        updated_at: new Date().toISOString()
      }

      const result = await withRetry(async () => {
        const { data: updatedData, error } = await supabase
          .from(this.tableName)
          .update(updateData)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        return updatedData
      })

      // Log the operation
      await this.logOperation('update', id)

      return { data: result as T, error: null }
    } catch (error) {
      console.error(`Update operation failed for ${this.tableName}:`, error)
      return { 
        data: null, 
        error: this.getErrorMessage(error)
      }
    }
  }

  // Delete operation
  async delete(id: string): Promise<DatabaseResult<boolean>> {
    try {
      // Validate user authentication
      if (!authService.isAuthenticated()) {
        return { data: null, error: 'Authentication required' }
      }

      validateRequired(id, 'id')

      await withRetry(async () => {
        const { error } = await supabase
          .from(this.tableName)
          .delete()
          .eq('id', id)

        if (error) throw error
      })

      // Log the operation
      await this.logOperation('delete', id)

      return { data: true, error: null }
    } catch (error) {
      console.error(`Delete operation failed for ${this.tableName}:`, error)
      return { 
        data: null, 
        error: this.getErrorMessage(error)
      }
    }
  }

  // Bulk operations
  async bulkCreate(items: Omit<T, 'id' | 'created_at' | 'updated_at'>[]): Promise<DatabaseResult<T[]>> {
    try {
      if (!authService.isAuthenticated()) {
        return { data: null, error: 'Authentication required' }
      }

      const sanitizedItems = items.map(item => this.sanitizeData(item))

      const { data, error } = await supabase
        .from(this.tableName)
        .insert(sanitizedItems)
        .select()

      if (error) throw error

      return { data: data as T[], error: null }
    } catch (error) {
      console.error(`Bulk create failed for ${this.tableName}:`, error)
      return { 
        data: null, 
        error: this.getErrorMessage(error)
      }
    }
  }

  async bulkDelete(ids: string[]): Promise<DatabaseResult<boolean>> {
    try {
      if (!authService.isAuthenticated()) {
        return { data: null, error: 'Authentication required' }
      }

      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .in('id', ids)

      if (error) throw error

      return { data: true, error: null }
    } catch (error) {
      console.error(`Bulk delete failed for ${this.tableName}:`, error)
      return { 
        data: null, 
        error: this.getErrorMessage(error)
      }
    }
  }

  // Utility methods
  private sanitizeData(data: any): any {
    const sanitized = { ...data }
    
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = sanitizeInput(sanitized[key])
      }
    })

    return sanitized
  }

  private getErrorMessage(error: any): string {
    if (error instanceof ValidationError) {
      return error.message
    }

    if (error?.code === 'PGRST116') {
      return 'Record not found'
    }

    if (error?.code === '23505') {
      return 'A record with this information already exists'
    }

    if (error?.code === '23503') {
      return 'Cannot delete record due to existing references'
    }

    return error?.message || 'An unexpected error occurred'
  }

  private async logOperation(operation: string, recordId: string): Promise<void> {
    try {
      const user = authService.getCurrentUser()
      if (!user) return

      await supabase
        .from('operation_logs')
        .insert({
          user_id: user.id,
          table_name: this.tableName,
          operation,
          record_id: recordId,
          timestamp: new Date().toISOString()
        })
    } catch (error) {
      console.error('Failed to log operation:', error)
    }
  }
}

// Specific entity operations
export const servicesOps = new DatabaseOperations('services')
export const projectsOps = new DatabaseOperations('projects')
export const clientsOps = new DatabaseOperations('clients')
export const partnersOps = new DatabaseOperations('partners')
export const brochuresOps = new DatabaseOperations('brochures')
export const contactSubmissionsOps = new DatabaseOperations('contact_submissions')
export const settingsOps = new DatabaseOperations('settings')

// Custom operations for specific business logic
export class ServicesOperations extends DatabaseOperations<any> {
  constructor() {
    super('services')
  }

  async createService(serviceData: any) {
    // Validate service-specific fields
    validateRequired(serviceData.title, 'title')
    validateRequired(serviceData.description, 'description')
    
    if (serviceData.title.length < 3) {
      throw new ValidationError('Title must be at least 3 characters long')
    }

    if (serviceData.description.length < 10) {
      throw new ValidationError('Description must be at least 10 characters long')
    }

    return this.create(serviceData)
  }

  async getServicesWithPricing() {
    return this.findMany({
      filters: { pricing: { not: null } },
      orderBy: { column: 'created_at', ascending: false }
    })
  }
}

export class ContactOperations extends DatabaseOperations<any> {
  constructor() {
    super('contact_submissions')
  }

  async createSubmission(submissionData: any) {
    // Validate contact form fields
    validateRequired(submissionData.name, 'name')
    validateRequired(submissionData.email, 'email')
    validateRequired(submissionData.phone, 'phone')
    validateRequired(submissionData.business_field, 'business_field')

    validateEmail(submissionData.email)

    // Additional phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    if (!phoneRegex.test(submissionData.phone)) {
      throw new ValidationError('Invalid phone number format')
    }

    return this.create(submissionData)
  }

  async getSubmissionsByDateRange(startDate: string, endDate: string) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error: this.getErrorMessage(error) }
    }
  }
}

export const servicesOperations = new ServicesOperations()
export const contactOperations = new ContactOperations()