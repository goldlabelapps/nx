"use client";

import React, { useState } from "react";
import { useSiteConfig } from "../../context/ConfigContext";
import { VideoModal } from "../hero/VideoModal";
import { Play, ChevronLeft, ChevronRight, Video } from "lucide-react";
import type { VideoItem } from "../../types";

export interface VideoSectionProps {
  items?: VideoItem[];
  title?: string;
  subtitle?: string;
}

export function VideoSection({
  items: propItems,
  title: propTitle,
  subtitle: propSubtitle,
}: VideoSectionProps) {
  const siteConfig = useSiteConfig();
  const items = propItems || siteConfig.videos.items || [];
  const title = propTitle || siteConfig.videos.title || "Video Showcase";
  const subtitle = propSubtitle || siteConfig.videos.subtitle;

  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const activeVideo = items[activeIdx] || items[0];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (!items.length) return null;

  return (
    <section id="videos" className="py-24 sm:py-32 relative bg-slate-50 overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#012867]/[0.06] border border-[#012867]/15 text-xs font-bold text-[#012867] mb-4 backdrop-blur-md">
            <Video className="h-3.5 w-3.5" />
            <span>Walkthroughs & Demos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {items.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  idx === activeIdx
                    ? "bg-[#012867] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200"
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous video"
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next video"
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {activeVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#012867]/[0.06] text-[#012867] font-semibold text-xs border border-[#012867]/15">
                <span>{activeVideo.badge || activeVideo.title}</span>
                <span>•</span>
                <span>{activeVideo.duration}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {activeVideo.tagline || activeVideo.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeVideo.description}
              </p>

              {activeVideo.keyFeatures && activeVideo.keyFeatures.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {activeVideo.keyFeatures.map((kf, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <span className="text-[#012867] font-bold">✓</span>
                      <span>{kf}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#012867] hover:bg-[#011f52] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Watch Video Demo</span>
                </button>

                {activeVideo.cta && (
                  <a
                    href={activeVideo.cta.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
                  >
                    <span>{activeVideo.cta.label}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center">
              <div
                onClick={() => setModalOpen(true)}
                className={`relative w-full rounded-2xl bg-slate-900 overflow-hidden shadow-2xl group cursor-pointer border border-slate-800 ${
                  activeVideo.orientation === "portrait"
                    ? "max-w-[280px] aspect-[9/16]"
                    : "aspect-video"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="h-16 w-16 rounded-full bg-[#012867] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <span className="text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {activeVideo.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeVideo && (
        <VideoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          videoUrl={activeVideo.videoUrl}
          title={activeVideo.title}
          badge={activeVideo.badge}
          orientation={activeVideo.orientation}
        />
      )}
    </section>
  );
}


