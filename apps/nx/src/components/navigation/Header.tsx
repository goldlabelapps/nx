"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { siteConfig } from "@/config";
import { LogoContextMenu } from "./LogoContextMenu";
import { DropdownMenu } from "./DropdownMenu";
import { MobileMenu } from "./MobileMenu";
import { HeaderActionsMenu } from "./HeaderActionsMenu";
import { ShareMenu } from "./ShareMenu";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  iconOnly?: boolean;
}

export function Header({ iconOnly = false }: HeaderProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const showFreshVisitorBanner = searchParams.get("reset") === "true";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [user, setUser] = useState<{ photoURL?: string | null; displayName?: string | null; email?: string | null } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkSessionServerState = async () => {
      if (typeof fetch !== "function") return;

      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          if (isMounted) setIsAuthenticated(false);
          return;
        }

        const payload = (await response.json()) as { authenticated?: boolean };
        if (isMounted) {
          setIsAuthenticated(Boolean(payload.authenticated));
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    void checkSessionServerState();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    const setupAuthListener = async () => {
      try {
        const { onAuthStateChanged } = await import("firebase/auth");
        const { getFirebaseClientAuth } = await import("@/lib/firebase/client");
        const auth = getFirebaseClientAuth();

        unsubscribe = onAuthStateChanged(auth, (u) => {
          if (isMounted) {
            if (u) {
              setIsAuthenticated(true);
              setUser({ photoURL: u.photoURL, displayName: u.displayName, email: u.email });
            } else {
              setUser(null);
            }
          }
        });
      } catch {
        // Fallback to server check if firebase auth is not configured
      }
    };

    void setupAuthListener();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (!window.confirm("Sign out of your account?")) {
      return;
    }

    setIsSigningOut(true);
    setIsAuthenticated(false);
    setUser(null);

    try {
      router.push("/");

      try {
        const { signOut } = await import("firebase/auth");
        const { getFirebaseClientAuth } = await import("@/lib/firebase/client");
        await signOut(getFirebaseClientAuth());
      } catch {
        // ignore client SDK sign-out failures and clear server session anyway
      }

      await fetch("/api/auth/sign-out", {
        method: "POST",
      });

      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-300",
        showFreshVisitorBanner ? "top-20 sm:top-12" : "top-0",
        scrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2.5"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <LogoContextMenu iconOnly={iconOnly} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navigation.links.map((item, idx) => {
              if (item.dropdown && item.dropdown.length > 0) {
                return <DropdownMenu key={idx} item={item} />;
              }

              return (
                <Link
                  key={idx}
                  href={item.href || "#"}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-[#0f172a] hover:bg-slate-100/80 rounded-full transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Instant Search Dialog */}
          <SearchDialog />

          {/* Share Action */}
          <ShareMenu />

          {/* Settings menu dialog */}
          <HeaderActionsMenu
            isAuthenticated={isAuthenticated}
            user={user}
            onSignOut={handleSignOut}
          />

          {/* Mobile Menu Trigger */}
          <MobileMenu
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen((prev) => !prev)}
            onClose={() => setMobileMenuOpen(false)}
          />

          {/* Auth Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {user?.photoURL ? (
                  <Link
                    href="/account"
                    title="Account"
                    aria-label="Account"
                    className="relative h-7 w-7 md:h-9 md:w-9 rounded-full overflow-hidden hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-slate-400 shrink-0"
                  >
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      fill
                      sizes="(max-width: 768px) 28px, 36px"
                      className="object-cover"
                    />
                  </Link>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="font-semibold"
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  href="/sign-in"
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
