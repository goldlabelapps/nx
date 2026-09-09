import { createAuthMiddleware } from "@goldlabelapps/saas/auth/middleware";

export const proxy = createAuthMiddleware({
  isPublic: (pathname) =>
    !pathname.startsWith("/account") &&
    !pathname.startsWith("/app") &&
    !pathname.startsWith("/private"),
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|svg|png|mp4).*)"],
};