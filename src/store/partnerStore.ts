import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Partner } from '../types/partner';

interface PartnerState {
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, partner: Omit<Partner, 'id'>) => void;
  deletePartner: (id: string) => void;
}

const initialPartners: Partner[] = [
  {
    id: '1',
    name: "Oracle Corporation",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
  },
  {
    id: '2',
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1642132652075-2b0bfb5378ae?w=200&h=100&fit=crop",
  },
  {
    id: '3',
    name: "SAP",
    logo: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=200&h=100&fit=crop",
  },
  {
    id: '4',
    name: "IBM",
    logo: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=200&h=100&fit=crop",
  }
];

export const usePartnerStore = create<PartnerState>()(
  persist(
    (set) => ({
      partners: initialPartners,
      addPartner: (partner) =>
        set((state) => ({
          partners: [...state.partners, { ...partner, id: Date.now().toString() }],
        })),
      updatePartner: (id, partner) =>
        set((state) => ({
          partners: state.partners.map((p) =>
            p.id === id ? { ...partner, id } : p
          ),
        })),
      deletePartner: (id) =>
        set((state) => ({
          partners: state.partners.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'partners-storage',
    }
  )
);