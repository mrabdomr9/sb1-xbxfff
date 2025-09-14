import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  
  console.log('ProtectedRoute check - User:', user);
  console.log('Current location:', location);

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log('User authenticated, allowing access');
  return <>{children}</>;
};

export default ProtectedRoute;