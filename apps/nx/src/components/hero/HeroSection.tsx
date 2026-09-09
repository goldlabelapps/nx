"use client";

import React from "react";
import { siteConfig } from "@/config";
import { ParticleCanvas } from "./ParticleCanvas";
import { Button } from "@/components/ui/Button";
import { Rocket } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 sm:pt-36 pb-16 overflow-hidden">
      {/* Background Particle Mesh & Ambient Glow */}
      <ParticleCanvas />
      
      {/* Radiant radial gradient background blooms */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-[#0f172a]/15 via-slate-500/10 to-transparent rounded-full blur-3xl opacity-75" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Feature Pill Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0f172a]/15 text-xs font-semibold text-[#0f172a] backdrop-blur-md hover:bg-slate-50 transition-colors cursor-default shadow-sm dark:bg-[#f8fafc]/10 dark:border-[#f8fafc]/30 dark:text-[#f8fafc] dark:hover:bg-[#f8fafc]/15">
          <Rocket className="h-3.5 w-3.5 text-[#0f172a] dark:text-[#f8fafc]" />
          <span>{siteConfig.statement.badge || "Lorem Ipsum Badge"}</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.05]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] dark:from-[#f8fafc] dark:via-slate-200 dark:to-[#f8fafc]">
            {siteConfig.hero.headline}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          {siteConfig.hero.subheadline}
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button
            href={siteConfig.hero.primaryCta.href}
            variant="primary"
            size="lg"
            className="shadow-lg shadow-[#0f172a]/20 dark:shadow-[#f8fafc]/20 font-bold"
          >
            <span>{siteConfig.hero.primaryCta.label}</span>
          </Button>

          <Button
            href={siteConfig.hero.secondaryCta.href}
            variant="secondary"
            size="lg"
            className="font-bold border-slate-300 hover:border-slate-400 text-slate-800 bg-slate-50 hover:bg-slate-100"
          >
            <span>{siteConfig.hero.secondaryCta.label}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
