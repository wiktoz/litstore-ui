import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { cookies } from 'next/headers'

// Initialize the i18n middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest): Promise<NextResponse> {
    const pathname = req.nextUrl.pathname;

    // 1. Run i18n middleware first
    const intlResponse = intlMiddleware(req);

    if (intlResponse) {
        // Continue only if path is NOT protected
        if (!pathname.includes('/admin') && !pathname.includes('/user')) {
            return intlResponse;
        }
    }

    const url = req.nextUrl.clone();
    const cookieStore = await cookies();

  // Build cookie header string from all cookies
    const cookieHeader = cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

    // 3. Ask backend to verify user session and role
    const verifyResponse = await fetch('http://localhost:8000/api/v1/users/me', {
        method: 'GET',
        headers: {
            cookie: cookieHeader,  // forward the cookie from the client request
        }
    });

    if (!verifyResponse.ok) {
        // If verification fails, redirect to login
        url.pathname = `/${routing.defaultLocale}/auth/sign-in`;
        return NextResponse.redirect(url);
    }

    // 4. Get user info from backend (if authenticated)
    //const user = await verifyResponse.json();

    // 5. Role-based authorization
    /**if (pathname.includes('/admin') && user.role !== 'admin') {
        url.pathname = `/${routing.defaultLocale}/auth/sign-in`;
        return NextResponse.redirect(url);
    }*/

    // 6. If everything passes, return the i18n middleware response
    return intlResponse;
}

export const config = {
    matcher: [
        '/',
        '/(fr|en|de|pl)/:path*',
        '/admin/:path*',
        '/user/:path*',
    ],
};
