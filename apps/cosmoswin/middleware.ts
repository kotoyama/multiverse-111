import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware'

import { i18nMiddleware as createI18nMiddleware } from '@repo/i18n/middleware'

import { pathnames } from './routing'

const i18nMiddleware = createI18nMiddleware(pathnames)

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth
    const isAuthenticated = !!token
    const { pathname } = req.nextUrl

    if (isAuthenticated && pathname.startsWith('/login')) {
      return Response.redirect(new URL('/', req.url))
    }

    return i18nMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl

        if (pathname.startsWith('/login')) {
          return true
        }

        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|uploads|images|admin|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
