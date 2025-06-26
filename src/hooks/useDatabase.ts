import { useEffect, useState } from 'react';
import { dbOperations } from '../lib/supabase';

export const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOperation = async <T>(operation: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Database operation failed:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleOperation,
    clearError: () => setError(null)
  };
};

// Custom hooks for each data type
export const useServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const { handleOperation, isLoading, error } = useDatabase();

  const loadServices = async () => {
    const data = await handleOperation(() => dbOperations.getServices());
    if (data) setServices(data);
  };

  const createService = async (service: any) => {
    const data = await handleOperation(() => dbOperations.createService(service));
    if (data) {
      setServices(prev => [data, ...prev]);
    }
    return data;
  };

  const updateService = async (id: string, service: any) => {
    const data = await handleOperation(() => dbOperations.updateService(id, service));
    if (data) {
      setServices(prev => prev.map(s => s.id === id ? data : s));
    }
    return data;
  };

  const deleteService = async (id: string) => {
    const success = await handleOperation(() => dbOperations.deleteService(id));
    if (success !== null) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
    return success;
  };

  useEffect(() => {
    loadServices();
  }, []);

  return {
    services,
    createService,
    updateService,
    deleteService,
    refreshServices: loadServices,
    isLoading,
    error
  };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { handleOperation, isLoading, error } = useDatabase();

  const loadProjects = async () => {
    const data = await handleOperation(() => dbOperations.getProjects());
    if (data) setProjects(data);
  };

  const createProject = async (project: any) => {
    const data = await handleOperation(() => dbOperations.createProject(project));
    if (data) {
      setProjects(prev => [data, ...prev]);
    }
    return data;
  };

  const updateProject = async (id: string, project: any) => {
    const data = await handleOperation(() => dbOperations.updateProject(id, project));
    if (data) {
      setProjects(prev => prev.map(p => p.id === id ? data : p));
    }
    return data;
  };

  const deleteProject = async (id: string) => {
    const success = await handleOperation(() => dbOperations.deleteProject(id));
    if (success !== null) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
    return success;
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects: loadProjects,
    isLoading,
    error
  };
};

// Similar hooks for clients, partners, brochures, etc.
export const useClients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const { handleOperation, isLoading, error } = useDatabase();

  const loadClients = async () => {
    const data = await handleOperation(() => dbOperations.getClients());
    if (data) setClients(data);
  };

  const createClient = async (client: any) => {
    const data = await handleOperation(() => dbOperations.createClient(client));
    if (data) {
      setClients(prev => [data, ...prev]);
    }
    return data;
  };

  const updateClient = async (id: string, client: any) => {
    const data = await handleOperation(() => dbOperations.updateClient(id, client));
    if (data) {
      setClients(prev => prev.map(c => c.id === id ? data : c));
    }
    return data;
  };

  const deleteClient = async (id: string) => {
    const success = await handleOperation(() => dbOperations.deleteClient(id));
    if (success !== null) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
    return success;
  };

  useEffect(() => {
    loadClients();
  }, []);

  return {
    clients,
    createClient,
    updateClient,
    deleteClient,
    refreshClients: loadClients,
    isLoading,
    error
  };
};