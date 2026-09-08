"use client";

import React from "react";
import { Mail, MapPin, Building2, Send } from "lucide-react";
import { CleverText } from "@goldlabelapps/flash";
import { profileData } from "@/data/profileData";
import { Button } from "@/components/ui/Button";

export function QuickContactSection() {
  const founderEmail = profileData.founder?.email || "goldlabel.apps@gmail.com";
  const founderLinkedin = profileData.founder?.linkedin || "https://www.linkedin.com/in/chris-dorward/";

  // WhatsApp state
  const [waMessage, setWaMessage] = React.useState("Hi Chris, I saw your site on goldlabel.pro!");

  // Email form state
  const [senderEmail, setSenderEmail] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleOpenWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalWaUrl = `https://wa.me/447745763122?text=${encodeURIComponent(waMessage || "Hi Chris!")}`;
    window.open(finalWaUrl, "_blank", "noopener,noreferrer");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !emailMessage) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/notify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: founderEmail,
          subject: `[Contact Form] Message from ${senderEmail}`,
          text: emailMessage,
          html: `<p><strong>From:</strong> ${senderEmail}</p><p><strong>Message:</strong></p><p>${emailMessage.replace(/\n/g, "<br>")}</p>`,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
        {/* Header Title Section */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#C09F52]/10 border border-[#85580C]/30 dark:border-[#C09F52]/30 text-xs font-bold text-[#85580C] dark:text-[#F1D57A]">
            <Send className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:!text-white">
            <CleverText text="Get in Touch" speed={40} style={{ fontFamily: "inherit" }} />
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Looking for a Senior Fullstack / Agentic AI Developer for your project, platform, or contract? Connect directly via WhatsApp, LinkedIn, or email.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Simple Contact Form */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-700/80 px-2 py-0.5 rounded-full">
                  Quick Email
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:!text-white text-base">
                  Send an Email
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Send an instant email directly to my inbox.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs text-center font-medium">
                Email sent successfully! Thank you.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="mt-4 space-y-2.5">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Your email message"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                {error && (
                  <p className="text-[11px] text-red-500">{error}</p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={loading}
                  className="w-full rounded-xl"
                >
                  <span>{loading ? "Sending..." : "Send Email"}</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            )}
          </div>

          {/* WhatsApp Direct */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.146 4.187 4.189-1.101zm10.741-6.172c-.22-.11-1.298-.641-1.501-.715-.202-.074-.349-.11-.497.11-.147.22-.572.715-.701.862-.129.147-.258.165-.478.055-.22-.11-.929-.342-1.77-1.092-.654-.583-1.096-1.303-1.225-1.523-.129-.22-.014-.339.096-.448.099-.098.22-.258.33-.387.11-.129.146-.22.22-.367.074-.147.037-.275-.018-.386-.055-.11-.497-1.2-.681-1.642-.179-.431-.361-.372-.497-.379-.129-.007-.277-.008-.426-.008-.148 0-.39.055-.594.276-.204.22-.777.759-.777 1.85 0 1.092.795 2.146.906 2.293.11.147 1.564 2.388 3.79 3.35 1.856.8 2.234.64 2.637.6.404-.04 1.298-.531 1.482-1.044.184-.513.184-.953.129-1.044-.055-.091-.202-.147-.422-.257z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                  Instant Response
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:!text-white text-base">
                  WhatsApp
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Type your message below and start a chat on WhatsApp (+44 7745 763 122).
                </p>
              </div>
            </div>

            <form onSubmit={handleOpenWhatsapp} className="mt-4 space-y-2.5">
              <div>
                <textarea
                  rows={3}
                  placeholder="Type your WhatsApp message..."
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open Chat (Send)</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* LinkedIn Direct */}
          <a
            href={founderLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 hover:border-sky-500/80 dark:hover:border-sky-500 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50 px-2 py-0.5 rounded-full">
                  Professional Network
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:!text-white text-base group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                  LinkedIn Profile & Messaging
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Connect on LinkedIn or send a direct message via your LinkedIn account.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-sky-200/60 dark:border-sky-900/60 flex items-center justify-between text-xs font-bold text-sky-700 dark:text-sky-400">
              <span>Open LinkedIn Profile</span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        {/* Company Location Banner */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="font-semibold text-slate-800 dark:!text-white">Goldlabel Apps Ltd</span>
            <span>•</span>
            <span>UK Co. 5460545</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>London / Essex, United Kingdom</span>
          </div>
        </div>
      </div>
    </section>
  );
}

