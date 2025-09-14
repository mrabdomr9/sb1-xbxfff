import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validations/authValidation';
import { useAuth } from './useDatabaseIntegration';
import type { LoginFormData } from '../types/auth';

export const useAuthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      console.log('Attempting to sign in with:', data.email);

      const result = await signIn(data.email, data.password);
      console.log('Sign in result:', result);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      console.log('Sign in successful, navigating to dashboard');
      navigate('/admin');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials and try again.';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    error,
  };
};