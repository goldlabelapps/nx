/* Leida - Marketing website
   The public site: hero, how-it-works, cost calculator, pricing, FAQ,
   waitlist, footer. Composes DS primitives. Exposes window.MarketingSite. */
(function () {
  function build() {
  const DS = window.LeidaDesignSystem_ab1d28;
  const { TopBar, Button, PriceTier, Accordion, StatCard, RangeSlider, StarMark, Logo, Card, Eyebrow, Input } = DS;
  const h = React.createElement;

  function Section({ id, children, style }) {
    return h("section", { id, style: { padding: "84px 24px", maxWidth: 1080, margin: "0 auto", ...style } }, children);
  }

  // A small stylised phone showing the living page hero
  function HeroPhone() {
    return h("div", { style: { width: 250, borderRadius: 38, padding: 11, background: "linear-gradient(160deg,#2a2620,#15130f)", boxShadow: "var(--shadow-float)", margin: "0 auto" } },
      h("div", { style: { borderRadius: 28, overflow: "hidden", background: "var(--leida-paper)", height: 420, display: "flex", flexDirection: "column" } },
        h("div", { style: { height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--leida-line)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--leida-ink)" } }, "The Skin Studio"),
        h("div", { style: { padding: "28px 20px", textAlign: "center" } },
          h("div", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--leida-body)" } }, "Ellie, here's your"),
          h("div", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.9rem", lineHeight: 0.95, color: "var(--leida-ink)", marginTop: 4 } }, "Updated Routine"),
        ),
        h("div", { style: { padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 } },
          [["Cleanse", "#efe7dc"], ["Serum", "#f0e3cf"], ["Protect", "#e8ece2"]].map(([label, hue], i) =>
            h("div", { key: i, style: { display: "flex", gap: 10, alignItems: "center", background: "var(--leida-tile)", borderRadius: 16, padding: 8, boxShadow: "var(--shadow-card)" } },
              h("div", { style: { width: 44, height: 44, borderRadius: 12, background: hue, flex: "0 0 auto" } }),
              h("div", null,
                h("div", { style: { fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--leida-clay)" } }, "Step 0" + (i + 1)),
                h("div", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--leida-ink)" } }, label),
              ),
            ),
          ),
        ),
      ),
    );
  }

  function CostCalculator() {
    const [clients, setClients] = React.useState(25);
    const minutes = 8; // minutes saved per client not re-typing aftercare
    const hours = ((clients * minutes * 4) / 60).toFixed(1); // per month
    return h(Card, { variant: "glass", padding: "lg", style: { maxWidth: 760, margin: "0 auto" } },
      h(RangeSlider, { label: "Clients you see each week", min: 5, max: 80, value: clients, onChange: setClients }),
      h("div", { style: { display: "flex", gap: 14, marginTop: 26 } },
        h(Stat, { n: hours + " hrs", k: "Saved every month" }),
        h(Stat, { n: "£0", k: "Printing & re-sends" }),
        h(Stat, { n: "1 tap", k: "To update a routine" }),
      ),
      h("div", { style: { marginTop: 24, background: "var(--leida-ink)", color: "var(--leida-parchment)", borderRadius: 16, padding: "18px 22px", textAlign: "center", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.3rem" } },
        "That's ", h("b", { style: { fontWeight: 700 } }, hours, " hours"), " back for actual skin therapy.",
      ),
    );
  }

  function Stat({ n, k }) {
    return h("div", { style: { flex: 1, textAlign: "center", padding: "14px 8px", borderRadius: 14, background: "rgba(255,255,255,0.55)" } },
      h("div", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.5rem", color: "var(--leida-ink)", lineHeight: 1 } }, n),
      h("div", { style: { fontFamily: "var(--font-mono)", fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--leida-muted)", marginTop: 7 } }, k),
    );
  }

  function Step({ n, title, body }) {
    return h("div", { style: { flex: 1 } },
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, border: "1px solid var(--leida-clay)", borderRadius: "50%", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--leida-ink)", marginBottom: 16 } }, n),
      h("h3", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "1.28rem", margin: "0 0 9px", color: "var(--leida-ink)" } }, title),
      h("p", { style: { fontSize: "0.92rem", lineHeight: 1.55, color: "var(--leida-body)", margin: 0 } }, body),
    );
  }

  function MarketingSite() {
    return h("div", { style: { background: "var(--leida-parchment)" } },
      h("div", { style: { position: "sticky", top: 0, zIndex: 50 } },
        h(TopBar, {
          links: [
            { label: "How it works", href: "#how" },
            { label: "The cost", href: "#calc" },
            { label: "Pricing", href: "#join" },
          ],
          cta: "Become a member",
        }),
      ),

      // HERO
      h(Section, { style: { paddingTop: 56, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" } },
        h("div", null,
          h(Logo, { height: 40, style: { marginBottom: 26 } }),
          h("h1", { style: { fontStyle: "normal", fontFamily: "var(--font-serif)", fontSize: "clamp(2.3rem,4vw,3.4rem)", lineHeight: 1.06, letterSpacing: "-0.022em", color: "var(--leida-ink)", margin: "0 0 20px" } },
            "The app that gives your clients aftercare ",
            h("em", null, "they'll actually follow."),
          ),
          h("p", { style: { fontSize: "1.06rem", lineHeight: 1.6, color: "var(--leida-body)", maxWidth: "44ch", margin: "0 0 28px" } },
            "Quicker than a WhatsApp, more beautiful than a Canva PDF, and never out of date. One living page per client that updates itself and saves to their phone like an app."),
          h("div", { style: { display: "flex", gap: 14, flexWrap: "wrap" } },
            h(Button, { icon: h(StarMark, { size: 13, tone: "offwhite" }) }, "Become a member"),
            h(Button, { variant: "ghost" }, "See how it works"),
          ),
          h("div", { style: { marginTop: 24, fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--leida-muted)" } }, "Built by a skin therapist, for skin therapists"),
        ),
        h(HeroPhone),
      ),

      // HOW IT WORKS
      h(Section, { id: "how", style: { paddingTop: 40 },
        children: [
          h("div", { key: "eh", style: { textAlign: "center", marginBottom: 40 } },
            h(Eyebrow, null, "How it works"),
            h("h2", { style: { fontSize: "2.4rem", marginTop: 10 } }, "Three taps, not three emails."),
          ),
          h("div", { key: "steps", style: { display: "flex", gap: 34 } },
            h(Step, { n: 1, title: "Build the routine", body: "Pick products and steps from your shelf, or reuse a template you already made." }),
            h(Step, { n: 2, title: "Send one link", body: "The client taps once and saves the page to their home screen. No app store, no login." }),
            h(Step, { n: 3, title: "Save Changes", body: "Change a step after the next appointment and their page updates itself. Always current." }),
          ),
        ],
      }),

      // COST
      h(Section, { id: "calc", style: { background: "transparent" },
        children: [
          h("div", { key: "e", style: { textAlign: "center", marginBottom: 34 } },
            h(Eyebrow, null, "The cost of not"),
            h("h2", { style: { fontSize: "2.4rem", marginTop: 10 } }, "What re-typing aftercare really costs."),
          ),
          h(CostCalculator, { key: "c" }),
        ],
      }),

      // SOCIAL PROOF
      h(Section, { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 },
        children: [
          h(StatCard, { key: "s1", figure: "3×", source: "Leida pilot, 2025" }, "clients follow their routine when it lives on their phone."),
          h(StatCard, { key: "s2", figure: "9 min", source: "Average per client" }, "saved on every appointment, no PDFs, no re-typing, no reprints."),
        ],
      }),

      // PRICING
      h(Section, { id: "join",
        children: [
          h("div", { key: "e", style: { textAlign: "center", marginBottom: 40 } },
            h(Eyebrow, null, "Membership"),
            h("h2", { style: { fontSize: "2.4rem", marginTop: 10 } }, "One price. Every client."),
          ),
          h("div", { key: "tiers", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, maxWidth: 720, margin: "0 auto" } },
            h(PriceTier, { key: "t1", name: "Solo", price: "£19", cadence: "/mo",
              description: "Everything one therapist needs to send living aftercare.",
              features: ["Unlimited living pages", "Your clinic branding", "Automatic client reminders", "Product & routine library"],
              cta: "Start free trial" }),
            h(PriceTier, { key: "t2", name: "Studio", price: "£39", cadence: "/mo", featured: true, badge: "Most popular",
              description: "For small teams sharing one shelf and one brand.",
              features: ["Everything in Solo", "Up to 4 therapists", "Shared product library", "Priority support"],
              cta: "Become a member" }),
          ),
        ],
      }),

      // FAQ
      h(Section, { style: { maxWidth: 720 },
        children: [
          h("div", { key: "e", style: { textAlign: "center", marginBottom: 24 } },
            h(Eyebrow, null, "Questions"),
            h("h2", { style: { fontSize: "2.2rem", marginTop: 10 } }, "The honest answers."),
          ),
          h(Accordion, { key: "a", items: [
            { q: "Do my clients need to download an app?", a: "No. The page saves to their home screen and opens like an app, no store, no login, no friction." },
            { q: "Can I use my own branding?", a: "Yes. Every page carries your clinic's name and colours. Leida sits quietly in the footer." },
            { q: "Is it really faster than WhatsApp?", a: "One tap sends a living page that stays up to date, so you never re-type or re-send a routine again." },
            { q: "What if I change a product?", a: "Update the step once and every client on that routine sees the change instantly." },
          ] }),
        ],
      }),

      // WAITLIST
      h(Section, { style: { textAlign: "center", maxWidth: 560 },
        children: [
          h(StarMark, { key: "s", size: 26, tone: "clay", style: { margin: "0 auto 16px" } }),
          h("h2", { key: "h", style: { fontSize: "clamp(1.7rem,3vw,2.2rem)" } }, "Join the founding members."),
          h("p", { key: "p", style: { fontSize: "0.95rem", color: "var(--leida-body)", maxWidth: "42ch", margin: "14px auto 24px" } }, "We're onboarding solo therapists in small groups. Leave your email and we'll be in touch."),
          h("div", { key: "f", style: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" } },
            h(Input, { type: "email", placeholder: "you@clinic.com", wrapStyle: { flex: "1 1 240px", maxWidth: 300 } }),
            h(Button, null, "Request access"),
          ),
        ],
      }),

      // FOOTER
      h("footer", { style: { background: "var(--leida-ink)", color: "var(--leida-oat)", padding: "54px 24px 40px", marginTop: 20 } },
        h("div", { style: { maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 } },
          h(Logo, { height: 26, tone: "offwhite" }),
          h("div", { style: { display: "flex", gap: 22, fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase" } },
            h("span", null, "How it works"), h("span", null, "Pricing"), h("span", null, "Contact"),
          ),
          h("span", { style: { width: "100%", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.04em", color: "var(--leida-fog)", marginTop: 10 } }, "© 2026 Ask Leida Ltd., Built by a skin therapist, for skin therapists."),
        ),
      ),
    );
  }

  window.MarketingSite = MarketingSite;
  }
  // Define the global only once React + the DS bundle are ready, so
  // <x-import> waits for us and never renders against an undefined DS.
  (function wait(){
    if (window.React && window.React.useState && window.LeidaDesignSystem_ab1d28) build();
    else setTimeout(wait, 30);
  })();
})();
