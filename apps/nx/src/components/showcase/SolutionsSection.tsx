"use client";

import React from "react";
import { siteConfig } from "@/config";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 sm:py-32 relative bg-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0f172a]/[0.06] border border-[#0f172a]/15 text-xs font-bold text-[#0f172a] mb-4 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {siteConfig.solutions.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {siteConfig.solutions.subtitle}
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {siteConfig.solutions.cards.map((card: SolutionCard) => {
            const isFeatured = card.highlighted;

            return (
              <Card
                key={card.id}
                variant={isFeatured ? "glow" : "default"}
                className={cn(
                  "p-8 sm:p-10 flex flex-col justify-between relative rounded-3xl",
                  isFeatured
                    ? "bg-white border-[#0f172a]/40 shadow-2xl shadow-[#0f172a]/10 ring-1 ring-[#0f172a]/20"
                    : "bg-slate-50/80 border-slate-200/80 shadow-md"
                )}
              >
                <div>
                  {/* Top Badge & Tier Name */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
                      {card.tier}
                    </span>
                    {isFeatured && (
                      <span className="px-3 py-1 rounded-full bg-[#0f172a] text-white text-xs font-extrabold shadow-sm">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {card.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                    {card.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3.5 pt-4 border-t border-slate-100 mb-10">
                    {card.features.map((feat: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <Check className="h-4 w-4 text-slate-800 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <Button
                  href={card.cta.href}
                  variant={card.cta.variant || (isFeatured ? "primary" : "secondary")}
                  size="lg"
                  icon="ArrowRight"
                  iconPosition="right"
                  className={cn(
                    "w-full justify-center text-sm font-bold shadow-sm",
                    isFeatured
                      ? "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200"
                  )}
                >
                  {card.cta.label}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
