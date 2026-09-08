"use client";

import React from "react";
import { useSiteConfig } from "../../context/ConfigContext";
import { Button } from "../ui/Button";
import { Check, Sparkles } from "lucide-react";
import type { SolutionsConfig } from "../../types";

export interface SolutionsSectionProps {
  config?: Partial<SolutionsConfig>;
}

export function SolutionsSection({ config }: SolutionsSectionProps) {
  const siteConfig = useSiteConfig();
  const solutions = config ? { ...siteConfig.solutions, ...config } : siteConfig.solutions;

  return (
    <section id="solutions" className="py-24 sm:py-32 relative bg-slate-50 overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#012867]/[0.06] border border-[#012867]/15 text-xs font-bold text-[#012867] mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pricing & Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {solutions.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {solutions.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {solutions.cards.map((card) => (
            <div
              key={card.id}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                card.highlighted
                  ? "bg-white border-2 border-[#012867] shadow-2xl relative"
                  : "bg-white border border-slate-200 shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {card.tier}
                  </span>
                  {card.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#012867]/[0.08] text-[#012867] border border-[#012867]/20">
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">
                  {card.heading}
                </h3>
                <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                  {card.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                  {card.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="rounded-full p-1 bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                href={card.cta.href}
                variant={card.cta.variant === "primary" ? "primary" : "secondary"}
                className={`w-full justify-center ${
                  card.cta.variant === "primary"
                    ? "bg-[#012867] hover:bg-[#011f52] text-white shadow-md"
                    : "border-slate-300 text-slate-800 hover:bg-slate-100"
                }`}
              >
                {card.cta.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
