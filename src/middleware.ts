import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isLocale } from '@/utilities/locale'

const PUBLIC_FILE = /\.[^/]+$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/next') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/sitemap') ||
    pathname.includes('-sitemap.xml') ||
    pathname === '/robots.txt' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segment = pathname.split('/').filter(Boolean)[0]

  if (isLocale(segment)) {
    const response = NextResponse.next()
    response.headers.set('x-locale', segment)
    response.cookies.set('NEXT_LOCALE', segment, { path: '/' })
    return response
  }

  const url = request.nextUrl.clone()
  const suffix = pathname === '/' ? '' : pathname
  url.pathname = `/${defaultLocale}${suffix}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.jpg|favicon.jpg).*)'],
}
