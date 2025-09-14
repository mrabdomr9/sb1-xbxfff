import { supabase } from './config'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  username?: string
  role: string
  last_sign_in_at?: string
}

export interface AuthResponse {
  user: AuthUser | null
  session: Session | null
  error: string | null
}

class AuthService {
  private currentUser: AuthUser | null = null
  private currentSession: Session | null = null

  // Initialize auth state
  async initialize(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Auth initialization error:', error)
        // Clear any invalid stored tokens
        this.currentUser = null
        this.currentSession = null
        return false
      }

      if (session) {
        this.currentSession = session
        await this.loadUserProfile(session.user.id)
      } else {
        // No valid session found
        this.currentUser = null
        this.currentSession = null
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event)
        
        if (session) {
          this.currentSession = session
          await this.loadUserProfile(session.user.id)
        } else {
          this.currentUser = null
          this.currentSession = null
        }
      })
      
      return true
    } catch (error) {
      console.error('Auth initialization failed:', error)
      // Clear any invalid stored tokens
      this.currentUser = null
      this.currentSession = null
      return false
    }
  }

  // Load user profile from database
  private async loadUserProfile(userId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, email, role')
        .eq('id', userId)
        .single()

      if (error) {
        // If user doesn't exist in users table (PGRST116 error), create it
        if (error.code === 'PGRST116' || error.message.includes('JSON object requested, multiple (or no) rows returned')) {
          console.log('User profile not found, creating new profile for user:', userId)
          
          // Get user data from auth
          const { data: authUser } = await supabase.auth.getUser()
          
          if (authUser.user) {
            // Create user profile in public.users table
            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert({
                id: userId,
                email: authUser.user.email || '',
                username: authUser.user.user_metadata?.username || authUser.user.email?.split('@')[0] || 'user',
                role: authUser.user.user_metadata?.role || 'admin',
                password_hash: null
              })
              .select('id, username, email, role')
              .single()

            if (createError) {
              console.error('Failed to create user profile:', createError)
              return
            }

            this.currentUser = {
              id: newUser.id,
              email: newUser.email,
              username: newUser.username,
              role: newUser.role
            }
            console.log('Created new user profile:', this.currentUser)
            return
          }
        } else {
          console.error('Failed to load user profile:', error)
          return
        }
      }

      // Successfully loaded user profile
      if (data) {
        console.log('Loaded user profile:', data)
        this.currentUser = {
          id: data.id,
          email: data.email,
          username: data.username,
          role: data.role
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      // Input validation
      if (!email || !password) {
        return {
          user: null,
          session: null,
          error: 'Email and password are required'
        }
      }

      if (!this.isValidEmail(email)) {
        return {
          user: null,
          session: null,
          error: 'Invalid email format'
        }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      })

      if (error) {
        console.error('Sign in error:', error)
        
        // Provide helpful error messages based on the error type
        if (error.message.includes('Invalid login credentials')) {
          return {
            user: null,
            session: null,
            error: 'Invalid email or password. Please make sure you have created an admin user in your Supabase Dashboard under Authentication > Users. The default credentials are: email: admin@activesoft.com, password: admin123'
          }
        }
        
        if (error.message.includes('Email not confirmed')) {
          return {
            user: null,
            session: null,
            error: 'Please confirm your email address before signing in. Check your email or create a confirmed user in Supabase Dashboard.'
          }
        }
        
        return {
          user: null,
          session: null,
          error: this.getAuthErrorMessage(error.message)
        }
      }

      if (data.session) {
        this.currentSession = data.session
        await this.loadUserProfile(data.user.id)
        
        // Log successful sign in
        await this.logUserActivity('sign_in', data.user.id)
      }

      return {
        user: this.currentUser,
        session: data.session,
        error: null
      }
    } catch (error) {
      console.error('Sign in failed:', error)
      return {
        user: null,
        session: null,
        error: 'Sign in failed. Please check your internet connection and try again. If the problem persists, verify that your Supabase credentials are correctly configured in your .env file.'
      }
    }
  }

  // Sign up new user (for admin use)
  async signUp(email: string, password: string, username: string = 'user', role: string = 'admin'): Promise<AuthResponse> {
    try {
      // Input validation
      if (!email || !password) {
        return {
          user: null,
          session: null,
          error: 'Email and password are required'
        }
      }

      if (!this.isValidEmail(email)) {
        return {
          user: null,
          session: null,
          error: 'Invalid email format'
        }
      }

      if (password.length < 8) {
        return {
          user: null,
          session: null,
          error: 'Password must be at least 8 characters long'
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            username,
            role
          }
        }
      })

      if (error) {
        console.error('Sign up error:', error)
        return {
          user: null,
          session: null,
          error: this.getAuthErrorMessage(error.message)
        }
      }

      return {
        user: null, // User needs to confirm email first
        session: data.session,
        error: null
      }
    } catch (error) {
      console.error('Sign up failed:', error)
      return {
        user: null,
        session: null,
        error: 'Sign up failed. Please try again.'
      }
    }
  }

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    try {
      if (this.currentUser) {
        await this.logUserActivity('sign_out', this.currentUser.id)
      }

      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        return { error: 'Failed to sign out' }
      }

      this.currentUser = null
      this.currentSession = null

      return { error: null }
    } catch (error) {
      console.error('Sign out failed:', error)
      return { error: 'Sign out failed' }
    }
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    return this.currentUser
  }

  // Get current session
  getCurrentSession(): Session | null {
    return this.currentSession
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentSession !== null
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    return this.currentUser?.role === role
  }

  // Validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Get user-friendly error messages
  private getAuthErrorMessage(error: string): string {
    const errorMap: Record<string, string> = {
      'Invalid login credentials': 'Invalid email or password. Please check your credentials or ensure the admin user has been created in Supabase Dashboard.',
      'Email not confirmed': 'Please check your email and confirm your account',
      'Too many requests': 'Too many login attempts. Please try again later.',
      'User not found': 'No account found with this email address',
      'Signup disabled': 'Account creation is currently disabled',
      'Password should be at least 6 characters': 'Password must be at least 6 characters long',
      'Unable to validate email address: invalid format': 'Please enter a valid email address',
      'Database error saving new user': 'Account creation failed. Please try again.',
      'User already registered': 'An account with this email already exists'
    }

    return errorMap[error] || `Authentication error: ${error}`
  }

  // Log user activity
  private async logUserActivity(action: string, userId: string): Promise<void> {
    try {
      await supabase
        .from('user_activity_logs')
        .insert({
          user_id: userId,
          action,
          timestamp: new Date().toISOString(),
          ip_address: await this.getClientIP(),
          user_agent: navigator.userAgent
        })
    } catch (error) {
      console.error('Failed to log user activity:', error)
    }
  }

  // Get client IP (simplified)
  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip || 'unknown'
    } catch {
      return 'unknown'
    }
  }
}

export const authService = new AuthService()