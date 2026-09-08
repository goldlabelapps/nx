"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config";
import {
  Terminal,
  Code2,
  Copy,
  Check,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function FeatureExplorer() {
  const items = siteConfig.features.items;
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

  return (
    <section id="features" className="py-24 sm:py-32 relative bg-white overflow-hidden transition-colors duration-200">
      {/* Background glow lines */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0f172a]/10 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0f172a]/[0.06] border border-[#0f172a]/15 text-xs font-bold text-[#0f172a] mb-4 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5" />
            <span>Modular Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {siteConfig.features.sectionTitle || "Techstack"}
          </h2>
          {siteConfig.features.subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              {siteConfig.features.subtitle}
            </p>
          )}
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm max-w-full">
            {items.map((tab) => {
              const isActive = tab.id === activeItemId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveItemId(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-[#0f172a] text-white shadow-md shadow-[#0f172a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  )}
                >
                  <span>{tab.tabLabel || tab.title}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider",
                        isActive ? "bg-white/20 text-white" : "bg-[#0f172a]/10 text-[#0f172a]"
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

        {/* Active Tab Preview Display */}
        {activeItem && (
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 backdrop-blur-2xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Description Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f172a]/[0.06] border border-[#0f172a]/15 text-xs font-mono font-bold text-[#0f172a] mb-3">
                    <span>{activeItem.tag}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeItem.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {activeItem.description}
                </p>

                {activeItem.cta && (
                  <div className="pt-2">
                    <a
                      href={activeItem.cta.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0f172a] hover:text-[#1e293b] hover:underline transition-colors"
                    >
                      <span>{activeItem.cta.label}</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Right Interactive Code / Terminal Visual Column */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                  {/* Terminal / Code Editor Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-xs font-mono text-slate-700 font-bold flex items-center gap-1.5">
                        {activeItem.previewType === "terminal" ? (
                          <>
                            <Terminal className="h-3.5 w-3.5 text-orange-600" />
                            <span>build-pipeline — bash</span>
                          </>
                        ) : activeItem.codeSnippet ? (
                          <>
                            <Code2 className="h-3.5 w-3.5 text-[#0f172a]" />
                            <span>{activeItem.codeSnippet?.filename || "gateway.php"}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                            <span>event-stream — real-time automation</span>
                          </>
                        )}
                      </span>
                    </div>

                    {activeItem.codeSnippet && (
                      <button
                        onClick={() => handleCopyCode(activeItem.codeSnippet!.code)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm transition-colors text-xs font-mono cursor-pointer"
                      >
                        {copiedCode ? (
                          <Check className="h-3.5 w-3.5 text-orange-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                      </button>
                    )}
                  </div>

                  {/* Code / Output Window */}
                  <div className="p-5 font-mono text-xs sm:text-sm text-slate-800 bg-slate-50/70 overflow-x-auto leading-relaxed">
                    {activeItem.terminalSnippet && (
                      <div className="space-y-2">
                        {activeItem.terminalSnippet.commands.map((cmd, cIdx) => (
                          <div key={cIdx}>
                            {cmd.cmd && (
                              <div className="flex items-center justify-between gap-2 text-[#0f172a] font-semibold">
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-400 select-none font-normal">$</span>
                                  <span>{cmd.cmd}</span>
                                </div>
                                <button
                                  onClick={() => handleCopyCode(cmd.cmd!)}
                                  className="p-1 rounded hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 cursor-pointer"
                                  title="Copy command"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                            {cmd.output && (
                              <div className="text-slate-600 pl-4 font-mono font-medium">{cmd.output}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {activeItem.codeSnippet && (
                      <pre className="text-slate-800 whitespace-pre font-mono bg-transparent p-0 border-none">
                        <code>{activeItem.codeSnippet.code}</code>
                      </pre>
                    )}

                    {activeItem.previewType === "interactive-ui" && !activeItem.codeSnippet && !activeItem.terminalSnippet && (
                      <div className="p-4 space-y-3 font-sans bg-slate-50">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                          <div className="flex items-center gap-2.5">
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-xs font-mono font-bold text-slate-900">Webhook Dispatcher</span>
                          </div>
                          <span className="text-[11px] font-mono text-orange-900 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full font-bold">
                            Live Signed Events
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-1.5 text-[#0f172a] font-mono mb-1 font-bold">
                              <Sparkles className="h-3 w-3" />
                              <span>Payment Captured</span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-mono font-medium">Status: Processing • Invoice generated</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-1.5 text-orange-700 font-mono mb-1 font-bold">
                              <Layers className="h-3 w-3" />
                              <span>Event Stream</span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-mono font-medium">Latency: Instant (&lt; 2s)</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
