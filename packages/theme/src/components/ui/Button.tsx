"use client";

import React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";
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

const iconMap: Record<string, React.ElementType> = {
  Download,
  ArrowRight,
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
      "bg-[#012867] hover:bg-[#011f52] text-white font-bold shadow-md shadow-[#012867]/20 active:scale-[0.98]",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 font-semibold active:scale-[0.98]",
    outline:
      "border border-slate-300 hover:border-[#012867] bg-white text-slate-800 hover:text-[#012867] hover:bg-[#012867]/[0.04] active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-600 hover:text-[#012867] hover:bg-[#012867]/[0.06]",
    glass:
      "bg-white/90 hover:bg-white text-slate-900 backdrop-blur-lg border border-slate-200 shadow-md active:scale-[0.98]",
    pill:
      "bg-[#012867] text-white hover:bg-[#011f52] font-bold shadow-md active:scale-[0.98]",
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

