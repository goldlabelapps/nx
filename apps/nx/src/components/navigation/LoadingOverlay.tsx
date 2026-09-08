"use client";

import React, { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Flash } from "@goldlabelapps/flash";

interface LoadingOverlayProps {
  /** Safety timeout in milliseconds before automatically dismissing the overlay. Default 8000ms. */
  timeoutMs?: number;
}

export function LoadingOverlay(props: LoadingOverlayProps) {
  return (
    <Suspense fallback={null}>
      <LoadingOverlayContent {...props} />
    </Suspense>
  );
}

export function LoadingOverlayContent({ timeoutMs = 8000 }: LoadingOverlayProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearSafetyTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopLoading = useCallback(() => {
    clearSafetyTimeout();
    setIsLoading(false);
  }, [clearSafetyTimeout]);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    clearSafetyTimeout();

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, timeoutMs);
  }, [clearSafetyTimeout, timeoutMs]);

  // Dismiss loading overlay when route changes completed
  useEffect(() => {
    React.startTransition(() => {
      stopLoading();
    });
  }, [pathname, searchParams, stopLoading]);

  // Intercept click events on standard internal anchor links
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;

      // Ensure click was left-click without modifier keys
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;

      if (!anchor) return;

      const targetHref = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");
      const isDownload = anchor.hasAttribute("download");

      // Skip external links, target="_blank", downloads, or non-string hrefs
      if (!targetHref || targetAttr === "_blank" || isDownload) return;
      if (targetHref.startsWith("http://") || targetHref.startsWith("https://") || targetHref.startsWith("mailto:") || targetHref.startsWith("tel:")) {
        return;
      }

      // Check if link navigates to a new route vs an in-page anchor (#hash)
      const currentUrl = new URL(window.location.href);
      const destinationUrl = new URL(anchor.href, window.location.href);

      if (
        destinationUrl.origin === currentUrl.origin &&
        (destinationUrl.pathname !== currentUrl.pathname || destinationUrl.search !== currentUrl.search)
      ) {
        startLoading();
      }
    };

    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      clearSafetyTimeout();
    };
  }, [startLoading, clearSafetyTimeout]);

  if (!isLoading) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading page"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity duration-200 pointer-events-auto"
    >
      <Flash movie="loading" width={320} height={320} color="transparent" loop autoPlay />
    </div>
  );
}

