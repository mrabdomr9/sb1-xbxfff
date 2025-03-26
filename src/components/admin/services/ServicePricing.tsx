import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import PricingForm from './PricingForm';
import type { Service } from '../../../types/service';

interface ServicePricingProps {
  service: Service;
  onUpdatePricing: (serviceId: string, pricing: Service['pricing']) => void;
}

const ServicePricing = ({ service, onUpdatePricing }: ServicePricingProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data: NonNullable<Service['pricing']>) => {
    onUpdatePricing(service.id, data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-[#04968d] mb-4">Edit Pricing</h4>
        <PricingForm
          initialData={service.pricing}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[#04968d]">Pricing</h4>
        <button
          onClick={() => setIsEditing(true)}
          className="text-[#04968d] hover:text-opacity-80"
        >
          <Edit className="h-5 w-5" />
        </button>
      </div>
      {service.pricing ? (
        <p className="text-gray-600 mt-2">
          Starting at ${service.pricing.startingAt}/{service.pricing.billingPeriod}
          <span className="text-sm text-gray-500 ml-2">({service.pricing.currency})</span>
        </p>
      ) : (
        <p className="text-gray-500 mt-2 italic">No pricing set</p>
      )}
    </div>
  );
};

export default ServicePricing;