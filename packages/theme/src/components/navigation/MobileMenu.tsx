"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { useSiteConfig } from "../../context/ConfigContext";
import type { DropdownItem } from "../../types";
import { Button } from "../ui/Button";

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
  const siteConfig = useSiteConfig();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setExpandedSections({});
      return;
    }

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
  }, [isOpen]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const drawerContent = (
    <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="font-extrabold text-lg text-[#012867]">Menu</span>
            <button
              onClick={handleClose}
              className="p-2 -mr-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-1">
            {siteConfig.navigation.links.map((item, idx) => {
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              const isExpanded = expandedSections[item.label] ?? false;

              if (hasDropdown) {
                const dropdownItems = (item.dropdown || []) as DropdownItem[];
                return (
                  <div key={idx} className="space-y-1 py-1">
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-3 space-y-1 border-l-2 border-[#012867]/20 ml-3 mt-1">
                        {dropdownItems.map((sub, sIdx) => {
                          const content = (
                            <div className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-slate-800">
                                  {sub.title}
                                </span>
                                {sub.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#012867]/[0.08] text-[#012867]">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              {sub.description && (
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {sub.description}
                                </p>
                              )}
                            </div>
                          );

                          if (sub.external) {
                            return (
                              <a
                                key={sIdx}
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleClose}
                                className="block"
                              >
                                {content}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              onClick={handleClose}
                              className="block"
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.external) {
                return (
                  <a
                    key={idx}
                    href={item.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </a>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.href || "#"}
                  onClick={handleClose}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#012867]/[0.08] text-[#012867]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-3">
          <Button
            href={siteConfig.navigation.primaryCta.href}
            variant="primary"
            className="w-full justify-center shadow-md bg-[#012867] hover:bg-[#011f52] text-white"
            onClick={handleClose}
          >
            {siteConfig.navigation.primaryCta.label}
          </Button>

          {siteConfig.navigation.secondaryCta && (
            <Button
              href={siteConfig.navigation.secondaryCta.href}
              variant="outline"
              className="w-full justify-center"
              onClick={handleClose}
            >
              {siteConfig.navigation.secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={handleToggle}
        className="md:hidden p-2 -mr-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Open mobile menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && mounted && typeof document !== "undefined"
        ? createPortal(drawerContent, document.body)
        : null}
    </>
  );
}
