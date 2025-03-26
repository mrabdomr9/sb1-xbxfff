import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LogoState {
  logo: string | null;
  updateLogo: (newLogo: string) => void;
}

export const useLogoStore = create<LogoState>()(
  persist(
    (set) => ({
      logo: null,
      updateLogo: (newLogo) => set({ logo: newLogo }),
    }),
    {
      name: 'logo-storage',
    }
  )
);