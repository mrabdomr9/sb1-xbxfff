import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  setAuth: (user: User, token: string) => void; // Updated to require user object
  clearAuth: () => void;
  setIsInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isInitialized: false,
      setAuth: (user, token) => {
        console.log('Setting auth in store:', { user, token });
        set({ user, token });
      },
      clearAuth: () => {
        console.log('Clearing auth from store');
        set({ user: null, token: null });
      },
      setIsInitialized: (initialized) => set({ isInitialized: initialized }),
    }),
    {
      name: 'auth-storage',
    }
  )
);