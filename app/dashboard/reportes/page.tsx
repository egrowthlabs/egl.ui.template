'use client';

import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export default function Reportes() {
  const { user } = useAuth();

  // Double-check permissions (also handled at layout level)
 if (!user?.roles?.includes('Admin')) {
  redirect('/dashboard');
  return null;
}

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
      <p className="text-muted-foreground">
        Visualiza reportes y estadísticas
      </p>
      
      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Área restringida - Solo Administradores</h2>
        <p className="text-muted-foreground">
          Esta sección se encuentra en desarrollo. Pronto podrás generar reportes y visualizar estadísticas.
        </p>
      </div>
    </div>
  );
}