
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { ILoginForm } from "../../interfaces/ILoginForm"
import { usePublic } from '@/hooks/PublicUse'
import { useAuth } from '@/contexts/ContextAuht'




export default function LoginForm() {
  usePublic();
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>()
  const router = useRouter() 

  // const onSubmit = async (form: ILoginForm) => {
  //   try {
  //     const response = await axios.post(process.env.NEXT_PUBLIC_API_URL_LOGIN as string, form)
  //     console.log('Login exitoso:', response.data)
  //     Swal.fire({
  //       title: "Inicio De Sesion Exitoso",
  //       icon: "success",
  //     });
  //     router.push('/') 
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     console.error('Error al iniciar sesión:', error)
  //     setErrorMessage(error.response?.data?.message || 'Error al iniciar sesión. Inténtalo nuevamente.')
  //     Swal.fire({
  //       icon: "error",
  //       title: "Credenciales Incorrectas",
        
  //     });
  //   }
  // }



  const onSubmit = async (form: ILoginForm) => {
    try {
        await login(form);
        Swal.fire({
            title: "Inicio De Sesion Exitoso",
            icon: "success",
        });
        router.push('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error al iniciar sesión:', error);
        setErrorMessage(error.response?.data?.message || 'Error al iniciar sesión. Inténtalo nuevamente.');
        Swal.fire({
            icon: "error",
            title: "Credenciales Incorrectas",
        });
    }
};


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Bienvenido a Noah Store</CardTitle>
        <CardDescription className="text-center">Por favor, inicia sesión en tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="submit" className="w-full transition-all duration-300 ease-in-out hover:bg-primary-dark">
            Iniciar Sesión
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-primary hover:underline transition-all duration-300 ease-in-out">
            Regístrate
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
