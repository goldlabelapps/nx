"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useSiteConfig } from "../../context/ConfigContext";
import { Button } from "../ui/Button";
import {
  Terminal,
  Copy,
  Check,
  Mail,
  CheckCircle2,
} from "lucide-react";
import type { AuthCtaConfig } from "../../types";

export interface DownloadBannerProps {
  config?: Partial<AuthCtaConfig>;
}

export function DownloadBanner({ config }: DownloadBannerProps) {
  const siteConfig = useSiteConfig();
  const authCta = config ? { ...siteConfig.authCta, ...config } : siteConfig.authCta;

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.85 },
      colors: ["#012867", "#64748B", "#38BDF8", "#01358d", "#0F172A"],
    });

    setSubmitted(true);
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(authCta.cliQuickInstall.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section id="download" className="py-24 sm:py-36 relative bg-white overflow-hidden transition-colors duration-200">
      <a id="signup" aria-hidden="true" className="sr-only">Sign up</a>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-tr from-[#012867]/15 via-slate-500/10 to-slate-400/10 rounded-full blur-3xl opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl sm:rounded-[40px] bg-gradient-to-b from-slate-50 via-white to-slate-50 border border-slate-200 p-8 sm:p-14 lg:p-20 shadow-2xl relative overflow-hidden text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#012867]/[0.06] border border-[#012867]/15 text-xs font-bold text-[#012867] mb-6 backdrop-blur-md">
            <span>{authCta.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight mb-4">
            {authCta.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            {authCta.subtitle}
          </p>

          {!submitted ? (
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#012867] dark:focus:ring-blue-400 shadow-inner"
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                Get Started
              </Button>
            </form>
          ) : (
            <div className="max-w-md mx-auto mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>Setup guide & download dispatched to {email}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button href={authCta.primaryCta.href} variant="primary" size="lg">
              {authCta.primaryCta.label}
            </Button>
            <Button href={authCta.secondaryCta.href} variant="secondary" size="lg">
              {authCta.secondaryCta.label}
            </Button>
          </div>

          {authCta.cliQuickInstall && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono border border-slate-800 shadow-md">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>{authCta.cliQuickInstall.command}</span>
              <button
                type="button"
                onClick={handleCopyCommand}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
