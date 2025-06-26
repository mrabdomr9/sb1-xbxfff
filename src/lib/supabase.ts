import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database operations
export const dbOperations = {
  // Services
  async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createService(service: any) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateService(id: string, service: any) {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data
  },

  async createProject(project: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateProject(id: string, project: any) {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Clients
  async getClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createClient(client: any) {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateClient(id: string, client: any) {
    const { data, error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Partners
  async getPartners() {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createPartner(partner: any) {
    const { data, error } = await supabase
      .from('partners')
      .insert([partner])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updatePartner(id: string, partner: any) {
    const { data, error } = await supabase
      .from('partners')
      .update(partner)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deletePartner(id: string) {
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Brochures
  async getBrochures() {
    const { data, error } = await supabase
      .from('brochures')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createBrochure(brochure: any) {
    const { data, error } = await supabase
      .from('brochures')
      .insert([brochure])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateBrochure(id: string, brochure: any) {
    const { data, error } = await supabase
      .from('brochures')
      .update(brochure)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteBrochure(id: string) {
    const { error } = await supabase
      .from('brochures')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Contact submissions
  async getContactSubmissions() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createContactSubmission(submission: any) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submission])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteContactSubmission(id: string) {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Settings
  async getSettings() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateSettings(settings: any) {
    const { data, error } = await supabase
      .from('settings')
      .upsert(settings)
      .select()
    
    if (error) throw error
    return data[0]
  }
}