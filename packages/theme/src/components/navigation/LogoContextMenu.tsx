"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, FileText } from "lucide-react";
import { useSiteConfig } from "../../context/ConfigContext";

export function BrandLogo({ className = "h-8 w-auto" }: { className?: string }) {
  const siteConfig = useSiteConfig();
  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <Image
        src={siteConfig.brand.logoSrc || "/svg/favicon_light.svg"}
        alt={siteConfig.brand.name}
        width={34}
        height={34}
        className="h-8 w-8 shrink-0 object-contain"
        priority
      />
      <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#012867] inline-flex items-center">
        <span>{siteConfig.brand.name}</span>
      </span>
    </div>
  );
}

export const NxLogo = BrandLogo;

export function LogoContextMenu() {
  const siteConfig = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: Math.min(e.clientX, window.innerWidth - 220),
        y: e.clientY + 8,
      });
    }
    setIsOpen(true);
  };

  const handleCopySvg = async () => {
    try {
      const svgString = siteConfig.brand.customSvgLogo || `<svg width="34" height="34" viewBox="0 0 34 34" fill="#012867"><circle cx="17" cy="17" r="16"/></svg>`;
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", () => setIsOpen(false));
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} onContextMenu={handleContextMenu} className="relative inline-flex items-center">
      <Link
        href="/"
        className="group flex items-center py-1 text-slate-900 hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#012867]/30 rounded-lg"
        title={`Right click for ${siteConfig.brand.name} brand assets`}
        aria-label={siteConfig.brand.name}
      >
        <BrandLogo />
      </Link>

      {isOpen && (
        <div
          ref={menuRef}
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
          className="fixed z-50 min-w-[200px] rounded-xl bg-white/95 border border-slate-200 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            onClick={handleCopySvg}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 hover:bg-[#012867]/[0.05] hover:text-[#012867] transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="h-4 w-4 text-slate-700" />
            ) : (
              <Copy className="h-4 w-4 text-slate-500" />
            )}
            <span>{copied ? "Copied SVG!" : siteConfig.brand.contextMenu.copySvgLabel}</span>
          </button>
          <div className="my-1 h-px bg-slate-100" />
          <a
            href={siteConfig.brand.contextMenu.guidelinesUrl}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 hover:bg-[#012867]/[0.05] hover:text-[#012867] transition-colors"
          >
            <FileText className="h-4 w-4 text-slate-500" />
            <span>{siteConfig.brand.contextMenu.guidelinesLabel}</span>
          </a>
        </div>
      )}
    </div>
  );
}
