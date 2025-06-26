// Database type definitions for TypeScript support

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          title: string
          description: string
          features: string[]
          target_audience: string[]
          benefits: string[]
          pricing: {
            startingAt: number
            currency: string
            billingPeriod: string
          } | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          features?: string[]
          target_audience?: string[]
          benefits?: string[]
          pricing?: {
            startingAt: number
            currency: string
            billingPeriod: string
          } | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          features?: string[]
          target_audience?: string[]
          benefits?: string[]
          pricing?: {
            startingAt: number
            currency: string
            billingPeriod: string
          } | null
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string
          order_index?: number
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          logo: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo: string
          description: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          description?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          name: string
          logo: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          updated_at?: string
        }
      }
      brochures: {
        Row: {
          id: string
          name: string
          file: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          file: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          file?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          business_field: string
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          business_field: string
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          business_field?: string
          message?: string | null
        }
      }
      settings: {
        Row: {
          id: string
          logo: string | null
          company_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          logo?: string | null
          company_name?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          logo?: string | null
          company_name?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          username: string
          email: string
          password_hash: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          password_hash: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          password_hash?: string
          role?: string
          updated_at?: string
        }
      }
      user_activity_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          timestamp: string
          ip_address: string | null
          user_agent: string | null
          session_id: string | null
          metadata: Record<string, any>
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          timestamp?: string
          ip_address?: string | null
          user_agent?: string | null
          session_id?: string | null
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          timestamp?: string
          ip_address?: string | null
          user_agent?: string | null
          session_id?: string | null
          metadata?: Record<string, any>
        }
      }
      operation_logs: {
        Row: {
          id: string
          user_id: string | null
          table_name: string
          operation: string
          record_id: string | null
          old_values: Record<string, any> | null
          new_values: Record<string, any> | null
          timestamp: string
          success: boolean
          error_message: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          table_name: string
          operation: string
          record_id?: string | null
          old_values?: Record<string, any> | null
          new_values?: Record<string, any> | null
          timestamp?: string
          success?: boolean
          error_message?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          table_name?: string
          operation?: string
          record_id?: string | null
          old_values?: Record<string, any> | null
          new_values?: Record<string, any> | null
          timestamp?: string
          success?: boolean
          error_message?: string | null
        }
      }
      system_metrics: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          metric_unit: string | null
          timestamp: string
          metadata: Record<string, any>
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: number
          metric_unit?: string | null
          timestamp?: string
          metadata?: Record<string, any>
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          metric_unit?: string | null
          timestamp?: string
          metadata?: Record<string, any>
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_dashboard_metrics: {
        Args: {}
        Returns: Record<string, any>
      }
      get_monthly_growth: {
        Args: {}
        Returns: Record<string, any>
      }
      cleanup_old_logs: {
        Args: {}
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for common operations
export type ServiceRow = Database['public']['Tables']['services']['Row']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type ServiceUpdate = Database['public']['Tables']['services']['Update']

export type ProjectRow = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type ClientRow = Database['public']['Tables']['clients']['Row']
export type ClientInsert = Database['public']['Tables']['clients']['Insert']
export type ClientUpdate = Database['public']['Tables']['clients']['Update']

export type PartnerRow = Database['public']['Tables']['partners']['Row']
export type PartnerInsert = Database['public']['Tables']['partners']['Insert']
export type PartnerUpdate = Database['public']['Tables']['partners']['Update']

export type BrochureRow = Database['public']['Tables']['brochures']['Row']
export type BrochureInsert = Database['public']['Tables']['brochures']['Insert']
export type BrochureUpdate = Database['public']['Tables']['brochures']['Update']

export type ContactSubmissionRow = Database['public']['Tables']['contact_submissions']['Row']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update']

export type SettingsRow = Database['public']['Tables']['settings']['Row']
export type SettingsInsert = Database['public']['Tables']['settings']['Insert']
export type SettingsUpdate = Database['public']['Tables']['settings']['Update']

export type UserRow = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']