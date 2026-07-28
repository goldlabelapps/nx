/* Leida - Client Aftercare "living page"
   The page a client receives after a treatment. It carries the therapist's
   clinic branding; Leida sits quietly in the footer. Composes DS primitives.
   Exposes window.LivingPage. */
(function () {
  function build() {
  const DS = window.LeidaDesignSystem_ab1d28;
  const { SegmentedToggle, ProductCard, Accordion, StarMark, Card } = DS;

  const PRODUCTS = {
    am: [
      { step: "Step 01 · Cleanse", name: "Gentle Milk Cleanser", brand: "Your Clinic Range", price: "£24", hue: "#efe7dc" },
      { step: "Step 02 · Serum", name: "Vitamin C15", brand: "Medik8", price: "£38", hue: "#f0e3cf", tag: "New" },
      { step: "Step 03 · Protect", name: "Advanced Day SPF50", brand: "Heliocare", price: "£30", hue: "#e8ece2" },
    ],
    pm: [
      { step: "Step 01 · Cleanse", name: "Balancing Gel Wash", brand: "Your Clinic Range", price: "£22", hue: "#e9e5df" },
      { step: "Step 02 · Active", name: "Retinal 0.2", brand: "Medik8", price: "£45", hue: "#efe0da" },
      { step: "Step 03 · Recover", name: "Ceramide Night Balm", brand: "Your Clinic Range", price: "£34", hue: "#eae7de" },
    ],
  };

  const swatch = (hue, label) => (
    React.createElement("div", {
      style: {
        width: "100%", height: "100%", background: hue,
        display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: 12,
      },
    }, React.createElement("span", {
      style: { fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8a7f6d" },
    }, label))
  );

  function Section({ children, style }) {
    return React.createElement("section", { style: { padding: "10px 22px 22px", ...style } }, children);
  }

  function LivingPage() {
    const [tab, setTab] = React.useState("am");
    const products = PRODUCTS[tab];
    return React.createElement("div", {
      style: {
        background: "linear-gradient(180deg,#f7f7f4 0%,#f2efe8 100%)",
        minHeight: "100%", paddingBottom: 40, position: "relative",
      },
    },
      // clinic bar
      React.createElement("div", {
        style: {
          position: "sticky", top: 0, zIndex: 5, height: 56,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(247,247,244,0.82)", backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid var(--leida-line)",
        },
      }, React.createElement("span", {
        style: { fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--leida-ink)" },
      }, "The Skin Studio")),

      // intro
      React.createElement("div", { style: { textAlign: "center", padding: "40px 24px 10px" } },
        React.createElement("span", { style: { display: "block", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.4rem", color: "var(--leida-body)", marginBottom: 6 } }, "Ellie, here's your"),
        React.createElement("span", { style: { display: "block", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "3rem", lineHeight: 0.95, letterSpacing: "-0.02em", color: "var(--leida-ink)" } }, "Updated Routine"),
        React.createElement("p", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.02rem", color: "var(--leida-sign)", maxWidth: "30ch", margin: "16px auto 0", lineHeight: 1.5 } }, "A few gentle changes after today's peel. Take it slowly, your skin will thank you."),
        React.createElement("div", { style: { marginTop: 14, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--leida-clay)" } }, ", Nadia"),
      ),

      // products
      Section({ style: { paddingTop: 26 }, children: [
        React.createElement("div", { key: "h", style: { textAlign: "center", marginBottom: 18 } },
          React.createElement("div", { className: "eyebrow", style: { marginBottom: 6 } }, "Your products"),
          React.createElement("h2", { style: { fontSize: "1.9rem", margin: "0 0 16px" } }, "Morning & evening"),
          React.createElement("div", { style: { display: "flex", justifyContent: "center" } },
            React.createElement(SegmentedToggle, {
              options: [
                { value: "am", label: "Morning", icon: React.createElement(StarMark, { size: 12, tone: tab === "am" ? "offwhite" : "clay" }) },
                { value: "pm", label: "Evening" },
              ],
              value: tab, onChange: setTab,
            }),
          ),
        ),
        React.createElement("div", { key: "list", style: { display: "flex", flexDirection: "column", gap: 16, marginTop: 20 } },
          products.map((p, i) =>
            React.createElement(ProductCard, {
              key: tab + i, step: p.step, name: p.name, brand: p.brand, price: p.price, tag: p.tag,
              image: swatch(p.hue, p.brand),
            }),
          ),
        ),
      ]}),

      // aftercare accordion
      Section({ children: React.createElement(Card, { variant: "paper", padding: "lg", style: { marginTop: 8 } },
        React.createElement("div", { className: "eyebrow", style: { textAlign: "center", marginBottom: 6 } }, "Aftercare"),
        React.createElement("h2", { style: { fontSize: "1.7rem", textAlign: "center", margin: "0 0 18px" } }, "The next 48 hours"),
        React.createElement(Accordion, {
          summaryStyle: "mono",
          items: [
            { q: "Keep it simple", a: "Cleanse, hydrate and protect only. Skip actives and exfoliants until Thursday." },
            { q: "Sun protection", a: "Reapply SPF50 every two hours if you're outdoors. Your skin is more sensitive right now." },
            { q: "If it feels tight", a: "That's normal for a day or two. A thin layer of the night balm morning and evening will help." },
          ],
        }),
      )}),

      // close
      React.createElement("div", { style: { textAlign: "center", padding: "20px 24px 8px" } },
        React.createElement("h2", { style: { fontSize: "2rem", margin: 0 } }, "That's everything for now."),
        React.createElement("p", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--leida-body)", marginTop: 14 } }, "Book your review for 3 weeks' time."),
      ),

      // footer
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "20px 0 8px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--leida-muted)" } },
        "Powered by",
        React.createElement(StarMark, { size: 12, tone: "clay" }),
        React.createElement("span", { style: { fontFamily: "var(--font-serif)", fontStyle: "italic", textTransform: "none", letterSpacing: 0, fontSize: "0.9rem", color: "var(--leida-ink)" } }, "Leida"),
      ),
    );
  }

  window.LivingPage = LivingPage;
  }
  // Define the global only once React + the DS bundle are ready, so
  // <x-import> waits for us and never renders against an undefined DS.
  (function wait(){
    if (window.React && window.React.useState && window.LeidaDesignSystem_ab1d28) build();
    else setTimeout(wait, 30);
  })();
})();
