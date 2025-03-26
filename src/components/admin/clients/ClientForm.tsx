import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Client } from '../../../types/client';

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  logo: z.string().url('Must be a valid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: ClientFormData) => void;
  onCancel?: () => void;
}

const ClientForm = ({ client, onSubmit, onCancel }: ClientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: client,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
        <input
          type="url"
          {...register('logo')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
        />
        {errors.logo && (
          <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
        >
          {client ? 'Update Client' : 'Add Client'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ClientForm;