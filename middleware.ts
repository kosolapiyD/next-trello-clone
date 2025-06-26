import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const userId = session.userId;
  const orgId = session.orgId;

  if (!isPublicRoute(req)) {
    await auth.protect(); // require auth on private routes
  }

  // authenticated user on public route -> redirect to org or select-org
  if (userId && isPublicRoute(req)) {
    const targetPath = orgId ? `/organization/${orgId}` : '/select-org';
    const url = new URL(targetPath, req.url);
    return NextResponse.redirect(url);
  }

  // Manual redirect to Clerk sign-in unauthenticated users trying to access private pages
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If user is logged in but no org selected
  if (userId && !orgId && req.nextUrl.pathname !== '/select-org') {
    return NextResponse.redirect(new URL('/select-org', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
