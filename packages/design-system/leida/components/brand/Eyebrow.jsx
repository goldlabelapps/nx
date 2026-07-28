import React from "react";

const TONES = {
  clay: "var(--text-subtle)",
  ink: "var(--leida-ink)",
  muted: "var(--leida-muted)",
};

/**
 * A mono, all-caps, wide-tracked label - Leida's signature "eyebrow".
 */
export function Eyebrow({ children, tone = "ink", as = "block", style, ...rest }) {
  return (
    <span
      style={{
        display: as === "inline" ? "inline-block" : "block",
        fontFamily: "var(--font-mono)",
        fontSize: "0.95rem",
        letterSpacing: "var(--track-eyebrow)",
        textTransform: "uppercase",
        color: TONES[tone] || TONES.clay,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
