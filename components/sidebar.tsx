'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Package,
  ShoppingBag,
  ClipboardList,
  Users,
  BarChart3,
  Menu,
  Calendar,
  X,
  Database,
  ChevronDown,
  ChevronRight,
  LogOut,
  ChevronLast,
  ChevronFirst,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  adminOnly?: boolean;
  isCollapsed?: boolean;
}

const NavItem = ({ href, icon, title, isActive, adminOnly = false, isCollapsed = false }: NavItemProps) => {
  const { user } = useAuth();
  
 if (adminOnly && !user?.roles.includes('Admin')) {
    return null;
  }
  
  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start gap-x-3 pl-4 mb-1',
          isActive
            ? 'bg-primary/10 text-primary hover:bg-primary/15'
            : 'hover:bg-primary/5 text-muted-foreground hover:text-foreground'
        )}
        title={isCollapsed ? title : undefined}
      >
        {icon}
        {!isCollapsed && title}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  useEffect(() => {
    setIsCatalogOpen(pathname.includes('/catalogos'));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 bg-card shadow-lg transform transition-all duration-300 ease-in-out md:relative md:transform-none flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="border-b p-4 flex items-center justify-between">
            {!isCollapsed && (
              <div className="relative h-10 w-full">
                <Image
                  src="https://cyrlab.com.mx/assets/img/cyrlab-logo.png"
                  alt="CyrLab Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex shrink-0"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronLast className="h-4 w-4" />
              ) : (
                <ChevronFirst className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-3">
            <nav className="space-y-2">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase pl-4 mb-4">
                  Navegación
                </h3>
              )}
              
              <NavItem
                href="/dashboard"
                icon={<BarChart3 className="h-5 w-5" />}
                title="Dashboard"
                isActive={pathname === '/dashboard'}
                isCollapsed={isCollapsed}
              />
              
              <NavItem
                href="/dashboard/productos"
                icon={<Package className="h-5 w-5" />}
                title="Productos"
                isActive={pathname === '/dashboard/productos'}
                isCollapsed={isCollapsed}
              />
              
              <NavItem
                href="/dashboard/pedidos"
                icon={<ShoppingBag className="h-5 w-5" />}
                title="Pedidos"
                isActive={pathname === '/dashboard/pedidos'}
                isCollapsed={isCollapsed}
              />
              
              <NavItem
                href="/dashboard/mantenimientos"
                icon={<ClipboardList className="h-5 w-5" />}
                title="Mantenimientos"
                isActive={pathname === '/dashboard/mantenimientos'}
                isCollapsed={isCollapsed}
              />
              
              <NavItem
                href="/dashboard/visitas"
                icon={<Calendar className="h-5 w-5" />}
                title="Visitas"
                isActive={pathname === '/dashboard/visitas'}
                isCollapsed={isCollapsed}
              />

              {user?.roles.includes('Admin')&& (
                <>
                  {!isCollapsed && (
                    <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase pl-4 mt-6 mb-4">
                      Administración
                    </h3>
                  )}
                  
                  <NavItem
                    href="/dashboard/usuarios"
                    icon={<Users className="h-5 w-5" />}
                    title="Usuarios"
                    isActive={pathname === '/dashboard/usuarios'}
                    adminOnly
                    isCollapsed={isCollapsed}
                  />
                  
                  <NavItem
                    href="/dashboard/reportes"
                    icon={<BarChart3 className="h-5 w-5" />}
                    title="Reportes"
                    isActive={pathname === '/dashboard/reportes'}
                    adminOnly
                    isCollapsed={isCollapsed}
                  />
                  
                  {!isCollapsed ? (
                    <Collapsible open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-between pl-4 mb-1',
                            pathname.includes('/catalogos')
                              ? 'bg-primary/10 text-primary hover:bg-primary/15'
                              : 'hover:bg-primary/5 text-muted-foreground hover:text-foreground'
                          )}
                        >
                          <div className="flex items-center gap-x-3">
                            <Database className="h-5 w-5" />
                            Catálogos
                          </div>
                          {isCatalogOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-6 pl-3 border-l space-y-1">
                        <NavItem
                          href="/dashboard/catalogos/productos"
                          icon={<Package className="h-4 w-4" />}
                          title="Productos"
                          isActive={pathname === '/dashboard/catalogos/productos'}
                        />
                        <NavItem
                          href="/dashboard/catalogos/marcas"
                          icon={<Package className="h-4 w-4" />}
                          title="Marcas"
                          isActive={pathname === '/dashboard/catalogos/marcas'}
                        />
                        <NavItem
                          href="/dashboard/catalogos/categorias"
                          icon={<Package className="h-4 w-4" />}
                          title="Categorías"
                          isActive={pathname === '/dashboard/catalogos/categorias'}
                        />
                        <NavItem
                          href="/dashboard/catalogos/clientes"
                          icon={<Users className="h-4 w-4" />}
                          title="Clientes"
                          isActive={pathname === '/dashboard/catalogos/clientes'}
                        />
                        <NavItem
                          href="/dashboard/catalogos/tipos-clientes"
                          icon={<Users className="h-4 w-4" />}
                          title="Tipos de Clientes"
                          isActive={pathname === '/dashboard/catalogos/tipos-clientes'}
                        />
                        <NavItem
                          href="/dashboard/catalogos/vendedores"
                          icon={<Users className="h-4 w-4" />}
                          title="Vendedores"
                          isActive={pathname === '/dashboard/catalogos/vendedores'}
                        />
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <NavItem
                      href="/dashboard/catalogos"
                      icon={<Database className="h-5 w-5" />}
                      title="Catálogos"
                      isActive={pathname.includes('/catalogos')}
                      isCollapsed={isCollapsed}
                    />
                  )}
                </>
              )}
            </nav>
          </div>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-x-3 text-destructive hover:text-destructive hover:bg-destructive/10',
                isCollapsed && 'justify-center'
              )}
              onClick={handleLogout}
              title={isCollapsed ? 'Cerrar sesión' : undefined}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && 'Cerrar sesión'}
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}