// File: client/encode-front-end/src/context/AuthContext.tsx
// This file contains AuthContext component
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // placeholder, replace with actual user type
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    apiService.getUserData().then((response: { data: any; }) => {
      setIsAuthenticated(true);
      setUser(response.data);
    }).catch(() => {
      setIsAuthenticated(false);
      setUser(null);
    });
  }, []);

  const login = () => {
    apiService.login();
  };

  const logout = () => {
    apiService.logout().then(() => {
      setIsAuthenticated(false);
      setUser(null);

      window.location.href = '/';
    }).catch((error: any) => console.error('Logout failed', error));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
