import { getUrl } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL(getUrl('/tools')))
  }

  if (pathname.includes('/tools') && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
