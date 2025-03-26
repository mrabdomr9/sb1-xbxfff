import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserStore } from '../../store/userStore';
import { Trash2, Edit } from 'lucide-react';

const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'editor']),
});

type UserFormData = z.infer<typeof userSchema>;

const UserManager = () => {
  const { users, addUser, updateUser, deleteUser } = useUserStore();
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateUser(editingUser.id, data);
      setEditingUser(null);
    } else {
      addUser(data);
    }
    reset();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                {...register('username')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                {...register('role')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{user.username}</h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-[#04968d] hover:text-opacity-80"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-opacity-80"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;