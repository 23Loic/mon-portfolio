// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher pour ignorer les fichiers internes, _next, images, etc.
  matcher: ['/', '/(en|fr)/:path*']
};