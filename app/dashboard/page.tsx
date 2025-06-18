import { DashboardCard } from '@/components/dashboard-card';
import {
  Users,
  ShoppingBag,
  Package,
  ClipboardList,
  BarChart3,
  Calendar,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Bienvenido al panel administrativo de CyrLab
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Productos"
          description="Gestiona el catálogo de productos"
          icon={<Package className="h-5 w-5" />}
          href="/dashboard/productos"
        />
        <DashboardCard
          title="Pedidos"
          description="Administra los pedidos de clientes"
          icon={<ShoppingBag className="h-5 w-5" />}
          href="/dashboard/pedidos"
        />
        <DashboardCard
          title="Mantenimientos"
          description="Seguimiento de mantenimientos programados"
          icon={<ClipboardList className="h-5 w-5" />}
          href="/dashboard/mantenimientos"
        />
        <DashboardCard
          title="Visitas"
          description="Registro de visitas a clientes"
          icon={<Calendar className="h-5 w-5" />}
          href="/dashboard/visitas"
        />
        <DashboardCard
          title="Usuarios"
          description="Administra los usuarios del sistema"
          icon={<Users className="h-5 w-5" />}
          href="/dashboard/usuarios"
          adminOnly
        />
        <DashboardCard
          title="Reportes"
          description="Visualiza reportes y estadísticas"
          icon={<BarChart3 className="h-5 w-5" />}
          href="/dashboard/reportes"
          adminOnly
        />
      </div>
    </div>
  );
}