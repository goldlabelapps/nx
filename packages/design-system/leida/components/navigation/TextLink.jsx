import React from "react";

const DEFAULT_ICON = <span aria-hidden="true">→</span>;

/**
 * A lightweight mono-caps text link for navigation rows and top bars.
 * Keeps a subtle underline and optional directional icon.
 */
export function TextLink({
  children,
  href,
  icon = DEFAULT_ICON,
  iconPosition = "end",
  active = false,
  underline = true,
  style,
  ...rest
}) {
  const lineColor = active ? "currentColor" : "rgba(66,57,46,0.36)";

  return (
    <a
      href={href}
      aria-current={active ? (rest["aria-current"] || "page") : rest["aria-current"]}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.86rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        lineHeight: 1.2,
        color: active ? "var(--leida-ink)" : "var(--leida-body)",
        textDecoration: underline ? "underline" : "none",
        textDecorationColor: lineColor,
        textDecorationThickness: "1px",
        textUnderlineOffset: "0.2em",
        opacity: active ? 1 : 0.94,
        transition: "color var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      {icon && iconPosition === "start" ? (
        <span style={{ display: "inline-flex", lineHeight: 0.9 }}>{icon}</span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? (
        <span style={{ display: "inline-flex", lineHeight: 0.9 }}>{icon}</span>
      ) : null}
    </a>
  );
}