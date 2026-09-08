import Link from "next/link";
import { FeaturedImage } from "@goldlabelapps/theme";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Lock, Sparkles, ArrowRight } from "lucide-react";

export default function PrivatePage() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute -top-12 left-1/2 h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-[#0f172a]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[260px] w-[380px] rounded-full bg-slate-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <FeaturedImage slug="nx" height={280} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0f172a]/15 bg-white px-3.5 py-1 text-xs font-bold text-[#0f172a]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Private Workspace</span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Authenticated App Area
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            You are inside a protected route powered by the shared SaaS guard. Build private user
            dashboards, account workflows, and internal tools here.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href="/"
              variant="primary"
              size="md"
              icon="ArrowRight"
              iconPosition="right"
              className="font-bold shadow-md shadow-[#0f172a]/20 dark:shadow-[#f8fafc]/20"
            >
              Explore Guides
            </Button>

            <Button
              href="/#github"
              variant="outline"
              size="md"
              className="font-semibold border-slate-300 text-slate-700 hover:border-[#0f172a] hover:text-[#0f172a]"
            >
              View Open Source Section
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-7">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#0f172a]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Session Status
                </span>
              </div>
              <span className="rounded-full bg-white border border-emerald-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                Active
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Guard</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">AuthGuard + Middleware</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Access</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Requires valid session cookie</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Next Step</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Start composing your private UI</p>
              </div>
            </div>

            <Link
              href="/private"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0f172a] hover:text-[#1e293b]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Protected route confirmed</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
