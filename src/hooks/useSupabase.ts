import { useState, useEffect, useCallback } from 'react';
import { dbOperations, handleSupabaseError, handleSupabaseSuccess } from '../lib/supabase';

// Generic hook for database operations
export const useSupabaseQuery = <T>(
  queryFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await queryFn();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Supabase query error:', err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Services hooks
export const useServices = () => {
  return useSupabaseQuery(() => dbOperations.getServices());
};

export const useServiceMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createService = async (service: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.createService(service);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, service: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.updateService(id, service);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await dbOperations.deleteService(id);
      return handleSupabaseSuccess(null);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return {
    createService,
    updateService,
    deleteService,
    loading,
    error
  };
};

// Portfolio hooks
export const usePortfolioProjects = () => {
  return useSupabaseQuery(() => dbOperations.getPortfolioProjects());
};

export const usePortfolioMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (project: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.createPortfolioProject(project);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, project: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.updatePortfolioProject(id, project);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await dbOperations.deletePortfolioProject(id);
      return handleSupabaseSuccess(null);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    loading,
    error
  };
};

// Contact submissions hooks
export const useContactSubmissions = () => {
  return useSupabaseQuery(() => dbOperations.getContactSubmissions());
};

export const useContactMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubmission = async (submission: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.createContactSubmission(submission);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string, repliedBy?: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.updateContactStatus(id, status, repliedBy);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await dbOperations.deleteContactSubmission(id);
      return handleSupabaseSuccess(null);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSubmission,
    updateStatus,
    deleteSubmission,
    loading,
    error
  };
};

// Content management hooks
export const useContentSections = () => {
  return useSupabaseQuery(() => dbOperations.getContentSections());
};

export const useContentByCategory = (category: string) => {
  return useSupabaseQuery(() => dbOperations.getContentByCategory(category), [category]);
};

export const useContentByName = (sectionName: string) => {
  return useSupabaseQuery(() => dbOperations.getContentByName(sectionName), [sectionName]);
};

export const useContentMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContent = async (content: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.createContentSection(content);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, content: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.updateContentSection(id, content);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await dbOperations.deleteContentSection(id);
      return handleSupabaseSuccess(null);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return {
    createContent,
    updateContent,
    deleteContent,
    loading,
    error
  };
};

// Company settings hooks
export const useCompanySettings = () => {
  return useSupabaseQuery(() => dbOperations.getCompanySettings());
};

export const usePublicSettings = () => {
  return useSupabaseQuery(() => dbOperations.getPublicSettings());
};

export const useSettingByKey = (key: string) => {
  return useSupabaseQuery(() => dbOperations.getSetting(key), [key]);
};

export const useSettingsMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSetting = async (key: string, value: string, settingType: string = 'string') => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.updateSetting(key, value, settingType);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateSetting,
    loading,
    error
  };
};

// Analytics hooks
export const useAnalytics = (startDate?: string, endDate?: string) => {
  return useSupabaseQuery(() => dbOperations.getAnalytics(startDate, endDate), [startDate, endDate]);
};

export const useAnalyticsTracking = () => {
  const trackEvent = useCallback(async (eventType: string, eventData: any = {}) => {
    try {
      await dbOperations.trackEvent(eventType, eventData);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, []);

  return { trackEvent };
};

// Admin authentication hook
export const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await dbOperations.login(username, password);
      return handleSupabaseSuccess(result);
    } catch (err: any) {
      const errorResult = handleSupabaseError(err);
      setError(errorResult.error);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error
  };
};