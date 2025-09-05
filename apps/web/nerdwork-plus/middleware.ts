import { NextResponse } from "next/server";
import { auth } from "./auth";

const PROTECTED_PAGES = ["/r", "/creator"];
const ONBOARDING_PREFIX = "/onboarding";

export default auth((req) => {
  const { pathname, origin, search } = req.nextUrl;
  const isAuthenticated = !!req.auth;
  const isCreator = req.auth?.cProfile;
  const isReader = req.auth?.rProfile;
  const isAuthPage = pathname === "/signin";
  const isOnboardingPage = pathname.startsWith(ONBOARDING_PREFIX);

  if (!isAuthenticated) {
    if (PROTECTED_PAGES.some((p) => pathname.startsWith(p))) {
      const redirectUrl = new URL("/signin", origin);
      redirectUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
      return NextResponse.redirect(redirectUrl);
    }

    if (isOnboardingPage) {
      return NextResponse.redirect(new URL("/signin", origin));
    }

    return NextResponse.next();
  }

  if (isAuthenticated) {
    const hasCompletedOnboarding = isCreator || isReader;

    if (!hasCompletedOnboarding) {
      if (!isOnboardingPage) {
        return NextResponse.redirect(new URL(ONBOARDING_PREFIX, origin));
      }

      return NextResponse.next();
    }

    if (isAuthPage) {
      if (isCreator) {
        return NextResponse.redirect(new URL("/creator/comics", origin));
      } else if (isReader) {
        return NextResponse.redirect(new URL("/r/comics", origin));
      }
    }

    if (isOnboardingPage) {
      if (isCreator) {
        return NextResponse.redirect(new URL("/creator/comics", origin));
      } else if (isReader) {
        return NextResponse.redirect(new URL("/r/comics", origin));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|assets|images|fonts|css|public|logo\\.svg).*)",
  ],
};
