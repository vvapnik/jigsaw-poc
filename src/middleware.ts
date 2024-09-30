import {NextRequest, NextResponse} from 'next/server';

const HEADER_URL = 'x-navigation-url'
export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    navigation(request, requestHeaders)

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}


function navigation(request: NextRequest, headers: Headers) {
    headers.set(HEADER_URL, request.nextUrl.pathname);
}