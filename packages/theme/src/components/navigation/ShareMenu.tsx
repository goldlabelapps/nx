"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Share2, Copy, Check } from "lucide-react";
import { useSiteConfig } from "../../context/ConfigContext";
import { cn } from "../../lib/utils";

export interface ShareMenuProps {
  url?: string;
  title?: string;
  description?: string;
}

const emptySubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
};

export function ShareMenu({ url, title, description: _description }: ShareMenuProps) {
  const siteConfig = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const getSnapshot = () =>
    typeof window !== "undefined" ? window.location.href : siteConfig.metadata.siteUrl;
  const getServerSnapshot = () => siteConfig.metadata.siteUrl;

  const browserUrl = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const currentUrl = url || browserUrl || siteConfig.metadata.siteUrl;

  const menuRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const shareTitle = title || siteConfig.metadata.title;

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Share ${siteConfig.brand.name}`}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border",
          isOpen
            ? "bg-[#012867] text-white border-[#012867] shadow-sm"
            : "text-slate-700 bg-slate-100/80 hover:bg-[#012867]/[0.08] hover:text-[#012867] border-slate-200/80"
        )}
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Share options"
          className="absolute right-0 top-full mt-2 z-50 w-64 rounded-2xl bg-white border border-slate-200 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Share this page
            </p>
          </div>

          <div className="space-y-1">
            <FacebookShareButton
              url={currentUrl}
              title={shareTitle}
              className="w-full text-left !flex"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group">
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Facebook</span>
              </div>
            </FacebookShareButton>

            <TwitterShareButton
              url={currentUrl}
              title={shareTitle}
              className="w-full text-left !flex"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group">
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Twitter / X</span>
              </div>
            </TwitterShareButton>

            <WhatsappShareButton
              url={currentUrl}
              title={shareTitle}
              className="w-full text-left !flex"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group">
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">WhatsApp</span>
              </div>
            </WhatsappShareButton>

            <div className="pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-[#012867]/[0.06] hover:text-[#012867] transition-colors cursor-pointer text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-700 group-hover:text-[#012867]">
                    {copied ? "Link Copied!" : "Copy Link"}
                  </span>
                </div>
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4 text-slate-400 group-hover:text-[#012867]" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
