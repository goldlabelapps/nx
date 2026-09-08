import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "./session";
import { isPublicPath } from "../routing/routeConfig";

export interface AuthMiddlewareOptions {
  signInPath?: string;
  isPublic?: (pathname: string) => boolean;
}

export function createAuthMiddleware(options: AuthMiddlewareOptions = {}) {
  const signInPath = options.signInPath || "/sign-in";
  const checkPublic = options.isPublic || isPublicPath;

  return function authMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (checkPublic(pathname)) {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      const redirectUrl = new URL(signInPath, request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  };
}
