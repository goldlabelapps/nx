"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { CleverText } from "@goldlabelapps/flash";
import { profileData } from "@/data/profileData";
import {
  Calendar,
  CheckCircle,
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { Slider } from "@mui/material";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

interface ErasTimelineProps {
  onlyTimeline?: boolean;
}

export function ErasTimeline({ onlyTimeline = false }: ErasTimelineProps) {
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  // sliderIndex: 0 = All Eras (1999–Present), 1..eras.length = Era 1..N
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const eras = profileData.eras;
  const activeEra = sliderIndex > 0 ? eras[sliderIndex - 1] : null;
  const selectedEraId = activeEra?.id ?? null;

  // Filter roles by selected Era
  const filteredRoles = useMemo(() => {
    let roles = profileData.roles;

    if (selectedEraId) {
      roles = roles.filter((r) => r.eraId === selectedEraId);
    }

    return roles;
  }, [selectedEraId]);

  const timelineContent = (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl transition-all">
      {/* Timeline Controls Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Career timeline</span>
              {activeEra && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  {activeEra.name}
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSliderIndex((prev) => (prev > 0 ? prev - 1 : eras.length))}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors cursor-pointer"
            title="Previous Era"
            aria-label="Previous Era"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSliderIndex((prev) => (prev < eras.length ? prev + 1 : 0))}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors cursor-pointer"
            title="Next Era"
            aria-label="Next Era"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {sliderIndex !== 0 && (
            <button
              type="button"
              onClick={() => setSliderIndex(0)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors cursor-pointer"
              title="Show All"
              aria-label="Show All"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* MUI Slider Component Showcase */}
      <div className="relative my-6 px-4">
        {/* Era Ticks / Markers */}
        <div className="flex justify-between items-center mb-3 text-center">
          <button
            type="button"
            onClick={() => setSliderIndex(0)}
            className={cn(
              "flex flex-col items-center cursor-pointer transition-all text-left group",
              sliderIndex === 0 ? "scale-105" : "opacity-70 hover:opacity-100"
            )}
          >
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full border-2 transition-all mb-1",
                sliderIndex === 0
                  ? "bg-indigo-600 border-white ring-4 ring-indigo-500/20"
                  : "bg-slate-300 dark:bg-slate-700 border-white dark:border-slate-800 group-hover:bg-indigo-400"
              )}
            />
            <span
              className={cn(
                "text-[11px] sm:text-xs font-bold transition-colors",
                sliderIndex === 0 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"
              )}
            >
              All
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">1999–26</span>
          </button>

          {eras.map((era, index) => {
            const step = index + 1;
            const isSelected = sliderIndex === step;
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => setSliderIndex(step)}
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all group",
                  isSelected ? "scale-105" : "opacity-70 hover:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border-2 transition-all mb-1",
                    isSelected
                      ? "bg-indigo-600 border-white ring-4 ring-indigo-500/20"
                      : "bg-slate-300 dark:bg-slate-700 border-white dark:border-slate-800 group-hover:bg-indigo-400"
                  )}
                  style={isSelected && era.color ? { backgroundColor: era.color } : {}}
                />
                <span
                  className={cn(
                    "text-[11px] sm:text-xs font-bold transition-colors line-clamp-1 max-w-[60px] sm:max-w-none text-center",
                    isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {era.years.split("–")[0]}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden md:inline max-w-[70px] truncate">
                  {era.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {mounted ? (
          <Slider
            value={sliderIndex}
            min={0}
            max={eras.length}
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => (val === 0 ? "All Eras" : eras[val - 1]?.name || `Era ${val}`)}
            onChange={(_, val) => setSliderIndex(val as number)}
            aria-label="Era Timeline Slider"
            sx={{
              color: "#d97706",
              height: 8,
              padding: "13px 0",
              "& .MuiSlider-track": {
                border: "none",
                background: "linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)",
              },
              "& .MuiSlider-rail": {
                opacity: 0.25,
                backgroundColor: "currentColor",
              },
              "& .MuiSlider-thumb": {
                height: 24,
                width: 24,
                backgroundColor: "#fff",
                border: "3px solid #d97706",
                boxShadow: "0 10px 15px -3px rgba(217, 119, 6, 0.35), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "0 0 0 10px rgba(217, 119, 6, 0.18)",
                },
              },
              "& .MuiSlider-valueLabel": {
                lineHeight: 1.2,
                fontSize: 12,
                background: "unset",
                padding: "4px 8px",
                width: "auto",
                height: "auto",
                borderRadius: 2,
                backgroundColor: "#1e293b",
                fontFamily: "inherit",
                fontWeight: 600,
              },
            }}
          />
        ) : (
          <div className="h-[34px] flex items-center py-[13px]">
            <div className="w-full h-[8px] rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        )}
      </div>

      {/* Active Era Info Box / Large Banner */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
        {activeEra ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/15 dark:via-amber-500/10 dark:to-transparent border border-amber-500/30 dark:border-amber-500/40 relative overflow-hidden shadow-sm">
            {/* Accent Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 to-amber-600"
              style={activeEra.color ? { backgroundColor: activeEra.color } : {}}
            />
            <div className="pl-2 space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white bg-amber-600 dark:bg-amber-500"
                  style={activeEra.color ? { backgroundColor: activeEra.color } : {}}
                >
                  {activeEra.years}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {activeEra.name}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {activeEra.description}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                  Tech Stack:
                </span>
                {activeEra.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-semibold rounded-md bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="self-end md:self-center shrink-0 text-right pl-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Matching roles</div>
              <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                {profileData.roles.filter((r) => r.eraId === activeEra.id).length}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/15 dark:via-amber-500/10 dark:to-transparent border border-amber-500/30 dark:border-amber-500/40 relative overflow-hidden shadow-sm">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-600 to-amber-500 text-white">
                  1999 – 2026+
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  All Web Eras Selected
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Showing complete career timeline across 20+ years, from early Flash/DHTML applications to modern React, Next.js App Router, and Agentic AI workflows.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                  Key Eras:
                </span>
                {eras.map((era) => (
                  <span
                    key={era.id}
                    className="px-2 py-0.5 text-xs font-semibold rounded-md bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 text-slate-700 dark:text-slate-300"
                  >
                    {era.name.split(" ")[0]} ({era.years})
                  </span>
                ))}
              </div>
            </div>

            <div className="self-end md:self-center shrink-0 text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total roles</div>
              <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                {profileData.roles.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (onlyTimeline) {
    return (
      <section id="timeline" className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4 sm:py-6">
        {timelineContent}
      </section>
    );
  }

  return (
    <section id="timeline" className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4 sm:py-6">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#C09F52]/10 border border-[#85580C]/30 dark:border-[#C09F52]/30 text-xs font-bold text-[#85580C] dark:text-[#F1D57A]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:!text-white">
            <CleverText text="engineering every era" speed={40} style={{ fontFamily: "inherit" }} />
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Use the linear timeline slider or select a web era to explore 20+ years of fullstack professional experience.
          </p>
        </div>

        {/* Interactive Era Timeline Slider */}
        {timelineContent}
      </div>

      {/* Eras Ribbon Filter Grid */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {eras.map((era, index) => {
          const step = index + 1;
          const isSelected = sliderIndex === step;
          return (
            <button
              key={era.id}
              onClick={() => setSliderIndex(isSelected ? 0 : step)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-slate-900 dark:bg-slate-800 text-white dark:text-white border-[#85580C] dark:border-[#C09F52] shadow-lg scale-105"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-[#85580C] dark:hover:border-[#C09F52]"
              }`}
            >
              <div className={`text-xs font-bold ${isSelected ? "text-amber-300 dark:text-amber-400" : "text-indigo-600 dark:text-indigo-400"}`}>
                {era.years}
              </div>
              <div className="font-extrabold text-sm mt-1 leading-tight">{era.name}</div>
              <div className={`text-[11px] mt-2 line-clamp-1 ${isSelected ? "text-slate-300 dark:text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                {era.technologies.slice(0, 2).join(", ")}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicator / Large Banner */}
      {activeEra && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#85580C]/15 via-[#85580C]/10 to-transparent dark:from-[#C09F52]/20 dark:via-[#C09F52]/10 dark:to-transparent border border-[#85580C]/40 dark:border-[#C09F52]/50 shadow-sm flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#85580C] dark:text-[#F1D57A]">
              Filtering Experiences ({filteredRoles.length} matching)
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span>Era: {activeEra.name} ({activeEra.years})</span>
            </div>
          </div>
          <button
            onClick={() => setSliderIndex(0)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 transition-colors shadow-sm cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Experience Roles List (Clickable Cards) */}
      <div className="space-y-6">
        {filteredRoles.length === 0 ? (
          <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-base text-slate-600 dark:text-slate-400 font-medium">
              No experiences match your filter criteria.
            </p>
            <button
              onClick={() => setSliderIndex(0)}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Clear Filter & Show All Experiences
            </button>
          </div>
        ) : (
          filteredRoles.map((role) => {
            // Determine detail page link based on role's primary skill tag
            const primarySkillTag = role.skills.map((s) =>
              profileData.tags.find(
                (t) => t.name.toLowerCase() === s.toLowerCase() || s.toLowerCase().includes(t.slug)
              )
            ).find(Boolean);

            const detailHref = primarySkillTag
              ? `/tag/${primarySkillTag.slug}`
              : role.url || `/tag/agentic-ai`;

            return (
              <Link
                key={role.id}
                href={detailHref}
                className="block group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <span>{role.title}</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">@ {role.company}</span>
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {role.period}
                      </span>
                      <span>•</span>
                      <span>{role.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 opacity-80 group-hover:opacity-100 transition-opacity self-start sm:self-auto">
                    <span>View Experience Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed">
                  {role.summary}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {role.highlights.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Role Skills */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Skills:</span>
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 group-hover:bg-indigo-100 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}


