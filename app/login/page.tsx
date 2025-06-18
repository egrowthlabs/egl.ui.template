'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LockKeyhole, Package, User, Users } from 'lucide-react';
import Image from 'next/image';
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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';

const formSchema = z.object({
  userName: z.string().min(3, 'Usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await login(data.userName, data.password);
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Bienvenido a CyrLab',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión',
        description: error.message || 'Credenciales incorrectas',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#2b40b6] to-[#4f94d6] p-8 text-white items-center justify-center animate-fade-right">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6 animate-fade-up">Bienvenido a CyrLab</h1>
          <p className="text-lg opacity-90 mb-8 animate-fade-up delay-150">
            Accede al panel administrativo para gestionar todos los aspectos de tu negocio de manera eficiente y segura.
          </p>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex items-start space-x-3 animate-fade-up delay-300 hover:translate-y-[-4px] transition-transform">
              <div className="rounded-full bg-white/10 p-2">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Gestión de Productos</h3>
                <p className="opacity-75">Administra tu catálogo completo</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 animate-fade-up delay-500 hover:translate-y-[-4px] transition-transform">
              <div className="rounded-full bg-white/10 p-2">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Control de Usuarios</h3>
                <p className="opacity-75">Maneja permisos y accesos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-white animate-fade-left">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center animate-fade-down">
            <div className="relative w-48 h-16 mb-8">
              <Image
                src="https://cyrlab.com.mx/assets/img/cyrlab-logo.png"
                alt="CyrLab Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-up">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Iniciar sesión
            </h2>
            <p className="text-gray-600 mb-6">
              Ingresa tus credenciales para continuar
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">
                            <User size={18} />
                          </span>
                          <Input
                            {...field}
                            placeholder="Ingresa tu usuario"
                            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-300 hover:border-primary/50"
                            disabled={isLoading}
                          />
                        </div>
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
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">
                            <LockKeyhole size={18} />
                          </span>
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Ingresa tu contraseña"
                            className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-300 hover:border-primary/50"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#2b40b6] hover:bg-[#4f94d6] text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                      Iniciando sesión...
                    </div>
                  ) : (
                    'Iniciar sesión'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}