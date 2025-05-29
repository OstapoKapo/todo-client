import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;

  if (!token && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token && ['/', '/login', '/signin'].includes(pathname)) {
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.redirect(new URL('/admin', req.url));
    } catch (e) {
      console.error('JWT verification failed on public route:', e);
      const res = NextResponse.next();
      res.cookies.set('token', '', { maxAge: 0 }); 
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signin',
    '/admin',
    '/admin/:path*'
  ],
};
