import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export const middleware = async (req: NextRequest) => {
  const session = await auth();
  console.log('session', session); // Debugging: Check the session object

  const currentPath = req.nextUrl.pathname;
  const loginPath = '/';

  if (session) {
    if (currentPath === loginPath) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  } else {
    if (currentPath !== loginPath) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], 
};
