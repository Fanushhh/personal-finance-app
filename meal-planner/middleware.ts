export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/plan/:path*', '/recipes/:path*', '/shopping-list/:path*', '/settings/:path*']
};
