"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Layers,
  Terminal,
  Code2,
  Cpu,
  Globe,
  Layout,
  Sparkles,
  Building2,
  BookOpen,
  Newspaper,
  History,
  LifeBuoy,
  ShieldCheck,
  Zap,
  Play,
  Video,
  ExternalLink,
  Download,
  Settings,
} from "lucide-react";
import type { NavItem, DropdownItem } from "../../types";
import { cn } from "../../lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Terminal,
  Code2,
  Cpu,
  Globe,
  Layout,
  Sparkles,
  Building2,
  BookOpen,
  Newspaper,
  History,
  LifeBuoy,
  ShieldCheck,
  Zap,
  Play,
  Video,
  Download,
  Settings,
};

export interface DropdownMenuProps {
  item: NavItem;
}

export function DropdownMenu({ item }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const dropdownItems = (item.dropdown || []) as DropdownItem[];
  const rawPathname = usePathname();
  const pathname = rawPathname || "";
  const isSectionActive =
    Boolean(item.href && item.href !== "#" && pathname && pathname.startsWith(item.href)) ||
    dropdownItems.some((d) => Boolean(d.href && pathname && pathname === d.href));

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full cursor-pointer",
          isOpen
            ? "text-slate-900 bg-slate-100"
            : isSectionActive
            ? "text-[#012867] bg-[#012867]/[0.06] font-semibold"
            : "text-slate-600 hover:text-[#012867] hover:bg-slate-100/80"
        )}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200 opacity-70",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-72 md:w-80">
          <div className="rounded-2xl bg-white border border-slate-200 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-1">
              {dropdownItems.map((dropdownItem, idx) => {
                const IconComponent = dropdownItem.icon
                  ? iconMap[dropdownItem.icon]
                  : null;
                const isActive = pathname === dropdownItem.href;

                const content = (
                  <div
                    className={cn(
                      "flex items-start gap-3 rounded-xl p-2.5 transition-colors group",
                      isActive
                        ? "bg-[#012867]/[0.08] text-[#012867]"
                        : "hover:bg-[#012867]/[0.05]"
                    )}
                  >
                    {IconComponent && (
                      <div
                        className={cn(
                          "mt-0.5 rounded-lg p-1.5 transition-colors",
                          isActive
                            ? "bg-[#012867] text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-[#012867]/10 group-hover:text-[#012867]"
                        )}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "text-xs font-bold transition-colors",
                            isActive
                              ? "text-[#012867]"
                              : "text-slate-900 group-hover:text-[#012867]"
                          )}
                        >
                          {dropdownItem.title}
                        </span>
                        {dropdownItem.badge && (
                          <span className="rounded-full bg-[#012867]/[0.06] px-1.5 py-0.2 text-[10px] font-bold text-[#012867] border border-[#012867]/15">
                            {dropdownItem.badge}
                          </span>
                        )}
                        {dropdownItem.external && (
                          <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-[#012867]" />
                        )}
                      </div>
                      {dropdownItem.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 font-normal">
                          {dropdownItem.description}
                        </p>
                      )}
                    </div>
                  </div>
                );

                if (dropdownItem.external) {
                  return (
                    <a
                      key={idx}
                      href={dropdownItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      onClick={() => setIsOpen(false)}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={idx}
                    href={dropdownItem.href}
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
