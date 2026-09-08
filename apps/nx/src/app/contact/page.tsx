import { QuickContactSection } from "@/components/contact/QuickContactSection";

export const metadata = {
  title: "Contact Chris Dorward — Goldlabel",
  description: "Get in touch via email, WhatsApp, GitHub, or LinkedIn for freelance, project, or fullstack development work.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 sm:pt-20 pb-12 px-4">
      <QuickContactSection />
    </div>
  );
}

