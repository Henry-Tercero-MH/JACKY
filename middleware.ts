import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Permitir todos los callbacks de auth
  if (pathname.includes('/api/auth')) {
    return NextResponse.next()
  }

  // Permitir /login sin restricciones
  if (pathname === '/login') {
    return NextResponse.next()
  }

  // Permitir rutas públicas
  if (pathname === '/' || pathname.startsWith('/catalogo')) {
    return NextResponse.next()
  }

  // Para rutas admin, verificar sesión
  if (pathname.startsWith('/admin')) {
    const token =
      request.cookies.get('next-auth.session-token')?.value ||
      request.cookies.get('__Secure-next-auth.session-token')?.value ||
      request.cookies.get('next-auth.session')?.value

    if (!token) {
      console.log('🔐 [MIDDLEWARE] Sin token, redirigiendo a login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    console.log('🔐 [MIDDLEWARE] Token encontrado, permitiendo acceso')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
