import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Brochure } from '../types/brochure';

interface BrochureState {
  brochures: Brochure[];
  addBrochure: (brochure: Omit<Brochure, 'id' | 'createdAt'>) => void;
  updateBrochure: (id: string, brochure: Partial<Brochure>) => void;
  deleteBrochure: (id: string) => void;
}

const initialBrochures: Brochure[] = [
  {
    id: '1',
    name: 'Oracle ERP Implementation Guide',
    file: 'https://example.com/brochures/oracle-erp.pdf',
    createdAt: '2024-03-15T10:00:00.000Z'
  },
  {
    id: '2',
    name: 'Desktop Solutions Catalog',
    file: 'https://example.com/brochures/desktop-solutions.pdf',
    createdAt: '2024-03-14T10:00:00.000Z'
  },
  {
    id: '3',
    name: 'Financial Management System Overview',
    file: 'https://example.com/brochures/financial-system.pdf',
    createdAt: '2024-03-13T10:00:00.000Z'
  },
  {
    id: '4',
    name: 'HR Management Solutions',
    file: 'https://example.com/brochures/hr-solutions.pdf',
    createdAt: '2024-03-12T10:00:00.000Z'
  },
  {
    id: '5',
    name: 'Inventory Control System Guide',
    file: 'https://example.com/brochures/inventory-system.pdf',
    createdAt: '2024-03-11T10:00:00.000Z'
  },
  {
    id: '6',
    name: 'Business Intelligence Solutions',
    file: 'https://example.com/brochures/bi-solutions.pdf',
    createdAt: '2024-03-10T10:00:00.000Z'
  },
  {
    id: '7',
    name: 'Supply Chain Management Overview',
    file: 'https://example.com/brochures/scm-overview.pdf',
    createdAt: '2024-03-09T10:00:00.000Z'
  },
  {
    id: '8',
    name: 'Cloud Integration Services',
    file: 'https://example.com/brochures/cloud-integration.pdf',
    createdAt: '2024-03-08T10:00:00.000Z'
  }
];

export const useBrochureStore = create<BrochureState>()(
  persist(
    (set) => ({
      brochures: initialBrochures,
      addBrochure: (brochure) =>
        set((state) => ({
          brochures: [
            {
              ...brochure,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
            ...state.brochures,
          ],
        })),
      updateBrochure: (id, brochure) =>
        set((state) => ({
          brochures: state.brochures.map((b) =>
            b.id === id ? { ...b, ...brochure } : b
          ),
        })),
      deleteBrochure: (id) =>
        set((state) => ({
          brochures: state.brochures.filter((b) => b.id !== id),
        })),
    }),
    {
      name: 'brochures-storage',
    }
  )
);