
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};
