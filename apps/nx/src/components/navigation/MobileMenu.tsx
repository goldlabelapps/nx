"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export interface MobileMenuProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

const emptySubscribe = () => () => {};

export function MobileMenu({
  isOpen: controlledIsOpen,
  onToggle,
  onClose,
}: MobileMenuProps = {}) {
  const pathname = usePathname();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setExpandedSections({});
    }
  }

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  const handleClose = useCallback(() => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalIsOpen(false);
    }
  }, [isControlled, onClose]);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const menuOverlay = isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      data-testid="mobile-menu-drawer"
      className="fixed inset-x-0 top-[56px] bottom-0 z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border-t border-b border-slate-200 dark:border-slate-800 overflow-y-auto p-5 animate-in fade-in duration-200 flex flex-col justify-between shadow-2xl md:hidden"
    >
      <div className="space-y-4">
        {/* Remote Control / Portal Badge */}
        {siteConfig.navigation.remoteControlBadge?.enabled && (
          <a
            href={siteConfig.navigation.remoteControlBadge.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-[#0f172a]/[0.06] dark:bg-slate-800/80 border border-[#0f172a]/15 dark:border-slate-700 text-[#0f172a] dark:text-slate-200 text-xs font-semibold hover:bg-[#0f172a]/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0f172a] dark:text-amber-400" />
              <span>{siteConfig.navigation.remoteControlBadge.label}</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>
        )}

        {/* Navigation links */}
        <div className="space-y-1">
          {siteConfig.navigation.links.map((item, idx) => {
            const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
            const isExpanded = expandedSections[item.label];
            const isItemActive = item.href ? pathname === item.href : false;

            if (hasDropdown) {
              const dropdownItems = (item.dropdown || []) as (DropdownItem | DropdownGroup)[];
              return (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-1">
                  <button
                    onClick={() => toggleSection(item.label)}
                    className="flex w-full items-center justify-between py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#0f172a] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#012867]/[0.08] dark:bg-amber-400/20 text-[#012867] dark:text-amber-300">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#0f172a] dark:text-white" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pl-3 pb-2 space-y-2 border-l-2 border-[#0f172a]/20 dark:border-slate-700 ml-2 mt-1">
                      {dropdownItems.map((subOrGroup, sIdx) => {
                        if ("items" in subOrGroup && Array.isArray((subOrGroup as DropdownGroup).items)) {
                          const group = subOrGroup as DropdownGroup;
                          return (
                            <div key={sIdx} className="space-y-1 pt-1">
                              {group.heading && (
                                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                                  {group.heading}
                                </div>
                              )}
                              {group.items.map((sub, gIdx) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={gIdx}
                                    href={sub.href}
                                    target={sub.external ? "_blank" : undefined}
                                    rel={sub.external ? "noreferrer" : undefined}
                                    onClick={handleClose}
                                    className={`block py-1.5 px-2 rounded-lg text-xs transition-colors ${
                                      isSubActive
                                        ? "bg-[#0f172a] text-white font-bold"
                                        : "text-slate-600 dark:text-slate-300 hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{sub.title}</span>
                                      {sub.badge && (
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                                          {sub.badge}
                                        </span>
                                      )}
                                    </div>
                                    {sub.description && (
                                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                        {sub.description}
                                      </div>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          );
                        }

                        const sub = subOrGroup as DropdownItem;
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            target={sub.external ? "_blank" : undefined}
                            rel={sub.external ? "noreferrer" : undefined}
                            onClick={handleClose}
                            className={`block py-1.5 px-2 rounded-lg text-xs transition-colors ${
                              isSubActive
                                ? "bg-[#0f172a] text-white font-bold"
                                : "text-slate-600 dark:text-slate-300 hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{sub.title}</span>
                              {sub.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            {sub.description && (
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                {sub.description}
                              </div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href || "#"}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={handleClose}
                className={`flex items-center justify-between py-3 text-sm font-semibold border-b border-slate-100 dark:border-slate-800 transition-colors ${
                  isItemActive
                    ? "text-[#0f172a] dark:text-amber-400 font-bold"
                    : "text-slate-800 dark:text-slate-200 hover:text-[#0f172a] dark:hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#012867]/[0.08] dark:bg-amber-400/20 text-[#012867] dark:text-amber-300">
                    {item.badge}
                  </span>
                ) : item.external ? (
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions: Theme Toggle & Primary CTAs */}
      <div className="pt-6 pb-4 space-y-3 border-t border-slate-100 dark:border-slate-800 mt-4">
        {/* Quick Theme Switcher */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
            Appearance
          </div>
          <ThemeToggle variant="segmented" />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            href={siteConfig.navigation.secondaryCta?.href || "/"}
            variant="outline"
            size="md"
            className="justify-center text-xs"
            onClick={handleClose}
          >
            {siteConfig.navigation.secondaryCta?.label || "Documentation"}
          </Button>

          <Button
            href={siteConfig.navigation.primaryCta.href}
            variant="primary"
            size="md"
            icon={siteConfig.navigation.primaryCta.icon || "Download"}
            iconPosition="left"
            className="justify-center text-xs font-bold"
            onClick={handleClose}
          >
            <span>{siteConfig.navigation.primaryCta.label}</span>
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="md:hidden">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (mounted && typeof document !== "undefined"
        ? createPortal(menuOverlay, document.body)
        : menuOverlay)}
    </div>
  );
}

