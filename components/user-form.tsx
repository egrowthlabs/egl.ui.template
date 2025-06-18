'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/api';
import type { User } from '@/lib/types';

const createUserSchema = z.object({
  userName: z.string().min(3, 'Usuario debe tener al menos 3 caracteres'),
  firstName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'Apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
  roles: z.string().min(1, 'Debe seleccionar un rol'),
});

const updateUserSchema = createUserSchema.omit({ userName: true, password: true });

interface UserFormProps {
  user?: User;
  onSubmit: (data: any) => Promise<void>;
}

export function UserForm({ user, onSubmit }: UserFormProps) {
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(user ? updateUserSchema : createUserSchema),
    defaultValues: user
      ? {
          firstName: user.fullName?.split(' ')[0] || '',
          lastName: user.fullName?.split(' ')?.slice(1).join(' ') || '',
          email: user.email,
          roles: user.roles?.[0] || '',
        }
      : {
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          roles: '',
        },
  });

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const data = await api.getRoles();
      setRoles(data.map((r: any) => r.name)); // assumes roles come as [{ id, name }]
    } catch (error) {
      console.error('Error loading roles:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await onSubmit({
        ...data,
        roles: [data.roles], // ensure it's sent as an array
      });
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {!user && (
          <>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#2b40b6] hover:bg-[#4f94d6]"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
              Guardando...
            </div>
          ) : user ? (
            'Actualizar Usuario'
          ) : (
            'Crear Usuario'
          )}
        </Button>
      </form>
    </Form>
  );
}
