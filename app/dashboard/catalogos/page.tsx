'use client';

import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Package,
  Tag,
  LayoutGrid,
  Users,
  UserCircle,
  UserCheck,
} from 'lucide-react';

export default function Catalogos() {
  const { user } = useAuth();

  // Double-check permissions (also handled at layout level)
  if (user?.roles.includes('Admin')) {
    redirect('/dashboard');
    return null;
  }

  const catalogItems = [
    {
      title: 'Productos',
      href: '/dashboard/catalogos/productos',
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: 'Marcas',
      href: '/dashboard/catalogos/marcas',
      icon: <Tag className="h-5 w-5" />,
    },
    {
      title: 'Categorías',
      href: '/dashboard/catalogos/categorias',
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      title: 'Clientes',
      href: '/dashboard/catalogos/clientes',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Tipos de Clientes',
      href: '/dashboard/catalogos/tipos-clientes',
      icon: <UserCircle className="h-5 w-5" />,
    },
    {
      title: 'Vendedores',
      href: '/dashboard/catalogos/vendedores',
      icon: <UserCheck className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Catálogos</h1>
      <p className="text-muted-foreground">
        Administra los catálogos del sistema
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {catalogItems.map((item) => (
          <div 
            key={item.title}
            className="rounded-lg border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                {item.icon}
              </div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Administra el catálogo de {item.title.toLowerCase()}
            </p>
            <Button asChild className="w-full bg-[#2b40b6] hover:bg-[#4f94d6]">
              <Link href={item.href}>Administrar</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}