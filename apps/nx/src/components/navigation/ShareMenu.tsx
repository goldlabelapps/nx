"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Share2, Copy, Check } from "lucide-react";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

export interface ShareMenuProps {
  url?: string;
  title?: string;
  description?: string;
  /** "icon" renders the standalone circular icon button (default). "menuItem" renders a full-width row for use inside another dropdown. */
  variant?: "icon" | "menuItem";
}

const emptySubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
};

const getSnapshot = () =>
  typeof window !== "undefined" ? window.location.href : siteConfig.metadata.siteUrl;

const getServerSnapshot = () => siteConfig.metadata.siteUrl;

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XTwitterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.7-1.97 1.85-1.97 1.15 0 1.6.85 1.6 2.07v4.83h2.79M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96z" />
    </svg>
  );
}

function WhatsappIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15-.2.301-.776.979-.952 1.18-.175.201-.35.226-.651.076-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.783-1.676-2.084-.175-.3-.018-.463.132-.613.136-.134.301-.35.452-.526.15-.175.2-.3.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.588-.493-.508-.676-.517l-.577-.01c-.2 0-.526.075-.802.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.078 2.909 1.229 3.11.15.2 2.122 3.24 5.14 4.544.718.31 1.279.496 1.716.634.721.229 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.304.175-1.43-.075-.125-.276-.2-.577-.351zM12.042 0C5.392 0 0 5.392 0 12.042c0 2.124.553 4.197 1.603 6.017L0 24l6.103-1.602c1.76 0.96 3.753 1.468 5.939 1.468 6.649 0 12.042-5.392 12.042-12.042C24.084 5.392 18.692 0 12.042 0zm0 22.023c-1.848 0-3.658-.496-5.236-1.435l-.375-.222-3.89 1.02 1.038-3.791-.244-.388c-1.034-1.644-1.579-3.548-1.579-5.503 0-5.545 4.512-10.057 10.057-10.057 5.545 0 10.057 4.512 10.057 10.057 0 5.545-4.512 10.057-10.057 10.057z" />
    </svg>
  );
}

export function ShareMenu({ url, title, description, variant = "icon" }: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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
        // Fallback for environments where clipboard API is unavailable
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
  const shareDescription = description || siteConfig.metadata.tagline;
  const isMenuItem = variant === "menuItem";

  return (
    <div
      className={cn("relative", isMenuItem ? "flex w-full items-center" : "inline-flex items-center")}
      ref={menuRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isMenuItem ? "Share" : `Share ${siteConfig.brand.name}`}
        title={isMenuItem ? "Share" : `Share ${siteConfig.brand.name}`}
        className={
          isMenuItem
            ? cn(
                "flex w-full items-center gap-3 p-2 rounded-xl transition-colors group text-left cursor-pointer",
                isOpen ? "bg-slate-100/80 dark:bg-slate-800" : "hover:bg-slate-100/80 dark:hover:bg-slate-800"
              )
            : cn(
                "inline-flex items-center justify-center h-9 w-9 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer",
                isOpen && "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
              )
        }
      >
        {isMenuItem ? (
          <>
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#0f172a]/10 group-hover:text-[#0f172a] transition-colors shrink-0 dark:bg-slate-800 dark:text-slate-300">
              <Share2 className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0f172a]">
              Share
            </span>
          </>
        ) : (
          <Share2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Share options"
          className={cn(
            "absolute top-full mt-2 z-50 w-64 rounded-2xl bg-white border border-slate-200 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 dark:bg-slate-900 dark:border-slate-700",
            isMenuItem ? "left-0" : "right-0"
          )}
        >
          <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Share this page
            </p>
          </div>

          <div className="space-y-1">
            {/* Facebook */}
            <FacebookShareButton
              url={currentUrl}
              title={shareTitle}
              className="w-full text-left !flex"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group">
                <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#0f172a]/10 group-hover:text-[#0f172a] transition-colors shrink-0">
                  <FacebookIcon className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0f172a]">
                    Facebook
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Share to Facebook
                  </span>
                </div>
              </div>
            </FacebookShareButton>

            {/* Twitter / X */}
            <TwitterShareButton
              url={currentUrl}
              title={`${shareTitle} - ${shareDescription}`}
              className="w-full text-left !flex"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group">
                <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#0f172a]/10 group-hover:text-[#0f172a] transition-colors shrink-0">
                  <XTwitterIcon className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0f172a]">
                    Twitter / X
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Post to X (Twitter)
                  </span>
                </div>
              </div>
            </TwitterShareButton>

            {/* LinkedIn */}
            <LinkedinShareButton
              url={currentUrl}
              title={shareTitle}
              summary={shareDescription}
              className="w-full text-left !flex"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group">
                <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#0f172a]/10 group-hover:text-[#0f172a] transition-colors shrink-0">
                  <LinkedinIcon className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0f172a]">
                    LinkedIn
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Share to LinkedIn
                  </span>
                </div>
              </div>
            </LinkedinShareButton>

            {/* WhatsApp */}
            <WhatsappShareButton
              url={currentUrl}
              title={shareTitle}
              separator=" - "
              className="w-full text-left !flex"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group">
                <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#0f172a]/10 group-hover:text-[#0f172a] transition-colors shrink-0">
                  <WhatsappIcon className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0f172a]">
                    WhatsApp
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Send via WhatsApp
                  </span>
                </div>
              </div>
            </WhatsappShareButton>

            {/* Copy link to clipboard */}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full cursor-pointer group text-left"
            >
              <div
                className={cn(
                  "h-7 w-7 rounded-lg flex items-center justify-center transition-colors shrink-0",
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-600 group-hover:bg-[#0f172a]/10 group-hover:text-[#0f172a]"
                )}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0f172a]">
                    {copied ? "Link Copied!" : "Copy Link"}
                  </span>
                  {copied && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                      Copied
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                  {currentUrl}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
