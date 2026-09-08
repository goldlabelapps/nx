"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, ExternalLink } from "lucide-react";
import { useSiteConfig } from "../../context/ConfigContext";
import { LogoContextMenu } from "./LogoContextMenu";
import { DropdownMenu } from "./DropdownMenu";
import { MobileMenu } from "./MobileMenu";
import { ShareMenu } from "./ShareMenu";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const siteConfig = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2.5"
          : "bg-transparent py-4",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <LogoContextMenu />

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
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-[#012867] hover:bg-slate-100/80 rounded-full transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <ShareMenu />

          {siteConfig.navigation.remoteControlBadge?.enabled && (
            <a
              href={siteConfig.navigation.remoteControlBadge.href}
              target="_blank"
              rel="noopener noreferrer"
              title={siteConfig.navigation.remoteControlBadge.tooltip}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-[#012867]/[0.08] hover:text-[#012867] border border-slate-200/80 transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-slate-500" />
              <span>{siteConfig.navigation.remoteControlBadge.label}</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          )}

          <Button
            href={siteConfig.navigation.primaryCta.href}
            variant="primary"
            size="sm"
            icon={siteConfig.navigation.primaryCta.icon}
            iconPosition="right"
            className="shadow-sm shadow-[#012867]/20 font-bold bg-[#012867] hover:bg-[#011f52] text-white"
          >
            <span>{siteConfig.navigation.primaryCta.label}</span>
          </Button>

          <MobileMenu
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen((prev) => !prev)}
            onClose={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
