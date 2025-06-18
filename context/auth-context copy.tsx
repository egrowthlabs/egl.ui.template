'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/mock-services';

export interface User {
  id: string;
  userName: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('cyrlab-token');
    if (token) {
      authService.getCurrentUser(token)
        .then(userData => setUser(userData))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  async function login(userName: string, password: string) {
    try {
      setIsLoading(true);
      const { token, user } = await authService.login(userName, password);
      localStorage.setItem('cyrlab-token', token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    localStorage.removeItem('cyrlab-token');
    setUser(null);
    router.push('/login');
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}