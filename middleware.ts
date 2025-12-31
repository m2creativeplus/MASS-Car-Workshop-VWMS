import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client configured to use cookies
  constsupabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Protected Routes (Require Login)
  const protectedRoutes = ["/dashboard", "/vehicles", "/customers", "/work-orders", "/inventory"]
  const isProtectedRoute = protectedRoutes.some((path) => pathname.startsWith(path))

  // Auth Routes (Redirect to Dashboard if already logged in)
  const authRoutes = ["/login", "/register", "/auth"]
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path))

  // Root route handling - redirect based on session
  if (pathname === "/") {
      if (session) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
      }
      // Allow landing page if we have one, or redirect to login
      // For now, let's redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
  }

  // 1. Unauthenticated User trying to access Protected Route -> Redirect to Login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 2. Authenticated User trying to access Auth Route -> Redirect to Dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes - handled separately or allowed)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
}
