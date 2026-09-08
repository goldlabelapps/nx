import type { Metadata } from "next";
import { ErasTimeline } from "@/components/timeline/ErasTimeline";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: `Experience & Career History | ${siteConfig.brand.name}`,
  description: "20+ years of fullstack engineering experience, roles, technologies, and career evolution across web eras.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 sm:pt-20 pb-12 px-4">
      <ErasTimeline />
    </main>
  );
}
