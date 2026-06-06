import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Permitir todos los requests
  // La validación de sesión se hace en los layouts (admin)
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
