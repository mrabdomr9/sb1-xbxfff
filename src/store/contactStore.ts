import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ContactSubmission } from '../types/contact';

interface ContactState {
  submissions: ContactSubmission[];
  addSubmission: (submission: Omit<ContactSubmission, 'id' | 'createdAt'>) => void;
  deleteSubmission: (id: string) => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      submissions: [],
      addSubmission: (submission) =>
        set((state) => ({
          submissions: [
            {
              ...submission,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
            ...state.submissions,
          ],
        })),
      deleteSubmission: (id) =>
        set((state) => ({
          submissions: state.submissions.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'contact-storage',
    }
  )
);