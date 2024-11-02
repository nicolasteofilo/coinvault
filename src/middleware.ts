import { getUrl } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  const headers = new Headers(request.headers)
  headers.set('x-current-path', request.nextUrl.pathname)

  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL(getUrl('/tools')))
  }

  if (pathname.includes('/tools') && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth')))
  }

  return NextResponse.next({
    headers,
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
