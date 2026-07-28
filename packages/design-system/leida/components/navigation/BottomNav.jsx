import React from "react";

/**
 * A mobile-style bottom navigation bar with icon + label actions.
 * Uses a frosted, rounded surface that matches the Leida visual system.
 */
export function BottomNav({
  items = [],
  value,
  onChange,
  onNavigate,
  ariaLabel = "Bottom navigation",
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(value ?? items[0]?.value);
  const active = value ?? internal;

  const pick = (item) => {
    if (item.disabled) return;
    if (value === undefined) setInternal(item.value);
    onChange && onChange(item.value, item);
    onNavigate && onNavigate(item);
  };

  return (
    <nav
      aria-label={ariaLabel}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        padding: "10px max(12px, env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left))",
        background: "transparent",
        backdropFilter: "var(--blur-bar)",
        WebkitBackdropFilter: "var(--blur-bar)",
        borderTop: "1px solid var(--leida-line)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, minmax(0, 1fr))`,
          gap: "8px",
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        {items.map((item) => {
          const isActive = item.value === active;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => pick(item)}
              disabled={item.disabled}
              aria-current={isActive ? "page" : undefined}
              style={{
                appearance: "none",
                border: isActive
                  ? "1px solid rgba(40,34,28,0.24)"
                  : "1px solid transparent",
                borderRadius: "16px",
                minHeight: "52px",
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "4px",
                background: isActive ? "rgba(255,255,255,0.52)" : "transparent",
                color: isActive ? "var(--leida-ink)" : "var(--leida-body)",
                boxShadow: isActive ? "0 6px 18px rgba(40,34,28,0.10)" : "none",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? 0.5 : 1,
                transition: "all var(--dur-fast) var(--ease-out)",
              }}
            >
              {item.icon ? (
                <span style={{ display: "inline-flex", lineHeight: 0 }} aria-hidden="true">
                  {item.icon}
                </span>
              ) : null}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}