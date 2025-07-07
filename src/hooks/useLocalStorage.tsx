import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}

// Specialized hook for contact submissions
export function useContactSubmissions() {
  return useLocalStorage('contactSubmissions', []);
}

// Specialized hook for Oracle services
export function useOracleServices() {
  return useLocalStorage('oracleServices', []);
}

// Specialized hook for admin auth
export function useAdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isAdminLoggedIn', 'false');
  const [adminUser, setAdminUser] = useLocalStorage('adminUser', null);

  const login = (userData: any) => {
    setIsLoggedIn('true');
    setAdminUser(userData);
  };

  const logout = () => {
    setIsLoggedIn('false');
    setAdminUser(null);
  };

  return {
    isLoggedIn: isLoggedIn === 'true',
    adminUser,
    login,
    logout
  };
}