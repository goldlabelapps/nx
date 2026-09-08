"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FeaturedImage } from "@goldlabelapps/theme";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Download,
  Terminal,
  Settings,
  Code2,
  Zap,
  ShieldCheck,
  Home,
  ArrowLeft,
  ArrowRight,
  Search,
  Folder,
  X,
  ListFilter,
  Rocket,
  History,
  Cpu,
  Building2,
} from "lucide-react";
import { GuideMeta } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import { GodModeBar } from "@/components/auth/GodModeBar";
import { NestedFolderMenu } from "@/components/navigation/NestedFolderMenu";
import {
  buildNestedMenuTree,
  MenuItemNode,
  getAncestorFolderIds,
  getBreadcrumbItems,
} from "@/lib/nestedMenu";

interface GuideLayoutProps {
  guides: GuideMeta[];
  currentGuide: GuideMeta;
  children: React.ReactNode;
  menuMode?: "nested" | "legacy";
}

const iconMap: Record<string, React.ElementType> = {
  download: Download,
  Download: Download,
  settings: Settings,
  Settings: Settings,
  terminal: Terminal,
  Terminal: Terminal,
  code: Code2,
  Code2: Code2,
  flash: Zap,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  home: Home,
  BookOpen: BookOpen,
};

const categoryOrder = [
  "Getting Started",
  "Business & Strategy",
  "Engineering & Architecture",
  "Apps & Cartridges",
  "Concepts & Evolution",
];

const sectionIconMap: Record<string, React.ElementType> = {
  "getting-started": Rocket,
  business: Building2,
  engineering: Cpu,
  apps: Code2,
  concepts: History,
  flash: Zap,
  experience: History,
};

function getSectionIcon(node: MenuItemNode): React.ElementType {
  if (node.icon && iconMap[node.icon]) {
    return iconMap[node.icon];
  }
  const key = (node.path || node.name).toLowerCase();
  if (sectionIconMap[key]) {
    return sectionIconMap[key];
  }
  return node.isFolder ? Folder : BookOpen;
}

function countDocNodes(node: MenuItemNode): number {
  if (!node.isFolder) return 1;
  let count = node.guide ? 1 : 0;
  for (const child of node.children) {
    count += countDocNodes(child);
  }
  return count;
}

function getFirstGuideHref(node: MenuItemNode): string {
  if (node.cleanSlug) {
    return node.cleanSlug === "index" ? "/" : `/${node.cleanSlug}`;
  }
  for (const child of node.children) {
    const href = getFirstGuideHref(child);
    if (href) return href;
  }
  return "/";
}

