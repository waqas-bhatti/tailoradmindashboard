'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Yeh routes protect karega - agar user nahi hai to sign-in pe redirect karega
const protectedRoutes = ['/dashboard', '/dashboard/add-data', '/dashboard/user-history','/dashboard/invoice','/dashboard/trash','/dashboard/profile'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // Check if current route is protected and user is not authenticated
      const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
      );

      if (isProtectedRoute && !user) {
        router.push('/sign-in');
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Agar protected route hai aur user nahi hai, to kuch na dikhao
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute && !user) {
    return null; // Redirect handle ho raha hai
  }

  return <>{children}</>;
}