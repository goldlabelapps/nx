import React from "react";
import { Card } from "../surfaces/Card.jsx";
import { Text } from "../brand/Typography.jsx";

function DefaultSunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </svg>
  );
}

function DefaultMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17 12a6 6 0 0 1-7.7 5.8A6.5 6.5 0 1 0 16.2 7 6 6 0 0 1 17 12z" />
    </svg>
  );
}

function StepCell({ item }) {
  if (!item) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center", visibility: "hidden" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "120px",
            aspectRatio: "1 / 1",
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            display: "grid",
            placeItems: "center",
          }}
        />
        <Text as="span" variant="caption" color="text.primary" style={{ fontSize: "0.62rem", lineHeight: 1.35 }}>
          Placeholder
        </Text>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "120px",
          aspectRatio: "1 / 1",
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        {typeof item.image === "string"
          ? <img src={item.image} alt={String(item.name || "Routine product")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : (item.image || <span style={{ color: "var(--leida-muted)" }}>-</span>)}
      </div>
      <Text as="span" variant="caption" color="text.primary" style={{ fontSize: "0.62rem", lineHeight: 1.35 }}>
        {item.shortName || item.name}
      </Text>
    </div>
  );
}

/**
 * Morning/evening routine comparison with side-by-side steps.
 */
export function RoutineSideBySide({
  title = "Morning & evening, side by side",
  morningLabel = "AM",
  eveningLabel = "PM",
  morningIcon,
  eveningIcon,
  steps = [],
  style,
  ...rest
}) {
  return (
    <Card variant="glass" padding="md" style={{ ...style }} {...rest}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Text as="h3" variant="h3" color="text.primary" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1.08 }}>
          {title}
        </Text>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 1fr", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {morningIcon || <DefaultSunIcon />}
          <Text as="span" variant="caption" color="text.primary" style={{ fontSize: "0.76rem" }}>{morningLabel}</Text>
        </div>
        <div />
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {eveningIcon || <DefaultMoonIcon />}
          <Text as="span" variant="caption" color="text.primary" style={{ fontSize: "0.76rem" }}>{eveningLabel}</Text>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
        {steps.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <div key={`${step.stage}-${index}`} style={{ display: "grid", gridTemplateColumns: "1fr 52px 1fr", alignItems: "stretch", minHeight: "128px" }}>
              <StepCell item={step.morning} stage={step.stage} />

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ width: "1.5px", flex: "0 0 22px", background: isFirst ? "transparent" : "rgba(168,146,122,0.55)" }} />
                <span
                  style={{
                    minWidth: "30px",
                    height: "30px",
                    borderRadius: "999px",
                    border: "1px solid var(--leida-tan)",
                    background: "rgba(247,247,244,0.55)",
                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--leida-ink)",
                    padding: "0 8px",
                    textTransform: "uppercase",
                  }}
                >
                  {step.stage}
                </span>
                <span style={{ width: "1.5px", flex: 1, background: isLast ? "transparent" : "rgba(168,146,122,0.55)" }} />
              </div>

              <StepCell item={step.evening} stage={step.stage} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}