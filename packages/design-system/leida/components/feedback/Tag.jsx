import React from "react";

const VARIANTS = {
  frost: {
    background: "rgba(255,255,255,0.72)",
    color: "var(--leida-ink)",
    boxShadow: "0 6px 18px rgba(40,34,28,0.12)",
    backdropFilter: "var(--blur-chip)",
    WebkitBackdropFilter: "var(--blur-chip)",
  },
  clay: {
    background: "var(--leida-clay)",
    color: "var(--leida-parchment)",
  },
  outline: {
    background: "transparent",
    color: "var(--leida-ink)",
    border: "1px solid var(--leida-line)",
  },
};

/**
 * A small mono-caps tag/chip. Frosted glass by default (floats over
 * imagery), plus solid clay and hairline outline variants. Optional icon.
 */
export function Tag({ children, variant = "frost", icon, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "1rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "6px 12px",
        borderRadius: "30px",
        lineHeight: 1,
        ...(VARIANTS[variant] || VARIANTS.frost),
        ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ display: "inline-flex", lineHeight: 0 }}>{icon}</span> : null}
      {children}
    </span>
  );
}
