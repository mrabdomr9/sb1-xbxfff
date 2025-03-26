import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminUser } from '../types/user';

interface UserState {
  users: AdminUser[];
  addUser: (user: Omit<AdminUser, 'id'>) => void;
  updateUser: (id: string, user: Omit<AdminUser, 'id'>) => void;
  deleteUser: (id: string) => void;
  findUserByEmail: (email: string) => AdminUser | undefined;
}

// Initial admin users
const initialUsers: AdminUser[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@activesoft.com',
    password: 'admin123', // In production, this should be hashed
    role: 'admin',
  },
  {
    id: '2',
    username: 'editor',
    email: 'editor@activesoft.com',
    password: 'editor123',
    role: 'editor',
  }
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, { ...user, id: Date.now().toString() }],
        })),
      updateUser: (id, user) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...user, id } : u
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),
      findUserByEmail: (email) => {
        return get().users.find(user => user.email === email);
      }
    }),
    {
      name: 'users-storage',
    }
  )
);