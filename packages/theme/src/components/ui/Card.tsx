import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "glow";
  hoverEffect?: boolean;
  theme?: "light" | "dark";
}

export function Card({
  className,
  variant = "default",
  hoverEffect = true,
  theme,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl transition-all duration-300 relative overflow-hidden";

  const isLight = theme === "light";
  const isDark = theme === "dark";

  const variantStyles = {
    default: isLight
      ? "bg-white border border-black/[0.08] text-[#2c2c2a] shadow-sm"
      : isDark
      ? "bg-[#2d3943] border border-white/[0.1] text-white shadow-sm"
      : "bg-white border border-black/[0.08] text-[#2c2c2a] shadow-sm dark:bg-[#2d3943] dark:border-white/[0.1] dark:text-white",
    glass: isLight
      ? "bg-white/85 backdrop-blur-xl border border-black/[0.08] text-[#2c2c2a] shadow-xl"
      : isDark
      ? "bg-[#2d3943]/90 backdrop-blur-xl border border-white/[0.12] text-white shadow-xl"
      : "bg-white/85 backdrop-blur-xl border border-black/[0.08] text-[#2c2c2a] shadow-xl dark:bg-[#2d3943]/90 dark:border-white/[0.12] dark:text-white",
    bordered: isLight
      ? "bg-neutral-50 border border-neutral-200 text-[#2c2c2a]"
      : isDark
      ? "bg-[#2c3741] border border-neutral-700 text-white"
      : "bg-neutral-50 border border-neutral-200 text-[#2c2c2a] dark:bg-[#2c3741] dark:border-neutral-700 dark:text-white",
    glow: isLight
      ? "bg-white border border-[#FFD849]/30 shadow-xl shadow-[#FFD849]/5 text-[#2c2c2a]"
      : isDark
      ? "bg-[#2d3943] border border-[#FFD849]/30 shadow-xl shadow-[#FFD849]/5 text-white"
      : "bg-white border border-[#FFD849]/30 shadow-xl shadow-[#FFD849]/5 text-[#2c2c2a] dark:bg-[#2d3943] dark:border-[#FFD849]/30 dark:shadow-[#FFD849]/5 dark:text-white",
  };

  const hoverStyles = hoverEffect
    ? isLight
      ? "hover:border-[#FFD849]/50 hover:translate-y-[-2px] hover:shadow-lg"
      : isDark
      ? "hover:border-[#FFD849]/60 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/40"
      : "hover:border-[#FFD849]/50 hover:translate-y-[-2px] hover:shadow-lg dark:hover:border-[#FFD849]/60 dark:hover:shadow-black/40"
    : "";

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        isLight && "light [color-scheme:light]",
        isDark && "dark [color-scheme:dark]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
