"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { VideoModal } from "@/components/hero/VideoModal";
import { CleverText } from "@goldlabelapps/flash";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Play,
  Monitor,
  Smartphone,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videos: VideoItem[] = siteConfig.videos?.items || [];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const currentVideo = videos[activeIndex] || videos[0];

  if (!currentVideo) return null;

  const isPortrait = currentVideo.orientation === "portrait";

  return (
    <section
      id="videos"
      className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4 sm:py-6"
    >
      {/* Anchor for backward compatibility */}
      <a id="use-cases" className="sr-only" aria-hidden="true">
        Use Cases
      </a>

      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#C09F52]/10 border border-[#85580C]/30 dark:border-[#C09F52]/30 text-xs font-bold text-[#85580C] dark:text-[#F1D57A]">
            <Play className="w-3.5 h-3.5" />
            <span>Videos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:!text-white">
            <CleverText
              text={siteConfig.videos?.title || `${siteConfig.brand.name} in Action`}
              speed={40}
              style={{ fontFamily: "inherit" }}
            />
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {siteConfig.videos?.subtitle || "Watch live demonstration recordings of the app's core flows, dashboard, and mobile experience."}
          </p>
        </div>

        {/* Tab Navigation Pill Bar with Prev/Next Controls */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm max-w-full overflow-x-auto scrollbar-none gap-1 sm:gap-1.5">
            {videos.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-[#0f172a] text-white shadow-md shadow-[#0f172a]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  )}
                >
                  <Play
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isActive ? "text-white fill-white" : "text-slate-400"
                    )}
                  />
                  <span>{item.title}</span>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold tracking-wide",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white text-[#0f172a] border border-slate-200"
                    )}
                  >
                    {item.duration}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm active:scale-95 shrink-0"
            aria-label="Next video"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Active Highlighted Video Bento Card */}
        <Card
          variant="glow"
          className="p-6 sm:p-10 lg:p-12 bg-white backdrop-blur-xl border-slate-200/80 shadow-2xl rounded-3xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0f172a]/15 text-[#0f172a] text-xs font-mono font-bold">
                  {isPortrait ? (
                    <Smartphone className="h-3.5 w-3.5 text-slate-600" />
                  ) : (
                    <Monitor className="h-3.5 w-3.5 text-[#0f172a]" />
                  )}
                  <span>{currentVideo.badge || (isPortrait ? "Mobile Flow" : "Desktop Flow")}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-mono font-semibold">
                  <span>Duration:</span>
                  <span className="font-bold text-slate-900">{currentVideo.duration}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  <Link
                    href={`/videos/${currentVideo.id}`}
                    className="hover:underline text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {currentVideo.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {currentVideo.description}
                </p>
              </div>

              {/* Key Features / Bullet points */}
              {currentVideo.keyFeatures && (
                <div className="space-y-2.5 pt-2">
                  {currentVideo.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="md"
                  icon="Play"
                  iconPosition="left"
                  className="font-bold shadow-md shadow-[#0f172a]/20 dark:shadow-[#f8fafc]/20"
                >
                  Watch
                </Button>
              </div>
            </div>

            {/* Right Video Preview Frame Column */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div
                onClick={() => setIsModalOpen(true)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl transition-all duration-300 hover:shadow-[#0f172a]/20 hover:border-slate-700 w-full flex items-center justify-center"
              >
                {/* Dynamic Frame: Portrait Phone Mockup vs 16:9 Landscape Frame */}
                {isPortrait ? (
                  <div className="py-6 px-4 w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
                    <div className="relative w-full max-w-[240px] sm:max-w-[260px] aspect-[9/16] rounded-3xl border-4 border-slate-700 bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
                      {/* Top Phone Notch */}
                      <div className="absolute top-2 inset-x-0 flex justify-center z-20 pointer-events-none">
                        <div className="h-3.5 w-20 bg-slate-900 rounded-full border border-white/10" />
                      </div>

                      {/* Video element */}
                      <video
                        src={currentVideo.videoUrl}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 group-hover:bg-black/20 transition-colors p-4">
                        <div className="h-14 w-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                          <Play className="h-6 w-6 fill-white ml-0.5" />
                        </div>
                        <span className="mt-3 text-xs font-bold text-white tracking-wider uppercase drop-shadow-md bg-black/60 px-3 py-1 rounded-full border border-white/15">
                          Tap to Play
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                    <video
                      src={currentVideo.videoUrl}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Window Controls Overlay */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="ml-1.5 text-[10px] font-mono text-slate-300 font-semibold">
                        {currentVideo.badge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-20">
                      <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-orange-300 bg-orange-950/80 border border-orange-500/30 px-2 py-0.5 rounded-full">
                        <Maximize2 className="h-3 w-3" /> 16:9 HD
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 group-hover:bg-black/20 transition-colors p-4">
                      <div className="h-16 w-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                        <Play className="h-7 w-7 fill-white ml-1" />
                      </div>
                      <span className="mt-3 text-xs font-bold text-white tracking-wider uppercase drop-shadow-md bg-black/60 px-3.5 py-1 rounded-full border border-white/15">
                        Click to Play
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Video Modal Lightbox */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={currentVideo.videoUrl}
        title={currentVideo.title}
        badge={currentVideo.badge}
        orientation={currentVideo.orientation}
      />
    </section>
  );
}

export const UseCaseSlider = VideoSection;
