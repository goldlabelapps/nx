"use client";

import React from "react";
import { useSiteConfig } from "../../context/ConfigContext";
import { Sparkles } from "lucide-react";
import type { StatementConfig } from "../../types";

export interface StatementSectionProps {
  config?: Partial<StatementConfig>;
}

export function StatementSection({ config }: StatementSectionProps) {
  const siteConfig = useSiteConfig();
  const statement = config ? { ...siteConfig.statement, ...config } : siteConfig.statement;

  return (
    <section className="py-24 sm:py-32 relative bg-slate-900 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#38bdf81a_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {statement.badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-sky-400 mb-6 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{statement.badge}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-100 max-w-4xl mx-auto">
          {statement.headline}
        </h2>

        {statement.subtext && (
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {statement.subtext}
          </p>
        )}

        {statement.floatingIcons && statement.floatingIcons.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {statement.floatingIcons.map((icon, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
              >
                <span className="text-lg">{icon.symbol}</span>
                {icon.label && <span className="text-xs font-semibold text-slate-300">{icon.label}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
