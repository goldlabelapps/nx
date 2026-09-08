"use client";

import React from "react";
import { useSiteConfig } from "../../context/ConfigContext";
import { ParticleCanvas } from "./ParticleCanvas";
import { Button } from "../ui/Button";
import { Rocket } from "lucide-react";
import type { HeroConfig } from "../../types";

export interface HeroSectionProps {
  config?: Partial<HeroConfig>;
  badgeLabel?: string;
}

export function HeroSection({ config, badgeLabel }: HeroSectionProps) {
  const siteConfig = useSiteConfig();
  const hero = config ? { ...siteConfig.hero, ...config } : siteConfig.hero;
  const pillBadge = badgeLabel || siteConfig.statement.badge || "Modular Application Template";

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 sm:pt-36 pb-16 overflow-hidden">
      <ParticleCanvas config={hero.particleField} />
      
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-[#012867]/15 via-slate-500/10 to-transparent rounded-full blur-3xl opacity-75" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#012867]/[0.06] border border-[#012867]/15 text-xs font-semibold text-[#012867] backdrop-blur-md mb-8 hover:bg-[#012867]/10 transition-colors cursor-default shadow-sm">
          <Rocket className="h-3.5 w-3.5 text-[#012867]" />
          <span>{pillBadge}</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.05]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#012867] via-[#01358d] to-[#011f52]">
            {hero.headline}
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          {hero.subheadline}
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button
            href={hero.primaryCta.href}
            variant="primary"
            size="lg"
            className="shadow-lg shadow-[#012867]/20 font-bold bg-[#012867] hover:bg-[#011f52] text-white"
          >
            <span>{hero.primaryCta.label}</span>
          </Button>

          <Button
            href={hero.secondaryCta.href}
            variant="secondary"
            size="lg"
            className="font-bold border-slate-300 hover:border-slate-400 text-slate-800 bg-slate-50 hover:bg-slate-100"
          >
            <span>{hero.secondaryCta.label}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
