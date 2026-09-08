"use client";

import React from "react";
import { useIsGod } from "@/hooks/useIsGod";

export interface GodOnlyProps {
  /** Elements to render if the user is authenticated as the superuser (God user). */
  children: React.ReactNode;
  /** Optional fallback UI to render for non-god users or unauthenticated users. Defaults to null. */
  fallback?: React.ReactNode;
  /** Optional fallback UI to render while checking authentication status. Defaults to fallback. */
  loadingFallback?: React.ReactNode;
}

/**
 * Guard component that renders its children ONLY if the logged-in user is the superuser (God user).
 * Hides superuser elements/features from regular users.
 */
export function GodOnly({ children, fallback = null, loadingFallback }: GodOnlyProps) {
  const { isGod, isLoading } = useIsGod();

  if (isLoading) {
    return <>{loadingFallback !== undefined ? loadingFallback : fallback}</>;
  }

  if (isGod) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
