import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Permitir callback de auth
  if (pathname.includes('/api/auth')) {
    return NextResponse.next()
  }

  // Permitir acceso a /login sin autenticación
  if (pathname === '/login') {
    return NextResponse.next()
  }

  // Para rutas admin, verificar sesión (cookie)
  if (pathname.startsWith('/admin')) {
    const token =
      request.cookies.get('next-auth.session-token')?.value ||
      request.cookies.get('__Secure-next-auth.session-token')?.value

    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/auth/:path*'],
}
