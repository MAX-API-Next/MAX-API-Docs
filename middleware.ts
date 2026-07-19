import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';

const handleI18n = createI18nMiddleware(i18n);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.defaultLanguage}`;
    return NextResponse.redirect(url);
  }

  return handleI18n(request, event);
}

export const config = {
  // Matcher ignoring API routes, Next.js internals, and static assets
  // Important: exclude metadata and OG image routes so they are not redirected
  // to `/{lang}/...`, where no matching route exists.
  matcher: [
    '/((?!api|og/|_next/static|_next/image|favicon.ico|assets/|robots\\.txt|sitemap\\.xml|llms?\\.txt|llm-full\\.txt|llms-full\\.txt).*)',
  ],
};
