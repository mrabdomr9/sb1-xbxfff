import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuthForm } from '../../hooks/useAuthForm';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const LoginForm = () => {
  const { form, handleSubmit, isSubmitting, error } = useAuthForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            {...register('email')}
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            required
          />
          
          <Input
            {...register('password')}
            type="password"
            label="Password"
            placeholder="Enter your password"
            icon={<Lock className="w-5 h-5" />}
            error={errors.password?.message}
            required
          />

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;