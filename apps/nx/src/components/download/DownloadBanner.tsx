"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config";
import { Button } from "@/components/ui/Button";
import {
  Terminal,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function DownloadBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.authCta.cliQuickInstall.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section id="github" className="py-24 sm:py-36 relative bg-white overflow-hidden transition-colors duration-200">
      <a id="signup" aria-hidden="true" className="sr-only">Sign up</a>
      {/* Radiant ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-tr from-[#0f172a]/15 via-slate-500/10 to-slate-400/10 rounded-full blur-3xl opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Curved Banner Container */}
        <div className="rounded-3xl sm:rounded-[40px] bg-gradient-to-b from-slate-50 via-white to-slate-50 border border-slate-200 p-8 sm:p-14 lg:p-20 shadow-2xl relative overflow-hidden text-center">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#0f172a]/15 text-xs font-bold text-[#0f172a] mb-6 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#0f172a]" />
            <span>{siteConfig.authCta.badge}</span>
          </div>

          {/* Banner Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            {siteConfig.authCta.title}
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.authCta.subtitle}
          </p>

          {/* Primary Action and Secondary CTA */}
          <div className="mt-10 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center gap-3 text-sm font-semibold animate-in fade-in zoom-in-95 duration-200">
              <CheckCircle2 className="h-5 w-5 text-slate-700 shrink-0" />
              <span>Forever Free Version</span>
            </div>

            {/* Direct Download Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={siteConfig.authCta.primaryCta.href}
                variant="primary"
                size="md"
                icon="Github"
                iconPosition="left"
                external
                className="font-bold shadow-md shadow-[#0f172a]/20 dark:shadow-[#f8fafc]/20"
              >
                <span>{siteConfig.authCta.primaryCta.label}</span>
              </Button>

              <Button
                href={siteConfig.authCta.secondaryCta.href}
                variant="outline"
                size="md"
                className="font-bold border-slate-300 hover:border-slate-400 text-slate-800 bg-white hover:text-[#0f172a]"
              >
                <span>{siteConfig.authCta.secondaryCta.label}</span>
              </Button>
            </div>
          </div>

          {/* Quick CLI Shell Command Box */}
          <div className="mt-12 sm:mt-16 max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-slate-600 mb-3 font-medium">
              {siteConfig.authCta.cliQuickInstall.label}
            </p>
            <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-100 border border-slate-200 text-left font-mono text-xs sm:text-sm text-slate-800 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 overflow-x-auto select-all">
                <Terminal className="h-4 w-4 text-slate-600 shrink-0" />
                <span className="text-[#0f172a] font-mono font-bold">{siteConfig.authCta.cliQuickInstall.command}</span>
              </div>
              <button
                onClick={handleCopyCommand}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm transition-colors shrink-0 text-xs font-sans font-bold cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-slate-700" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Verified Guarantee Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="h-4 w-4 text-slate-600 shrink-0" />
            <span>{siteConfig.authCta.trustBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Named alias for semantic consistency
export const AuthCtaBanner = DownloadBanner;
