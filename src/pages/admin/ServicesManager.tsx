import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, Trash2 } from 'lucide-react';
import { useServicesStore } from '../../store/servicesStore';
import ServicePricing from '../../components/admin/services/ServicePricing';
import type { Service } from '../../types/service';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  targetAudience: z.array(z.string()).min(1, 'At least one target audience is required'),
  benefits: z.array(z.string()).min(1, 'At least one benefit is required'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const ServicesManager = () => {
  const { services, addService, updateService, deleteService } = useServicesStore();
  const [editingService, setEditingService] = useState<Service | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: editingService || {
      features: [''],
      targetAudience: [''],
      benefits: ['']
    }
  });

  const handleUpdatePricing = (serviceId: string, pricing: Service['pricing']) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService(serviceId, { ...service, pricing });
    }
  };

  const onSubmit = (data: ServiceFormData) => {
    if (editingService) {
      updateService(editingService.id, {
        ...data,
        pricing: editingService.pricing
      });
      setEditingService(null);
    } else {
      addService(data);
    }
    reset();
  };

  const startEditing = (service: Service) => {
    setEditingService(service);
    setValue('title', service.title);
    setValue('description', service.description);
    setValue('features', service.features);
    setValue('targetAudience', service.targetAudience);
    setValue('benefits', service.benefits);
  };

  const handleArrayField = (field: 'features' | 'targetAudience' | 'benefits', index: number, value: string) => {
    const currentValues = field === 'features' 
      ? services.features 
      : field === 'targetAudience' 
        ? services.targetAudience 
        : services.benefits;
    
    const newValues = [...currentValues];
    newValues[index] = value;
    setValue(field, newValues);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Services</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h2>
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
            {['features', 'targetAudience', 'benefits'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="space-y-2">
                  {register(field as 'features' | 'targetAudience' | 'benefits').value?.map((_, index) => (
                    <input
                      key={index}
                      {...register(`${field}.${index}`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
                      placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const currentValues = register(field as 'features' | 'targetAudience' | 'benefits').value || [];
                      setValue(field as 'features' | 'targetAudience' | 'benefits', [...currentValues, '']);
                    }}
                    className="text-[#04968d] text-sm hover:text-opacity-80"
                  >
                    + Add more
                  </button>
                </div>
              </div>
            ))}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                {editingService ? 'Update Service' : 'Add Service'}
              </button>
              {editingService && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
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
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-[#04968d] mb-2">Target Audience</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.targetAudience.map((audience, index) => (
                      <li key={index}>{audience}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-[#04968d] mb-2">Benefits</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.benefits.map((benefit, index) => (
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
                    onClick={() => deleteService(service.id)}
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