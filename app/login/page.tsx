'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = {
  username: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    console.log('🔑 [LOGIN] Iniciando autenticación...', data.username)
    
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })

    console.log('🔑 [LOGIN] Resultado:', result)
    setLoading(false)

    if (result?.error) {
      console.error('❌ [LOGIN] Error:', result.error)
      toast.error('Usuario o contraseña incorrectos')
    } else if (result?.ok) {
      console.log('✅ [LOGIN] Autenticación exitosa, redirigiendo...')
      toast.success('¡Bienvenido!')
      // Usar window.location para forzar reload y establecer cookies correctamente
      await new Promise(r => setTimeout(r, 800))
      window.location.href = '/admin'
    } else {
      console.error('❌ [LOGIN] Error desconocido')
      toast.error('Error al iniciar sesión')
    }
  }

  const createTestUser = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: 'jacky',
          contraseña: '123456',
          email: 'jacky@flores.com',
        }),
      })
      const data = await res.json()
      if (data.ok) {
        toast.success('Usuario creado: jacky / 123456')
      } else {
        toast.error(data.error || 'Error al crear usuario')
      }
    } catch (err) {
      toast.error('Error: ' + String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">

      {/* Izquierda — identidad de marca */}
      <div
        className="hidden flex-col justify-between p-12 md:flex md:w-1/2"
        style={{ background: 'linear-gradient(160deg, #1A0A14 0%, #2D0A22 100%)' }}
      >
        {/* Logo — clickeable a página principal */}
        <a href="/" className="flex flex-col leading-none hover:opacity-80 transition-opacity cursor-pointer">
          <span className="font-playfair font-black text-3xl" style={{ color: '#FFF5F8' }}>
            Jacky
          </span>
          <span className="font-playfair font-black text-3xl" style={{ color: '#FF1B6D' }}>
            Flores
          </span>
        </a>

        {/* Mensaje motivacional */}
        <div>
          <p className="mb-6 max-w-sm font-nunito text-lg font-semibold leading-relaxed text-white">
            Panel de administración para gestionar tu tienda de flores artesanales
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#FF1B6D' }} />
              <span className="text-sm text-white text-opacity-80">Gestiona productos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#FF1B6D' }} />
              <span className="text-sm text-white text-opacity-80">Configura redes sociales</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#FF1B6D' }} />
              <span className="text-sm text-white text-opacity-80">Carga catálogo</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-white text-opacity-60">
          © 2025 Jacky Flores y Detalles. Todos los derechos reservados.
        </p>
      </div>

      {/* Derecha — formulario */}
      <div
        className="flex w-full flex-col items-center justify-center px-6 md:w-1/2"
        style={{ backgroundColor: '#FFF5F8' }}
      >
        <div className="w-full max-w-sm">
          <h1
            className="mb-2 font-playfair text-4xl font-black"
            style={{ color: '#1A0A14' }}
          >
            Bienvenida
          </h1>
          <p className="mb-8 text-gray-600">Inicia sesión para acceder al panel admin</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Usuario */}
            <div>
              <Label htmlFor="username" className="mb-2 block font-semibold text-gray-900">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="ej: jacky"
                {...register('username', { required: 'Usuario requerido' })}
                disabled={loading}
                className="border-gray-300"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <Label htmlFor="password" className="mb-2 block font-semibold text-gray-900">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', { required: 'Contraseña requerida' })}
                  disabled={loading}
                  className="border-gray-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#FF1B6D' }}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Test user button */}
          <div className="mt-8 border-t border-gray-300 pt-6">
            <button
              onClick={createTestUser}
              disabled={loading}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
            >
              Crear usuario de prueba
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
