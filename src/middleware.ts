import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const currentPath = req.nextUrl.pathname;
  const loginPath = '/';

  // Fetch authentication status from the API
  const response = await fetch(new URL('/api/auth/session', req.url), {
    headers: { cookie: req.headers.get('cookie') || '' },
  });

  const isAuthenticated = response.ok;

  if (isAuthenticated) {
    if (currentPath === loginPath) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  } else {
    if (currentPath !== loginPath) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/home', '/'],
};