export function GuideLayout({
  guides,
  currentGuide,
  children,
  menuMode = "nested",
}: GuideLayoutProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const guideImg = currentGuide.image || currentGuide.smartImage;
  const featuredImageProp = guideImg ? { src: guideImg } : undefined;

  const sortedGuides = useMemo(
    () => [...guides].sort((a, b) => a.order - b.order),
    [guides]
  );

  const currentIndex = sortedGuides.findIndex(
    (g) => g.cleanSlug === currentGuide.cleanSlug
  );

  const prevGuide = currentIndex > 0 ? sortedGuides[currentIndex - 1] : null;
  const nextGuide =
    currentIndex >= 0 && currentIndex < sortedGuides.length - 1
      ? sortedGuides[currentIndex + 1]
      : null;

  const groupedGuides = useMemo(() => {
    return sortedGuides.reduce<Record<string, GuideMeta[]>>((acc, guide) => {
      const cat = guide.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(guide);
      return acc;
    }, {});
  }, [sortedGuides]);

  const categories = useMemo(() => {
    return Object.keys(groupedGuides).sort((a, b) => {
      const idxA = categoryOrder.indexOf(a);
      const idxB = categoryOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [groupedGuides]);

  // Initial state for expanded accordions: current guide's category & Getting Started are open
  // Default all categories to collapsed when menu opens
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };


  // Filter guides based on search query
  const isSearching = searchQuery.trim().length > 0;
  const filteredGroupedGuides = useMemo(() => {
    if (!isSearching) return groupedGuides;
    const q = searchQuery.toLowerCase();
    const result: Record<string, GuideMeta[]> = {};

    categories.forEach((cat) => {
      const matching = groupedGuides[cat]?.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          (g.description && g.description.toLowerCase().includes(q)) ||
          g.tags?.some((t) => t.toLowerCase().includes(q))
      );
      if (matching && matching.length > 0) {
        result[cat] = matching;
      }
    });
    return result;
  }, [searchQuery, groupedGuides, categories, isSearching]);

  const filteredCategories = useMemo(() => {
    return Object.keys(filteredGroupedGuides).sort((a, b) => {
      const idxA = categoryOrder.indexOf(a);
      const idxB = categoryOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [filteredGroupedGuides]);

  // Build dynamic breadcrumb items defined by nested route and content item titles
  const breadcrumbItems = useMemo(
    () => getBreadcrumbItems(currentGuide.cleanSlug, guides),
    [currentGuide.cleanSlug, guides]
  );

  // Build full nested menu tree from guides
  const fullTree = useMemo(() => buildNestedMenuTree(guides), [guides]);

  // Root items/folders in nested menu tree represent the menu system sections
  const sections = fullTree;

  // Determine active section based on current guide's position in nested menu tree
  const activeSection = useMemo(() => {
    if (sections.length === 0) return null;
    const ancestorIds = getAncestorFolderIds(fullTree, currentGuide.cleanSlug);
    if (ancestorIds.length > 0) {
      const topAncestorId = ancestorIds[0];
      const found = sections.find((s) => s.id === topAncestorId);
      if (found) return found;
    }
    const directMatch = sections.find(
      (s) => s.cleanSlug === currentGuide.cleanSlug || s.id === `item:${currentGuide.cleanSlug}`
    );
    if (directMatch) return directMatch;
    return sections[0];
  }, [sections, fullTree, currentGuide.cleanSlug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCategoryPopoverOpen(false);
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Controls & Breadcrumbs Header */}
        <div className="flex flex-col gap-3 py-4 mb-4 border-b border-slate-200/80 px-1 sm:px-0">
          {/* Row 1: Breadcrumbs Navigation Track (Above the dropdowns) */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto no-scrollbar whitespace-nowrap py-1.5 px-3 rounded-xl bg-white/60 border border-slate-200/60 shadow-xs"
          >
            <Link href="/" className="hover:text-[#0f172a] transition-colors flex items-center gap-1 font-medium shrink-0">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            {breadcrumbItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {item.isLast ? (
                  <span className="font-semibold text-slate-900 truncate shrink-0">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#0f172a] transition-colors text-slate-600 font-medium shrink-0"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Row 2: Menu Dropdown (First), Section Dropdown (Second) & God Mode VS Code Edit Button */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Menu Dropdown Toggle Button (First) */}
              <button
                type="button"
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:border-[#0f172a] hover:text-[#0f172a] shadow-sm transition-all cursor-pointer"
                aria-expanded={isMobileNavOpen}
                aria-label="Toggle navigation menu"
              >
                <BookOpen className="h-3.5 w-3.5 text-[#0f172a]" />
                <span>Menu</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200 text-slate-500",
                    isMobileNavOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Section Jump Popover Dropdown Button (Second) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryPopoverOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:border-[#85580C] hover:text-[#85580C] shadow-sm transition-all cursor-pointer"
                  aria-expanded={isCategoryPopoverOpen}
                >
                  <ListFilter className="h-3.5 w-3.5 text-[#85580C]" />
                  <span>
                    Section: {activeSection ? activeSection.name : "Sections"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200 text-slate-500",
                      isCategoryPopoverOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Nested Menu System Sections Popover Drawer */}
                {isCategoryPopoverOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
                      onClick={() => setIsCategoryPopoverOpen(false)}
                      aria-hidden="true"
                    />
                    <div
                      role="dialog"
                      aria-modal="true"
                      aria-label="Section selector"
                      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-32px)] max-w-md rounded-2xl bg-white border border-slate-200 p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          <Folder className="h-4 w-4 text-[#85580C]" />
                          <span>Sections</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsCategoryPopoverOpen(false)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Dynamic Sections from Nested Menu System */}
                      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                        {sections.map((section) => {
                          const SectionIcon = getSectionIcon(section);
                          const isActive = activeSection ? section.id === activeSection.id : false;
                          const totalDocs = countDocNodes(section);
                          const targetHref = getFirstGuideHref(section);
                          const description =
                            section.guide?.description ||
                            (section.isFolder
                              ? `${section.children.length} items in ${section.name}`
                              : "Documentation section");

                          return (
                            <Link
                              key={section.id}
                              href={targetHref}
                              onClick={() => {
                                setIsCategoryPopoverOpen(false);
                              }}
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-xl transition-all border group",
                                isActive
                                  ? "bg-[#85580C]/10 border-[#85580C]/30 text-[#85580C]"
                                  : "bg-slate-50/70 border-slate-100 hover:bg-slate-100 hover:border-slate-200 text-slate-900"
                              )}
                            >
                              <div
                                className={cn(
                                  "p-2 rounded-lg mt-0.5 shrink-0 transition-colors",
                                  isActive
                                    ? "bg-[#85580C] text-white"
                                    : "bg-slate-200 text-slate-600 group-hover:bg-[#85580C] group-hover:text-white"
                                )}
                              >
                                <SectionIcon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold truncate">{section.name}</span>
                                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                                    {totalDocs} {totalDocs === 1 ? "doc" : "docs"}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                  {description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* God Mode VS Code Edit Button */}
            <GodModeBar filePath={currentGuide.filePath} className="mb-0 shrink-0" />
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Compact Accordion + Realtime Filter */}
          <aside
            className={cn(
              "lg:col-span-3 lg:sticky lg:top-24 space-y-4 pr-1",
              isMobileNavOpen ? "block" : "hidden lg:block"
            )}
          >
            <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-sm space-y-3">
              {/* Sidebar Header (Desktop) */}
              <div className="hidden lg:flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#0f172a]" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Menu
                  </h3>
                </div>
              </div>

              {/* Sidebar Container */}
              <div className="space-y-4">
                {menuMode === "nested" ? (
                  <NestedFolderMenu
                    guides={guides}
                    currentCleanSlug={currentGuide.cleanSlug}
                    onNavigate={() => setIsMobileNavOpen(false)}
                  />
                ) : (
                  <>
                    {/* Search Filter Input (Legacy) */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Filter ${guides.length} docs...`}
                        className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#85580C] focus:bg-white transition-all"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Sections Count Indicator */}
                    {!isSearching && (
                      <div className="text-[11px] text-slate-500 px-1 pt-1">
                        <span className="font-semibold text-slate-400">
                          {categories.length} Sections ({guides.length} documents)
                        </span>
                      </div>
                    )}

                    {/* Accordion Categorized Navigation List */}
                    <div className="space-y-2 pt-1">
                      {filteredCategories.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-500">
                          No docs match &quot;{searchQuery}&quot;
                        </div>
                      ) : (
                        filteredCategories.map((cat) => {
                          const catGuides = filteredGroupedGuides[cat] || [];
                          const isExpanded = isSearching || Boolean(expandedCategories[cat]);

                          return (
                            <div
                              key={cat}
                              className="rounded-2xl border border-slate-100 bg-slate-50/50 overflow-hidden transition-all"
                            >
                              {/* Accordion Header */}
                              <button
                                type="button"
                                onClick={() => toggleCategory(cat)}
                                className="w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-100/80 transition-colors cursor-pointer"
                              >
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 truncate pr-2">
                                  {cat}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white border border-slate-200 text-slate-600">
                                    {catGuides.length}
                                  </span>
                                  <ChevronRight
                                    className={cn(
                                      "h-3.5 w-3.5 transition-transform duration-200",
                                      isExpanded && "rotate-90 text-[#85580C]"
                                    )}
                                  />
                                </div>
                              </button>

                              {/* Accordion Content Links */}
                              {isExpanded && (
                                <nav className="p-1.5 space-y-0.5 bg-white border-t border-slate-100">
                                  {catGuides.map((guide) => {
                                    const IconComp =
                                      guide.icon && iconMap[guide.icon]
                                        ? iconMap[guide.icon]
                                        : BookOpen;
                                    const guideHref =
                                      guide.cleanSlug === "index" ? "/" : `/${guide.cleanSlug}`;
                                    const isActive =
                                      pathname === guideHref ||
                                      pathname === `/docs/${guide.cleanSlug}`;

                                    return (
                                      <Link
                                        key={guide.cleanSlug}
                                        href={guideHref}
                                        onClick={() => setIsMobileNavOpen(false)}
                                        className={cn(
                                          "flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors",
                                          isActive
                                            ? "bg-[#0f172a] text-white font-bold shadow-sm"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                                        )}
                                      >
                                        <IconComp
                                          className={cn(
                                            "h-3.5 w-3.5 shrink-0",
                                            isActive ? "text-white" : "text-slate-400"
                                          )}
                                        />
                                        <span className="truncate">{guide.title}</span>
                                      </Link>
                                    );
                                  })}
                                </nav>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <FeaturedImage
              image={featuredImageProp}
              slug={currentGuide.cleanSlug || "nx"}
              alt={currentGuide.title}
              height={280}
              flushTop
            />
            <div className="p-6 sm:p-10">
              {/* Guide Meta Header */}
              <header className="pb-6 mb-8 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {currentGuide.title}
                  </h1>
                  {currentGuide.description && (
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {currentGuide.description}
                    </p>
                  )}
                </div>
                <GodModeBar filePath={currentGuide.filePath} className="mb-0 shrink-0" />
              </header>

            {/* Rendered Markdown Body */}
            <div>{children}</div>

            {/* Tag Chips */}
            {currentGuide.tags && currentGuide.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-200/80">
                {currentGuide.tags.map((tag) => {
                  const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  return (
                    <Link
                      key={tag}
                      href={`/tag/${tagSlug}`}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:!text-white border border-slate-200 dark:border-slate-600 transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span className="dark:!text-white">{tag}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevGuide ? (
                <Link
                  href={prevGuide.cleanSlug === "index" ? "/" : `/${prevGuide.cleanSlug}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:border-[#85580C]/40 hover:bg-[#85580C]/[0.02] transition-all group w-full sm:w-auto max-w-sm"
                >
                  <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-[#85580C] group-hover:-translate-x-0.5 transition-transform shrink-0" />
                  <div className="text-left min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Previous</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#85580C] truncate block">
                      {prevGuide.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextGuide ? (
                <Link
                  href={nextGuide.cleanSlug === "index" ? "/" : `/${nextGuide.cleanSlug}`}
                  className="flex items-center justify-end gap-3 p-3.5 rounded-2xl border border-slate-200 hover:border-[#85580C]/40 hover:bg-[#85580C]/[0.02] transition-all group w-full sm:w-auto max-w-sm"
                >
                  <div className="text-right min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Next</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#85580C] truncate block">
                      {nextGuide.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#85580C] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </div>
            <GodModeBar filePath={currentGuide.filePath} className="mt-8" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
