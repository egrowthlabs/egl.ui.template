'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/components/theme-provider';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState('Dashboard');

  // Update page title based on current path
  useEffect(() => {
    const path = pathname.split('/').filter(Boolean);
    
    if (path.length === 1) {
      setPageTitle('Dashboard');
    } else {
      // Format camelCase and dash-case to Title Case
      const title = path[path.length - 1]
        .replace(/-/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      
      setPageTitle(title);
    }
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getInitials = () => {
    if (!user?.username) return 'U';
    
    const names = user.username.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-semibold ml-12 md:ml-0">
          {pageTitle}
        </h1>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Cambiar tema</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8 bg-[#2b40b6]">
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="flex justify-between">
                <span>Usuario</span>
                <span className="font-medium">{user?.username}</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex justify-between">
                <span>Rol</span>
                <span className="font-medium">{user?.roles}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}