import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import { useServices } from '../../hooks/useDatabase';
import { useFormAutoSave } from '../../hooks/useFormAutoSave';
import ServicePricing from '../../components/admin/services/ServicePricing';
import AutoSaveIndicator from '../../components/admin/AutoSaveIndicator';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  target_audience: z.array(z.string()).min(1, 'At least one target audience is required'),
  benefits: z.array(z.string()).min(1, 'At least one benefit is required'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const ServicesManager = () => {
  const { services, createService, updateService, deleteService, isLoading, error } = useServices();
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      features: [''],
      target_audience: [''],
      benefits: ['']
    }
  });

  const watchedData = watch();

  // Auto-save functionality for form data
  const autoSave = useFormAutoSave({
    formData: watchedData,
    onSave: async (data) => {
      if (!editingService) return { success: false, error: 'No service selected for editing' };
      
      try {
        const result = await updateService(editingService.id, {
          ...data,
          pricing: editingService.pricing
        });
        
        if (result) {
          return { success: true };
        } else {
          return { success: false, error: 'Failed to save service' };
        }
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    },
    validationSchema: serviceSchema,
    enableAutoSave: !!editingService, // Only auto-save when editing
    debounceMs: 3000
  });

  const watchedFeatures = watch('features');
  const watchedTargetAudience = watch('target_audience');
  const watchedBenefits = watch('benefits');

  const handleUpdatePricing = async (serviceId: string, pricing: any) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      await updateService(serviceId, { ...service, pricing });
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      if (editingService) {
        await updateService(editingService.id, {
          ...data,
          pricing: editingService.pricing
        });
        setEditingService(null);
      } else {
        await createService(data);
      }
      reset({
        features: [''],
        target_audience: [''],
        benefits: ['']
      });
    } catch (error) {
      console.error('Failed to save service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (service: any) => {
    setEditingService(service);
    setValue('title', service.title);
    setValue('description', service.description);
    setValue('features', service.features || ['']);
    setValue('target_audience', service.target_audience || ['']);
    setValue('benefits', service.benefits || ['']);
  };

  const cancelEditing = () => {
    setEditingService(null);
    reset({
      features: [''],
      target_audience: [''],
      benefits: ['']
    });
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
    }
  };

  const addArrayField = (field: 'features' | 'target_audience' | 'benefits') => {
    const currentValues = field === 'features' 
      ? watchedFeatures 
      : field === 'target_audience' 
        ? watchedTargetAudience 
        : watchedBenefits;
    
    setValue(field, [...currentValues, '']);
  };

  const removeArrayField = (field: 'features' | 'target_audience' | 'benefits', index: number) => {
    const currentValues = field === 'features' 
      ? watchedFeatures 
      : field === 'target_audience' 
        ? watchedTargetAudience 
        : watchedBenefits;
    
    if (currentValues.length > 1) {
      const newValues = currentValues.filter((_, i) => i !== index);
      setValue(field, newValues);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#04968d]" />
          <span className="ml-2 text-gray-600">Loading services...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error loading services: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        {editingService && (
          <AutoSaveIndicator
            isSaving={autoSave.isSaving}
            lastSaved={autoSave.lastSaved}
            hasUnsavedChanges={autoSave.hasUnsavedChanges}
            saveError={autoSave.saveError}
            onForceSave={autoSave.forceSave}
            onRetry={autoSave.forceSave}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h2>
          
          {editingService && autoSave.validationErrors.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-red-800 font-medium mb-2">Validation Errors:</h4>
              <ul className="text-red-700 text-sm list-disc list-inside">
                {autoSave.validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                {...register('title')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
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

            {/* Dynamic Arrays */}
            {(['features', 'target_audience', 'benefits'] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
                  {field.replace('_', ' ')}
                </label>
                <div className="space-y-2">
                  {(field === 'features' ? watchedFeatures : 
                    field === 'target_audience' ? watchedTargetAudience : 
                    watchedBenefits).map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        {...register(`${field}.${index}`)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
                        placeholder={`Enter ${field.replace('_', ' ')}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField(field, index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField(field)}
                    className="text-[#04968d] text-sm hover:text-opacity-80"
                  >
                    + Add {field.replace('_', ' ')}
                  </button>
                </div>
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]?.message}</p>
                )}
              </div>
            ))}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50 flex items-center"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editingService ? 'Update Service' : 'Add Service'}
              </button>
              {editingService && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Services</h2>
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h3 className="text-xl font-semibold text-[#213c4d]">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-[#04968d] mb-2">Features</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.features?.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-[#04968d] mb-2">Target Audience</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.target_audience?.map((audience: string, index: number) => (
                      <li key={index}>{audience}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-[#04968d] mb-2">Benefits</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.benefits?.map((benefit: string, index: number) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <ServicePricing
                  service={service}
                  onUpdatePricing={handleUpdatePricing}
                />

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => startEditing(service)}
                    className="text-[#04968d] hover:text-opacity-80"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
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

export default ServicesManager;