import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Verify token with backend
      apiService.getUser()
        .then((userData) => {
          const user: User = {
            id: userData.id.toString(),
            email: userData.email,
            name: userData.name,
            isAuthenticated: true,
          };
          setUser(user);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('auth_token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login(email, password);
      const userData: User = {
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.name,
        isAuthenticated: true,
      };
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};