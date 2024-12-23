'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { FormData } from "../../types/RegisterFormType";
import { usePublic } from '@/hooks/PublicUse'


export default function RegisterForm() {
  usePublic();
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter() // Inicializa useRouter

  const onSubmit = async (data: FormData) => {
    console.log("Datos enviados:", data); // <-- Imprime los datos
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL_REGISTER as string, data)
      console.log("Respuesta del servidor:", response.data);
      Swal.fire({
        title: "Usuario Registrado Con Exito",
        icon: "success",
      });
      router.push('/login');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error Al Registrar Usuario",
      });
      console.error("Error al registrar el usuario:", error.response?.data || error.message);
    }
  };
  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Crear una Cuenta</CardTitle>
        <CardDescription className="text-center">Únete a Noah Store hoy</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                {...register("name", { required: "El nombre es obligatorio" })}
                className="pl-10 transition-all duration-300 ease-in-out hover:border-primary focus:border-primary"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                {...register("email", { 
                  required: "El correo electrónico es obligatorio", 
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Dirección de correo electrónico inválida"
                  }
                })}
                className="pl-10 transition-all duration-300 ease-in-out hover:border-primary focus:border-primary"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { 
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres"
                  }
                })}
                className="pl-10 pr-10 transition-all duration-300 ease-in-out hover:border-primary focus:border-primary"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <div className="relative">
              <Input
                id="address"
                type="text"
                placeholder="123 Calle Principal, Ciudad, País"
                {...register("address", { required: "La dirección es obligatoria" })}
                className="pl-10 transition-all duration-300 ease-in-out hover:border-primary focus:border-primary"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Número de Teléfono</Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                {...register("phone", { 
                  required: "El número de teléfono es obligatorio",
                  pattern: {
                    value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: "Número de teléfono inválido"
                  }
                })}
                className="pl-10 transition-all duration-300 ease-in-out hover:border-primary focus:border-primary"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <Button type="submit" className="w-full transition-all duration-300 ease-in-out hover:bg-primary-dark">
            Crear Cuenta
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-primary hover:underline transition-all duration-300 ease-in-out">
            Inicia sesión
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
