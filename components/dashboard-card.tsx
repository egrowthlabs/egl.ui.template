'use client';

import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  adminOnly?: boolean;
}

export function DashboardCard({
  title,
  description,
  icon,
  href,
  adminOnly = false,
}: DashboardCardProps) {
  const { user } = useAuth();
  
  if (adminOnly && !user?.roles.includes('Admin')) {
    return (
      <div className="rounded-lg border bg-card/50 p-6 animate-fade-up">
        <div className="flex items-center gap-4 opacity-50">
          <div className="rounded-full bg-[#2b40b6]/10 p-3 text-[#2b40b6]">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">Acceso Restringido</h3>
            <p className="text-sm text-muted-foreground">Esta sección requiere permisos de administrador</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#2b40b6]/10 p-3 text-[#2b40b6] transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold transition-colors duration-300 group-hover:text-primary">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#2b40b6] transition-all duration-300 group-hover:w-full"></div>
      </div>
    </Link>
  );
}