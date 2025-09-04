import { NextResponse } from "next/server";
import { auth } from "./auth";

// Define a matcher to handle protected routes.
const PROTECTED_PAGES = ["/r", "/creator"];

export default auth((req) => {
  const { pathname, origin, search } = req.nextUrl;
  const isAuthenticated = !!req.auth;
  const isNewUser = req.auth?.user?.isNewUser;
  const isAuthPage = pathname === "/signin";
  const isOnboardingPage = pathname === "/onboarding";

  // Case 1: Handle unauthenticated users trying to access protected pages.
  if (!isAuthenticated) {
    if (PROTECTED_PAGES.some((p) => pathname.startsWith(p))) {
      const redirectUrl = new URL("/signin", origin);
      redirectUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Case 2: Handle authenticated users on auth-related pages.
  if (isAuthenticated) {
    // Redirect authenticated users away from the sign-in page.
    if (isAuthPage) {
      if (isNewUser) {
        return NextResponse.redirect(new URL("/onboarding", origin));
      } else {
        return NextResponse.redirect(new URL("/r/comics", origin));
      }
    }

    // Redirect returning users away from the onboarding page.
    if (!isNewUser && isOnboardingPage) {
      return NextResponse.redirect(new URL("/r/comics", origin));
    }

    // Redirect new users to the onboarding page if they try to access other protected routes.
    if (
      isNewUser &&
      !isOnboardingPage &&
      PROTECTED_PAGES.some((p) => pathname.startsWith(p))
    ) {
      return NextResponse.redirect(new URL("/onboarding", origin));
    }
  }

  // For all other cases (correctly authenticated users, static assets), allow the request to proceed.
  return NextResponse.next();
});

// The matcher configuration is crucial for performance. It tells Next.js which paths
// to apply the middleware to, excluding static files and internal Next.js routes.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|assets|images|fonts|css|public|logo\\.svg).*)",
  ],
};
