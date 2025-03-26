import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validations/authValidation';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';
import type { LoginFormData } from '../types/auth';

export const useAuthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const findUserByEmail = useUserStore((state) => state.findUserByEmail);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const user = findUserByEmail(data.email);
      
      if (user && user.password === data.password) {
        const { password, ...userWithoutPassword } = user;
        setAuth(userWithoutPassword, 'mock-jwt-token');
        navigate('/admin');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting,
    error,
  };
};