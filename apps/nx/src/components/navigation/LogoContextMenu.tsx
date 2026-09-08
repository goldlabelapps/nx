"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, FileText } from "lucide-react";
import { siteConfig } from "@/config";

export function BrandLogo({ className = "h-8 w-auto", iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  const logoLight = siteConfig.brand.logoLight || "/svg/headerlogo_light.svg";
  const logoDark = siteConfig.brand.logoDark || "/svg/headerlogo_dark.svg";

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <Image
        src={logoLight}
        alt={siteConfig.brand.name}
        width={34}
        height={34}
        className="h-8 w-8 shrink-0 object-contain dark:hidden"
        priority
      />
      <Image
        src={logoDark}
        alt={siteConfig.brand.name}
        width={34}
        height={34}
        className="h-8 w-8 shrink-0 object-contain hidden dark:block"
        priority
      />
      {!iconOnly && (
        <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0f172a] dark:text-[#f8fafc] inline-flex items-center">
          <span>
            {siteConfig.brand.name}
          </span>
        </span>
      )}
    </div>
  );
}

export function LogoContextMenu({ iconOnly = false }: { iconOnly?: boolean }) {
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
      const svgString = `<svg width="3163px" height="1064px" viewBox="0 0 3163 1064" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" fill="none" fill-rule="evenodd"><g id="Group" transform="translate(81.0811, 81.0811)" fill="#0f172a"><g id="SvgjsG1028" transform="translate(0, -386.1004)" fill-rule="nonzero"><path d="M648.648662,1287.00131 L187.902192,1287.00131 C57.9150591,1287.00131 -3.81028931e-14,1226.51225 -3.81028931e-14,1081.0811 L-3.81028931e-14,592.020604 C-3.81028931e-14,446.589456 57.9150591,386.100394 187.902192,386.100394 L648.648662,386.100394 C809.523826,386.100394 810.810827,516.087527 810.810827,581.724593 C810.810827,630.630643 809.523826,763.191779 648.648662,763.191779 L603.603616,763.191779 L603.603616,909.909928 L648.648662,909.909928 C809.523826,909.909928 810.810827,1046.33207 810.810827,1091.37711 C810.810827,1153.15318 809.523826,1287.00131 648.648662,1287.00131 Z" id="Shape"></path></g></g></g></svg>`;
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
        className={`group flex items-center text-slate-900 hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#0f172a]/30 rounded-lg ${
          iconOnly ? "p-1 rounded-full" : "py-1"
        }`}
        title={`Right click for ${siteConfig.brand.name} brand assets`}
        aria-label={siteConfig.brand.name}
      >
        <BrandLogo iconOnly={iconOnly} />
      </Link>

      {isOpen && (
        <div
          ref={menuRef}
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
          className="fixed z-50 min-w-[200px] rounded-xl bg-white/95 border border-slate-200 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            onClick={handleCopySvg}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 hover:bg-[#0f172a]/[0.05] hover:text-[#0f172a] transition-colors cursor-pointer"
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
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 hover:bg-[#0f172a]/[0.05] hover:text-[#0f172a] transition-colors"
          >
            <FileText className="h-4 w-4 text-slate-500" />
            <span>{siteConfig.brand.contextMenu.guidelinesLabel}</span>
          </a>
        </div>
      )}
    </div>
  );
}
