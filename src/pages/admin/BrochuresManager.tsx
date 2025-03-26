import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Pencil, Trash2 } from 'lucide-react';
import { useBrochureStore } from '../../store/brochureStore';
import type { Brochure } from '../../types/brochure';

const brochureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type BrochureFormData = z.infer<typeof brochureSchema>;

const BrochuresManager = () => {
  const { brochures, addBrochure, updateBrochure, deleteBrochure } = useBrochureStore();
  const [editingBrochure, setEditingBrochure] = useState<Brochure | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrochureFormData>({
    resolver: zodResolver(brochureSchema),
    defaultValues: editingBrochure || undefined,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: BrochureFormData) => {
    if (!selectedFile && !editingBrochure) {
      alert('Please select a file');
      return;
    }

    if (editingBrochure) {
      updateBrochure(editingBrochure.id, {
        ...data,
        file: selectedFile || editingBrochure.file,
      });
      setEditingBrochure(null);
    } else {
      addBrochure({
        ...data,
        file: selectedFile!,
      });
    }
    reset();
    setSelectedFile(null);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Brochures</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingBrochure ? 'Edit Brochure' : 'Add New Brochure'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brochure Name
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Upload Brochure (PDF)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#04968d] transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#04968d] hover:text-opacity-80 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                {editingBrochure ? 'Update Brochure' : 'Add Brochure'}
              </button>
              {editingBrochure && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBrochure(null);
                    reset();
                    setSelectedFile(null);
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
          <h2 className="text-xl font-semibold mb-4">Current Brochures</h2>
          <div className="space-y-4">
            {brochures.map((brochure) => (
              <div
                key={brochure.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{brochure.name}</h3>
                    <p className="text-sm text-gray-500">
                      Added: {new Date(brochure.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingBrochure(brochure)}
                      className="text-[#04968d] hover:text-opacity-80"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteBrochure(brochure.id)}
                      className="text-red-500 hover:text-opacity-80"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochuresManager;