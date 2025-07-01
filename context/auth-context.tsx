// context/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5115';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
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
      fetchUserInfo(token)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  async function fetchUserInfo(token: string) {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user info. Status: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user info:', error);
      localStorage.removeItem('cyrlab-token');
      setUser(null);
      throw error;
    }
  }

  async function login(userName: string, password: string) {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ userName, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `Login failed with status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const { token } = data;

      if (!token) {
        throw new Error('No token received from server');
      }

      // Store token
      localStorage.setItem('cyrlab-token', token);
      
      // Get user info
      await fetchUserInfo(token);
    } catch (error) {
      console.error('Login error:', error);
      // Re-throw the error with a more descriptive message
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(`Unable to connect to the server at ${API_URL}. Please check your internet connection or try again later.`);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      const token = localStorage.getItem('cyrlab-token');
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': window.location.origin
          },
          mode: 'cors',
          credentials: 'include'
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('cyrlab-token');
      setUser(null);
      router.push('/login');
    }
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