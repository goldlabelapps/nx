import React from "react";

const VARIANTS = {
  paper: {
    background: "var(--leida-paper)",
    border: "1px solid var(--leida-line)",
    boxShadow: "var(--shadow-card)",
  },
  glass: {
    background: "var(--leida-glass)",
    border: "1px solid rgba(255,255,255,0.75)",
    boxShadow: "var(--shadow-glass)",
    backdropFilter: "var(--blur-panel)",
    WebkitBackdropFilter: "var(--blur-panel)",
  },
  tile: {
    background: "var(--leida-tile)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "var(--blur-chip)",
    WebkitBackdropFilter: "var(--blur-chip)",
  },
  ink: {
    background: "var(--leida-ink)",
    color: "var(--leida-parchment)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-card)",
  },
};

const PADS = { sm: "18px", md: "26px 24px", lg: "34px 30px" };

/**
 * The base Leida surface - a soft, generously rounded container. Paper,
 * frosted glass, tile, or ink. `hoverLift` adds the product-card rise.
 */
export function Card({
  children,
  variant = "paper",
  padding = "md",
  hoverLift = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hoverLift && setHover(true)}
      onMouseLeave={() => hoverLift && setHover(false)}
      style={{
        borderRadius: "var(--radius-xl)",
        padding: PADS[padding] || padding,
        transition: "transform var(--dur-mid) var(--ease-out), box-shadow var(--dur-mid) var(--ease-out)",
        ...(VARIANTS[variant] || VARIANTS.paper),
        ...(hover ? { transform: "translateY(-6px)", boxShadow: "var(--shadow-card-hover)" } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
