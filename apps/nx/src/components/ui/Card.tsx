import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "glow";
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = "default",
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl transition-all duration-300 relative overflow-hidden";

  const variantStyles = {
    default: "bg-white border border-black/[0.08] text-[#2c2c2a] shadow-sm dark:bg-[#2d3943] dark:border-white/[0.1] dark:text-white",
    glass: "bg-white/85 backdrop-blur-xl border border-black/[0.08] text-[#2c2c2a] shadow-xl dark:bg-[#2d3943]/90 dark:border-white/[0.12] dark:text-white",
    bordered: "bg-neutral-50 border border-neutral-200 text-[#2c2c2a] dark:bg-[#2c3741] dark:border-neutral-700 dark:text-white",
    glow: "bg-white border border-slate-300 shadow-xl shadow-slate-900/5 text-[#2c2c2a] dark:bg-[#2d3943] dark:border-slate-700 dark:shadow-slate-100/5 dark:text-white",
  };

  const hoverStyles = hoverEffect
    ? "hover:border-slate-400 hover:translate-y-[-2px] hover:shadow-lg dark:hover:border-slate-500 dark:hover:shadow-black/40"
    : "";

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}
