import {NextRequest, NextResponse} from 'next/server';
import {NavigationService} from "@/services/Navigation/NavigationService";

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    NavigationService.middleware(request, requestHeaders)

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}