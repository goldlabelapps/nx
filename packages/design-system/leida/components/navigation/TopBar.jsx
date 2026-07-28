import React from "react";
import { Logo } from "../brand/Logo.jsx";
import { Button } from "../forms/Button.jsx";

/**
 * The sticky, frosted top bar from the marketing site: the Leida logo,
 * mono-caps nav links, and a primary CTA. Translucent parchment ground
 * with a blur so page texture shows through.
 */
export function TopBar({ links = [], cta, onCta, logoHeight = 30, style, ...rest }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        padding: "0 24px",
        height: "80px",
        background: "rgba(247,247,244,0.80)",
        backdropFilter: "var(--blur-bar)",
        WebkitBackdropFilter: "var(--blur-bar)",
        ...style,
      }}
      {...rest}
    >
      <a href="#top" aria-label="Leida home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <Logo height={logoHeight} />
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {links.map((l, i) => (
          <a
            key={i}
            href={l.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--leida-body)",
              textDecoration: "none",
            }}
          >
            {l.label}
          </a>
        ))}
        {cta ? (
          <Button size="sm" onClick={onCta}>{cta}</Button>
        ) : null}
      </nav>
    </header>
  );
}
