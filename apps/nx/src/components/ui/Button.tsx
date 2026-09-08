"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Download,
  ArrowRight,
  ChevronDown,
  Play,
  ExternalLink,
  Sparkles,
  Terminal,
  Code2,
  Check,
} from "lucide-react";

function GithubMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 1.5A10.5 10.5 0 0 0 8.68 22c.53.1.72-.23.72-.52v-1.8c-2.94.64-3.56-1.25-3.56-1.25-.48-1.2-1.17-1.52-1.17-1.52-.96-.65.07-.64.07-.64 1.06.08 1.62 1.08 1.62 1.08.94 1.6 2.47 1.14 3.07.87.1-.68.37-1.14.67-1.4-2.35-.27-4.82-1.17-4.82-5.22 0-1.15.42-2.08 1.08-2.82-.1-.27-.47-1.37.1-2.85 0 0 .9-.29 2.96 1.08a10.4 10.4 0 0 1 5.39 0c2.06-1.37 2.95-1.08 2.95-1.08.58 1.48.22 2.58.11 2.85.67.74 1.08 1.67 1.08 2.82 0 4.06-2.48 4.95-4.83 5.21.38.33.72.98.72 1.98v2.93c0 .29.19.63.73.52A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Download,
  ArrowRight,
  Github: GithubMarkIcon,
  ChevronDown,
  Play,
  ExternalLink,
  Sparkles,
  Terminal,
  Code2,
  Check,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "pill";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  href?: string;
  external?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  href,
  external,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full whitespace-nowrap";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-transparent dark:border-slate-700 font-bold shadow-md active:scale-[0.98]",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 font-semibold active:scale-[0.98]",
    outline:
      "border border-slate-300 hover:border-[#0f172a] bg-white text-slate-800 hover:text-[#0f172a] hover:bg-[#0f172a]/[0.04] active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-600 hover:text-[#0f172a] hover:bg-[#0f172a]/[0.06]",
    glass:
      "bg-white/90 hover:bg-white text-slate-900 backdrop-blur-lg border border-slate-200 shadow-md active:scale-[0.98]",
    pill:
      "bg-[#0f172a] text-white hover:bg-[#1e293b] font-bold shadow-md active:scale-[0.98]",
  };

  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  const iconElement = IconComponent ? (
    <IconComponent
      className={cn(
        "shrink-0 inline-block align-middle",
        size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"
      )}
    />
  ) : null;

  const content = (
    <>
      {iconPosition === "left" && iconElement}
      <span className="inline-flex items-center gap-1.5 leading-none">{children}</span>
      {iconPosition === "right" && iconElement}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
