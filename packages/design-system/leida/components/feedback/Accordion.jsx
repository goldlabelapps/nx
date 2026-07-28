import React from "react";

/**
 * A hairline-divided disclosure list (FAQ / details). Each item has a
 * serif-italic or mono-caps summary and a rotating clay chevron.
 */
export function Accordion({ items, allowMultiple = true, summaryStyle = "mono", defaultExpandedIds, style }) {
  const [open, setOpen] = React.useState(() => {
    if (Array.isArray(defaultExpandedIds) && defaultExpandedIds.length) {
      return new Set(defaultExpandedIds.map(String));
    }

    return new Set();
  });
  const toggle = (i) => {
    const itemId = String(i);
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };
  const serif = summaryStyle === "serif";
  return (
    <div style={{ borderTop: "1px solid rgba(40,34,28,0.13)", ...style }}>
      {items.map((item, i) => {
        const itemId = String(item.id ?? i);
        const isOpen = open.has(itemId);
        return (
          <div key={itemId} style={{ borderBottom: "1px solid rgba(40,34,28,0.13)" }}>
            <button
              onClick={() => toggle(itemId)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
                border: 0,
                background: "transparent",
                textAlign: "left",
                padding: serif ? "22px 4px" : "16px 2px",
                fontFamily: serif ? "var(--font-serif)" : "var(--font-mono)",
                fontStyle: serif ? "italic" : "normal",
                fontSize: serif ? "1.22rem" : "1rem",
                letterSpacing: serif ? "0" : "0.06em",
                textTransform: serif ? "none" : "uppercase",
                color: "var(--leida-ink)",
              }}
            >
              {item.q}
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  flex: "0 0 auto",
                  borderRight: "1.5px solid var(--leida-clay)",
                  borderBottom: "1.5px solid var(--leida-clay)",
                  transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)",
                  transition: "transform var(--dur-mid) var(--ease-out)",
                }}
              />
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows var(--dur-mid) var(--ease-out)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: "0 4px 24px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.62,
                    color: "var(--leida-body)",
                    maxWidth: "62ch",
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
