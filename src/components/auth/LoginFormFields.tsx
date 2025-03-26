import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../validations/authValidation';
import type { LoginFormData } from '../../types/auth';
import InputField from '../common/InputField';

interface LoginFormFieldsProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isSubmitting: boolean;
}

const LoginFormFields = ({ onSubmit, isSubmitting }: LoginFormFieldsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <InputField
          {...register('email')}
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
        />
        
        <InputField
          {...register('password')}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#04968d] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#04968d] disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginFormFields;