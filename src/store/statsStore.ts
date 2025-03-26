import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StatsState {
  visitors: number;
  incrementVisitors: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      visitors: 0,
      incrementVisitors: () => set((state) => ({ visitors: state.visitors + 1 })),
    }),
    {
      name: 'stats-storage',
    }
  )
);