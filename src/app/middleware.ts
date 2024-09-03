// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define your secret here or use environment variables
const secret = process.env.NEXTAUTH_SECRET || 'your-secret';

// Define which paths should be protected
const protectedPaths = ['/protected', '/dashboard'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  
  // Check if the request path is one of the protected paths
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      // Redirect to sign-in page if not authenticated
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  }

  // Allow the request to proceed if authenticated or if the path is not protected
  return NextResponse.next();
}

// Define middleware configuration for specific paths
export const config = {
  matcher: ['/protected/:path*', '/dashboard/:path*'],
};
