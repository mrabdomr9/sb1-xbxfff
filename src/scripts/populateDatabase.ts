import { supabase } from '../lib/database/config';
import { portfolioServices, portfolioProjects, portfolioClients } from '../data/portfolioData';

// Function to populate services
async function populateServices() {
  console.log('Populating services...');
  
  for (const service of portfolioServices) {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select();
      
      if (error) {
        console.error('Error inserting service:', service.title, error);
      } else {
        console.log('Successfully inserted service:', service.title);
      }
    } catch (err) {
      console.error('Exception inserting service:', service.title, err);
    }
  }
}

// Function to populate projects
async function populateProjects() {
  console.log('Populating projects...');
  
  for (const project of portfolioProjects) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: project.title,
          description: project.description,
          image: project.image,
          order_index: project.orderIndex
        }])
        .select();
      
      if (error) {
        console.error('Error inserting project:', project.title, error);
      } else {
        console.log('Successfully inserted project:', project.title);
      }
    } catch (err) {
      console.error('Exception inserting project:', project.title, err);
    }
  }
}

// Function to populate clients
async function populateClients() {
  console.log('Populating clients...');
  
  for (const client of portfolioClients) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          name: client.name,
          logo: client.logo,
          description: client.description
        }])
        .select();
      
      if (error) {
        console.error('Error inserting client:', client.name, error);
      } else {
        console.log('Successfully inserted client:', client.name);
      }
    } catch (err) {
      console.error('Exception inserting client:', client.name, err);
    }
  }
}

// Main function to populate all data
export async function populateAllPortfolioData() {
  try {
    console.log('Starting portfolio data population...');
    
    // Clear existing data first (optional)
    const clearExisting = confirm('Do you want to clear existing data before populating? This will delete all current services, projects, and clients.');
    
    if (clearExisting) {
      console.log('Clearing existing data...');
      await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('clients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      console.log('Existing data cleared.');
    }
    
    // Populate all data
    await populateServices();
    await populateProjects();
    await populateClients();
    
    console.log('Portfolio data population completed successfully!');
    return { success: true, message: 'All portfolio data has been successfully added to the database.' };
    
  } catch (error) {
    console.error('Error populating portfolio data:', error);
    return { success: false, error: error.message };
  }
}

// Auto-execute if running directly
if (typeof window !== 'undefined') {
  // Browser environment - expose function globally
  (window as any).populatePortfolioData = populateAllPortfolioData;
}