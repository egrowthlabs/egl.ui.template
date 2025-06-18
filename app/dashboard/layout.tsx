'use client';

import { useEffect } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useAuth } from '@/context/auth-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    // Check if user is trying to access admin-only routes
    const isAdminRoute = 
      pathname.includes('/usuarios') ||
      pathname.includes('/reportes') ||
      pathname.includes('/catalogos');
    
    if (!isLoading && isAdminRoute && !user?.roles.includes('Admin')) {
      router.push('/dashboard');
    }
  }, [isLoading, user, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[#2b40b6]"></div>
      </div>
    );
  }

  // Return loading state while redirect is happening
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[#2b40b6]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}