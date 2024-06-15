import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/'
]);

export default clerkMiddleware((auth, request) => {
    if (auth().userId && isPublicRoute(request)) {
        let path = '/select-org'

        if (auth().orgId) {
            path = `/organization/${auth().orgId}`
        }

        const orgSelection = new URL(path, request.url)
        return NextResponse.redirect(orgSelection);
    }

    if (!auth().userId && !isPublicRoute(request)) {
        auth().redirectToSignIn();
    }

    if (auth().userId && !auth().orgId && request.nextUrl.pathname !== '/select-org') {
        const orgSelection = new URL('/select-org', request.url)
        return NextResponse.redirect(orgSelection);
    }

    if (!isPublicRoute(request)) {
        auth().protect();
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};