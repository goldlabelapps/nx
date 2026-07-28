import React from "react";

const SIZES = {
  sm: { padding: "7px 12px", fontSize: "0.85rem" },
  md: { padding: "10px 18px", fontSize: "0.95rem" },
};

const VARIANTS = {
  primary: {
    background: "var(--leida-ink)",
    color: "var(--leida-parchment)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-button)",
  },
  secondary: {
    background: "var(--leida-clay)",
    color: "var(--leida-parchment)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-button)",
  },
  ghost: {
    background: "rgba(255,255,255,0.4)",
    color: "var(--leida-ink)",
    border: "1px solid var(--leida-line)",
    backdropFilter: "var(--blur-chip)",
    WebkitBackdropFilter: "var(--blur-chip)",
  },
  quiet: {
    background: "transparent",
    color: "var(--leida-ink)",
    border: "1px solid rgba(40,34,28,0.28)",
  },
};

/**
 * The Leida pill button. Mono, uppercase, wide-tracked label; lifts on
 * hover. Primary (ink), secondary (clay), ghost (frosted), and quiet (hairline) variants.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  icon,
  as = "button",
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const lift =
    hover && !disabled
      ? {
          transform: "translateY(-2px)",
          boxShadow:
            variant === "primary" || variant === "secondary"
              ? "var(--shadow-button-hi)"
              : "var(--shadow-card)",
          background: variant === "ghost" ? "rgba(255,255,255,0.7)" : v.background,
        }
      : null;
  return (
    <Tag
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={Tag === "button" ? disabled : undefined}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: "9px",
        fontFamily: "var(--font-mono)",
        letterSpacing: "var(--track-button)",
        textTransform: "uppercase",
        borderRadius: "var(--radius-pill)",
        textDecoration: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)",
        ...v,
        ...s,
        ...lift,
        ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ display: "inline-flex", lineHeight: 0 }}>{icon}</span> : null}
      {children}
    </Tag>
  );
}
