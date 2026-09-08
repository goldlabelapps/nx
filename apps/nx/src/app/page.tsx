import { Suspense } from "react";
import { HeroSearchBar } from "@/components/search/HeroSearchBar";
import { FreshVisitorBanner } from "@/components/ui/FreshVisitorBanner";
import { getAllGuides } from "@/lib/markdown";

export default function HomePage() {
  const allGuides = (() => {
    try {
      return getAllGuides();
    } catch {
      return [];
    }
  })();

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-950">
      <Suspense fallback={null}>
        <FreshVisitorBanner />
      </Suspense>

      {/* 1. Instant Search & Hero Header */}
      <HeroSearchBar guides={allGuides} />
    </div>
  );
}

