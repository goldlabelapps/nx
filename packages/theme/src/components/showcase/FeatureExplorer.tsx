"use client";

import React, { useState } from "react";
import { useSiteConfig } from "../../context/ConfigContext";
import type { FeatureItem } from "../../types";
import {
  Terminal,
  Code2,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { cn } from "../../lib/utils";

export interface FeatureExplorerProps {
  items?: FeatureItem[];
  sectionTitle?: string;
  subtitle?: string;
  badgeLabel?: string;
}

export function FeatureExplorer({
  items: propItems,
  sectionTitle: propTitle,
  subtitle: propSubtitle,
  badgeLabel,
}: FeatureExplorerProps) {
  const siteConfig = useSiteConfig();
  const items = propItems || siteConfig.features.items || [];
  const sectionTitle = propTitle || siteConfig.features.sectionTitle || "Techstack";
  const subtitle = propSubtitle || siteConfig.features.subtitle;
  const badge = badgeLabel || siteConfig.statement.badge || "Architecture & Capabilities";

  const [activeItemId, setActiveItemId] = useState(items[0]?.id || "");
  const [copiedCode, setCopiedCode] = useState(false);

  const activeItem: FeatureItem =
    items.find((t) => t.id === activeItemId) || items[0];

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!items.length) return null;

  return (
    <section id="features" className="py-24 sm:py-32 relative bg-white overflow-hidden transition-colors duration-200">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#012867]/10 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#012867]/[0.06] border border-[#012867]/15 text-xs font-bold text-[#012867] mb-4 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5" />
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {sectionTitle}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm max-w-full">
            {items.map((tab) => {
              const isActive = tab.id === activeItem?.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveItemId(tab.id)}
                  className={cn(
                    "px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2",
                    isActive
                      ? "bg-white text-[#012867] shadow-sm font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  )}
                >
                  <span>{tab.tabLabel || tab.title}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        isActive
                          ? "bg-[#012867]/[0.08] text-[#012867]"
                          : "bg-slate-200 text-slate-600"
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {activeItem && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 shadow-xl transition-all duration-300">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#012867]/[0.06] text-[#012867] font-semibold text-xs border border-[#012867]/15">
                <span>{activeItem.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {activeItem.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeItem.description}
              </p>

              {activeItem.cta && (
                <div className="pt-2">
                  <a
                    href={activeItem.cta.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#012867] hover:underline"
                  >
                    <span>{activeItem.cta.label}</span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              {activeItem.previewType === "terminal" && activeItem.terminalSnippet && (
                <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      {activeItem.terminalSnippet.prompt || "terminal"}
                    </span>
                    <Terminal className="h-4 w-4 text-slate-500" />
                  </div>

                  <div className="p-4 sm:p-6 space-y-4">
                    {activeItem.terminalSnippet.commands.map((cmd, cIdx) => (
                      <div key={cIdx} className="space-y-1.5">
                        {cmd.cmd && (
                          <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-2 text-emerald-400">
                              <span>$</span>
                              <span className="text-slate-100">{cmd.cmd}</span>
                            </div>
                            <button
                              onClick={() => handleCopyCode(cmd.cmd!)}
                              title="Copy command"
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white"
                            >
                              {copiedCode ? (
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        )}
                        {cmd.output && (
                          <p className="text-slate-400 text-xs sm:text-xs leading-relaxed whitespace-pre-wrap pl-4 border-l border-slate-700">
                            {cmd.output}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeItem.previewType === "code" && activeItem.codeSnippet && (
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-[#012867] dark:text-[#38BDF8]" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {activeItem.codeSnippet.filename || "snippet"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(activeItem.codeSnippet!.code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200/80 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm text-slate-900 dark:text-slate-100 bg-transparent border-0">
                    <code>{activeItem.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {activeItem.previewType === "interactive-ui" && (
                <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-inner flex flex-col items-center justify-center min-h-[260px] text-center space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#012867]/[0.08] text-[#012867] flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{activeItem.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">{activeItem.description}</p>
                  </div>
                  {activeItem.cta && (
                    <a
                      href={activeItem.cta.href}
                      className="px-4 py-2 rounded-full bg-[#012867] text-white text-xs font-bold shadow hover:bg-[#011f52] transition-colors"
                    >
                      {activeItem.cta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
