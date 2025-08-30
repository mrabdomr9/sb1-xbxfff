import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { usePartners } from '../../hooks/useDatabaseIntegration';
import type { Partner } from '../../types/partner';

const partnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logo: z.string().url('Must be a valid logo URL'),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

const PartnersManager = () => {
  const { data: partners, create, update, remove, loading, error } = usePartners();
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: editingPartner || undefined,
  });

  const onSubmit = (data: PartnerFormData) => {
    if (editingPartner) {
      update(editingPartner.id, data);
      setEditingPartner(null);
    } else {
      create(data);
    }
    reset();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#04968d]" />
          <span className="ml-2 text-gray-600">Loading partners...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error loading partners: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Partners</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Partner Name</label>
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

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </button>
              {editingPartner && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingPartner(null);
                    reset();
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Partners</h2>
          <div className="grid grid-cols-2 gap-4">
            {(partners || []).map((partner) => (
              <div
                key={partner.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-24 object-contain mb-4"
                />
                <h3 className="text-lg font-medium text-center">{partner.name}</h3>
                <div className="mt-4 flex justify-center space-x-2">
                  <button
                    onClick={() => setEditingPartner(partner)}
                    className="text-[#04968d] hover:text-opacity-80"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => remove(partner.id)}
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

export default PartnersManager;