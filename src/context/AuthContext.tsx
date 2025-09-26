'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Models } from 'appwrite';
import authService from '@/appwrite/auth';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>; // Return success status
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  // Check initial auth status
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        // Redirect to dashboard if user is already logged in
        // if (currentUser) {
        //   router.replace('/dashboard'); // Use replace to avoid back button issues
        // }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setIsHydrated(true);
      }
    };

    initializeAuth();
  }, [router]);
   // Handle navigation based on auth status
  useEffect(() => {
    if (!loading && isHydrated) {
      // If user is authenticated and on auth pages, redirect to dashboard
      if (user && (pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/')) {
        router.replace('/dashboard');
      }
      // If user is not authenticated and on protected pages, redirect to home
      else if (!user && pathname.startsWith('/dashboard')) {
        router.replace('/');
      }
    }
  }, [user, loading, isHydrated, pathname, router]);


  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      await authService.login({ email, password });
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(currentUser));
        router.push("/dashboard")
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      localStorage.removeItem('user');
      
      throw error; // Re-throw to be handled by the calling component
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string): Promise<boolean> => {
    setLoading(true);
    try {
      await authService.createAccount({ email, password });
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
        router.push('/sign-in')
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      localStorage.removeItem('user');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner during hydration
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};