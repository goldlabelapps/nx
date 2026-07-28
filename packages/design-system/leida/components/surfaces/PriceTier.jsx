import React from "react";
import { Card } from "./Card.jsx";
import { Badge } from "../feedback/Badge.jsx";
import { Button } from "../forms/Button.jsx";

/**
 * A membership pricing tier: optional "most popular" badge, mono tier name,
 * big serif price with a mono cadence, description, feature list and CTA.
 */
export function PriceTier({
  name,
  price,
  cadence,
  description,
  features = [],
  cta = "Become a member",
  onCta,
  badge,
  featured = false,
  style,
  ...rest
}) {
  return (
    <Card
      variant={featured ? "ink" : "paper"}
      padding="lg"
      style={{ position: "relative", display: "flex", flexDirection: "column", ...style }}
      {...rest}
    >
      {badge ? (
        <div style={{ position: "absolute", top: "-12px", left: "28px" }}>
          <Badge tone={featured ? "clay" : "ink"}>{badge}</Badge>
        </div>
      ) : null}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: featured ? "var(--leida-clay)" : "var(--leida-clay)",
          marginBottom: "14px",
        }}
      >
        {name}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "2.6rem", lineHeight: 1, color: featured ? "var(--leida-parchment)" : "var(--leida-ink)" }}>
          {price}
        </span>
        {cadence ? (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.06em", color: "var(--leida-muted)" }}>
            {cadence}
          </span>
        ) : null}
      </div>
      {description ? (
        <p style={{ fontSize: "0.92rem", color: featured ? "var(--leida-oat)" : "var(--leida-body)", margin: "14px 0 22px", flex: "0 0 auto" }}>
          {description}
        </p>
      ) : null}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: "11px", flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: "11px", alignItems: "flex-start", fontSize: "0.9rem", color: featured ? "var(--leida-oat)" : "var(--leida-body)" }}>
            <svg width="14" height="14" viewBox="365 121 76 74" fill={featured ? "var(--leida-clay)" : "var(--leida-clay)"} style={{ flex: "0 0 auto", marginTop: "3px" }}>
              <path d="M370.395,151.36c10.782,2.753,17.427,4.696,21.344,7.757c-2.203,4.442-7.311,9.086-15.745,16.238c9.148-5.775,15.049-9.228,19.888-10.097c1.329,4.545,0.886,11.007-0.154,21.038c2.634-10.047,4.529-16.325,7.52-20.076c4.325,2.067,8.776,6.878,15.534,14.744c-5.318-8.544-8.545-14.155-9.35-18.816c4.73-1.339,11.548-0.82,22.303,0.365c-10.728-2.739-17.357-4.677-21.282-7.712c2.176-4.473,7.301-9.132,15.798-16.339c-9.227,5.825-15.152,9.288-20.013,10.12c-1.317-4.543-0.873-10.999,0.164-21.005c-2.615,9.976-4.503,16.235-7.457,19.995c-4.309-2.081-8.751-6.884-15.482-14.719c5.326,8.558,8.555,14.173,9.353,18.839C388.082,153.072,381.24,152.554,370.395,151.36z" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Button
        variant={featured ? "ghost" : "primary"}
        block
        onClick={onCta}
        style={featured ? { background: "var(--leida-parchment)", color: "var(--leida-ink)" } : undefined}
      >
        {cta}
      </Button>
    </Card>
  );
}
