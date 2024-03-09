// File: client/encode-front-end/src/components/ProtectedRoute.tsx
// This file contains ProtectedRoute component

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRouteProps } from '../interfaces/ProtectedRouteProps';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Use the hook to get the current auth state
    
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };
  
export default ProtectedRoute;
