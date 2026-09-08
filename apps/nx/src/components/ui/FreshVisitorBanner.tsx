"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FreshVisitorBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const isReset = searchParams.get("reset") === "true";

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setDismissed(true);
      try {
        if (typeof window !== "undefined" && window.location) {
          const url = new URL(window.location.href);
          url.searchParams.delete("reset");
          const newPath = url.pathname + (url.searchParams.toString() ? "?" + url.searchParams.toString() : "");
          router.replace(newPath);
        } else {
          router.replace("/");
        }
      } catch {
        router.replace("/");
      }
    }, 300);
  }, [router]);

  useEffect(() => {
    if (!isReset || dismissed) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isReset, dismissed, handleDismiss]);

  if (!isReset || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed top-0 inset-x-0 z-[60] bg-emerald-600 dark:bg-emerald-700 text-white px-4 py-2.5 shadow-lg border-b border-emerald-500/50 transition-all duration-300 transform",
        isExiting ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0 animate-in fade-in slide-in-from-top"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-200" />
          <span>Welcome! All settings and local data have been reset. You are visiting as a brand new visitor.</span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss message"
          className="p-1 rounded-lg hover:bg-emerald-500/80 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

