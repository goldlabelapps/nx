import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";
import { getSessionCookie } from "../auth/session";

export interface AuthGuardProps {
  children: React.ReactNode;
  signInPath?: string;
  fallback?: React.ReactNode;
}

export async function AuthGuard({ children, signInPath = "/sign-in", fallback = null }: AuthGuardProps) {
  const sessionCookie = getSessionCookie(await cookies());
  if (!sessionCookie) {
    if (fallback) return <>{fallback}</>;
    redirect(signInPath);
  }

  return <>{children}</>;
}

export default AuthGuard;
