'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, UserPlus, Search } from 'lucide-react';
import { api } from '@/lib/api';
import type { User, PaginatedResponse } from '@/lib/types';
import { UserForm } from '@/components/user-form';
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect';

export default function Usuarios() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<PaginatedResponse<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Double-check permissions (also handled at layout level)
if (!user?.roles?.includes('Admin')) {
  redirect('/dashboard');
  return null;
}

useDebouncedEffect(() => {
  loadUsers();
}, [search, currentPage], 300);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await api.getUsers(currentPage, 10, search);
      setUsers(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron cargar los usuarios',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (data: any) => {
    try {
      await api.createUser(data);
      toast({
        title: 'Usuario creado',
        description: 'El usuario ha sido creado exitosamente',
      });
      setIsCreateDialogOpen(false);
      loadUsers();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo crear el usuario',
      });
    }
  };

  const handleUpdateUser = async (data: any) => {
    if (!selectedUser) return;
    try {
      await api.updateUser(selectedUser.id, data);
      toast({
        title: 'Usuario actualizado',
        description: 'El usuario ha sido actualizado exitosamente',
      });
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo actualizar el usuario',
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.deleteUser(userId);
      toast({
        title: 'Usuario eliminado',
        description: 'El usuario ha sido eliminado exitosamente',
      });
      loadUsers();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar el usuario',
      });
    }
  };

  return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
                <p className="text-muted-foreground">
                  Administra los usuarios del sistema
                </p>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2b40b6] hover:bg-[#4f94d6]">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Nuevo Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Crear Usuario</DialogTitle>
                    <DialogDescription>
                      Ingresa los datos del nuevo usuario
                    </DialogDescription>
                  </DialogHeader>
                  <UserForm onSubmit={handleCreateUser} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={search}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Cargando usuarios...
                      </TableCell>
                    </TableRow>
                  ) : users?.items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No se encontraron usuarios
                      </TableCell>
                    </TableRow>
                  ) : (
                    users?.items.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. El usuario será eliminado permanentemente.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar Usuario</DialogTitle>
                  <DialogDescription>
                    Modifica los datos del usuario
                  </DialogDescription>
                </DialogHeader>
                {selectedUser && (
                  <UserForm
                    user={selectedUser}
                    onSubmit={handleUpdateUser}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
  );
}