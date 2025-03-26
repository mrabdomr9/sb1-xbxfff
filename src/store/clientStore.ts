import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Client } from '../types/client';

interface ClientState {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, client: Omit<Client, 'id'>) => void;
  deleteClient: (id: string) => void;
}

const initialClients: Client[] = [
  {
    id: '1',
    name: "Tech Corp International",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop",
    description: "Leading technology corporation implementing Oracle ERP for global operations across 15 countries."
  },
  {
    id: '2',
    name: "Innovation Systems",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    description: "Pioneering software company utilizing our custom desktop solutions for advanced workflow management."
  },
  {
    id: '3',
    name: "Global Solutions Ltd",
    logo: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=600&h=400&fit=crop",
    description: "Multinational corporation with successful enterprise-wide Oracle ERP implementation."
  },
  {
    id: '4',
    name: "Smart Manufacturing Co",
    logo: "https://images.unsplash.com/photo-1565343122430-6c24b461896b?w=600&h=400&fit=crop",
    description: "Industry leader in smart manufacturing solutions powered by our integrated ERP systems."
  },
  {
    id: '5',
    name: "Healthcare Plus",
    logo: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
    description: "Leading healthcare provider using our custom medical practice management software."
  },
  {
    id: '6',
    name: "EduTech Solutions",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    description: "Educational technology company revolutionizing learning with our school management system."
  },
  {
    id: '7',
    name: "Retail Chain Corp",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    description: "Major retail chain utilizing our inventory management and POS solutions across 200+ stores."
  },
  {
    id: '8',
    name: "Logistics Pro",
    logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop",
    description: "Leading logistics company streamlining operations with our supply chain management system."
  }
];

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      clients: initialClients,
      addClient: (client) =>
        set((state) => ({
          clients: [...state.clients, { ...client, id: Date.now().toString() }],
        })),
      updateClient: (id, client) =>
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...client, id } : c
          ),
        })),
      deleteClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'clients-storage',
    }
  )
);