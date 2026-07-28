import React from "react";

const TONES = {
  ink: { background: "var(--leida-ink)", color: "var(--leida-parchment)" },
  clay: { background: "var(--leida-clay)", color: "var(--leida-parchment)" },
  quiet: {
    background: "rgba(168, 146, 122, 0.15)",
    color: "var(--leida-muted)",
    border: "1px solid rgba(168, 146, 122, 0.35)",
  },
};

const TONE_ICONS = {
  quiet: "◦",
};

/**
 * A small filled mono-caps pill for status / emphasis - e.g. "MOST POPULAR"
 * on a pricing tier, or "NEW" beside a heading.
 */
export function Badge({ children, tone = "ink", style, ...rest }) {
  const icon = TONE_ICONS[tone];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "1rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1,
        ...(TONES[tone] || TONES.ink),
        ...style,
      }}
      {...rest}
    >
      {icon ? <span aria-hidden="true" style={{ marginRight: "0.45em" }}>{icon}</span> : null}
      {children}
    </span>
  );
}
