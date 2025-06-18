'use client';

import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export default function CatalogoProductos() {
  const { user } = useAuth();

  // Double-check permissions (also handled at layout level)
  if (user?.roles.includes('Admin')) {
    redirect('/dashboard');
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Catálogo - Productos</h1>
      <p className="text-muted-foreground">
        Administra el catálogo de productos
      </p>
      
      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Área restringida - Solo Administradores</h2>
        <p className="text-muted-foreground">
          Esta sección se encuentra en desarrollo. Pronto podrás administrar el catálogo de productos.
        </p>
      </div>
    </div>
  );
}