/*
<ai_context>
Contains middleware for protecting routes, checking user authentication, and redirecting as needed.
</ai_context>
*/

import { authMiddleware } from '@clerk/nextjs'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/pricing",
    "/contact",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
  ],
  ignoredRoutes: [
    "/((?!api|trpc))/_next(.*)",
    "/api/(.*)",
    "/_next/static(.*)",
    "/_next/image(.*)",
    "/favicon.ico(.*)"
  ]
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 