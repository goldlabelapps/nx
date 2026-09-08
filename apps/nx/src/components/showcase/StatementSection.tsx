"use client";

import React from "react";
import { siteConfig } from "@/config";

export function StatementSection() {
  return (
    <section className="relative py-24 sm:py-36 overflow-hidden border-y border-slate-200/80 bg-slate-50/70 transition-colors duration-200">
      {/* Radiant ambient center glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-gradient-to-r from-[#0f172a]/10 via-slate-500/10 to-slate-400/10 rounded-full blur-3xl opacity-70" />

      {/* Floating Animated Badges / Glyphs */}
      <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto overflow-hidden">
        {siteConfig.statement.floatingIcons.map((icon, idx) => (
          <div
            key={idx}
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              animationDelay: `${icon.delay || 0}s`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-2xl bg-white border border-slate-200/80 backdrop-blur-md p-3.5 shadow-md transition-transform duration-700 hover:scale-110 animate-bounce"
          >
            <span
              style={{ color: icon.color || "#0f172a", fontSize: `${icon.size || 24}px` }}
              className="font-mono font-bold select-none leading-none"
            >
              {icon.symbol}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {siteConfig.statement.badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0f172a]/[0.06] border border-[#0f172a]/15 text-xs font-bold text-[#0f172a] mb-6 uppercase tracking-wider">
            <span>{siteConfig.statement.badge}</span>
          </div>
        )}

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight">
          {siteConfig.statement.headline}
        </h2>

        {siteConfig.statement.subtext && (
          <p className="mt-6 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {siteConfig.statement.subtext}
          </p>
        )}
      </div>
    </section>
  );
}
