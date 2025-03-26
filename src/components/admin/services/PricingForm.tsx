import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const pricingSchema = z.object({
  startingAt: z.number().min(0, 'Price must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  billingPeriod: z.string().min(1, 'Billing period is required'),
});

type PricingFormData = z.infer<typeof pricingSchema>;

interface PricingFormProps {
  initialData?: PricingFormData;
  onSubmit: (data: PricingFormData) => void;
  onCancel: () => void;
}

const currencies = [
  { value: 'EGP', label: 'EGP - Egyptian Pound' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

const PricingForm = ({ initialData, onSubmit, onCancel }: PricingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PricingFormData>({
    resolver: zodResolver(pricingSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Starting Price</label>
        <input
          type="number"
          {...register('startingAt', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
        />
        {errors.startingAt && (
          <p className="text-red-500 text-sm mt-1">{errors.startingAt.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <select
          {...register('currency')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
        >
          {currencies.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.currency && (
          <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Billing Period</label>
        <select
          {...register('billingPeriod')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04968d] focus:ring-[#04968d]"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
        {errors.billingPeriod && (
          <p className="text-red-500 text-sm mt-1">{errors.billingPeriod.message}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-[#04968d] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
        >
          Save Pricing
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PricingForm;