"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, ThemeMode } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

interface ThemeToggleProps {
  className?: string;
  variant?: "segmented" | "button";
  onChange?: (mode: ThemeMode) => void;
}

export function ThemeToggle({ className, variant = "segmented", onChange }: ThemeToggleProps) {
  const { mode, setMode, theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl", className)} />
    );
  }

  if (variant === "button") {
    const isDark = theme === "dark";
    return (
      <button
        type="button"
        onClick={() => {
          toggleTheme();
          onChange?.(isDark ? "light" : "dark");
        }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "inline-flex items-center justify-center h-8 w-8 rounded-full text-[#0f172a] bg-white hover:bg-slate-50 border border-[#0f172a]/15 dark:text-[#f8fafc] dark:bg-[#f8fafc]/10 dark:hover:bg-[#f8fafc]/15 dark:border-[#f8fafc]/30 transition-all duration-200 cursor-pointer",
          className
        )}
      >
        {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </button>
    );
  }

  const options: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
    { value: "system", label: "System", icon: <Monitor className="h-4 w-4" /> },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode"
      className={cn(
        "grid grid-cols-3 gap-1 p-1 bg-slate-100/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80",
        className
      )}
    >
      {options.map((option) => {
        const isActive = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => {
              setMode(option.value);
              onChange?.(option.value);
            }}
            className={cn(
              "flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer select-none",
              isActive
                ? "bg-white dark:bg-slate-700 text-[#0f172a] dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-600/60"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            )}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

