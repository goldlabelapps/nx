import React from "react";

const SEVERITIES = {
  success: {
    label: "Success",
    accent: "var(--leida-clay)",
    border: "rgba(168,146,122,0.42)",
    background: "rgba(168,146,122,0.14)",
  },
  info: {
    label: "Info",
    accent: "var(--leida-ash)",
    border: "var(--leida-line)",
    background: "rgba(255,255,255,0.72)",
  },
  warning: {
    label: "Warning",
    accent: "var(--leida-sign)",
    border: "rgba(40,34,28,0.18)",
    background: "rgba(255,255,255,0.58)",
  },
  error: {
    label: "Error",
    accent: "var(--leida-ink)",
    border: "rgba(40,34,28,0.22)",
    background: "rgba(40,34,28,0.05)",
  },
};

/**
 * A compact dismissible alert with four Leida tones: success, info, warning,
 * and error. No icon, just a clear label, strong copy, and optional close
 * action.
 */
export function Alert({
  children,
  title,
  severity = "info",
  dismissible,
  autoCloseMs = 6000,
  onDismiss,
  style,
  ...rest
}) {
  const [closed, setClosed] = React.useState(false);
  const tone = SEVERITIES[severity] || SEVERITIES.info;

  const handleDismiss = (event) => {
    setClosed(true);
    if (onDismiss) onDismiss(event);
  };

  React.useEffect(() => {
    if (closed || autoCloseMs <= 0) return;

    const timer = setTimeout(() => {
      setClosed(true);
      if (onDismiss) onDismiss();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [closed, autoCloseMs, onDismiss]);

  if (closed) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        padding: "18px 20px",
        borderRadius: "18px",
        border: `1px solid ${tone.border}`,
        borderLeft: `4px solid ${tone.accent}`,
        background: tone.background,
        boxShadow: "0 10px 24px rgba(40,34,28,0.06)",
        color: "var(--leida-ink)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ minWidth: 0, flex: "1 1 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: title ? "8px" : "0",
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
            background: "rgba(255,255,255,0.42)",
            border: "1px solid rgba(40,34,28,0.08)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.56rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {tone.label}
        </div>
        {title ? (
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.03rem",
              fontStyle: "italic",
              lineHeight: 1.3,
              color: "var(--leida-ink)",
            }}
          >
            {title}
          </div>
        ) : null}
        {children ? (
          <div
            style={{
              marginTop: title ? "8px" : "0",
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.58,
              color: "var(--leida-body)",
            }}
          >
            {children}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss alert"
        style={{
          flex: "0 0 auto",
          width: "32px",
          height: "32px",
          borderRadius: "999px",
          border: "1px solid rgba(40,34,28,0.14)",
          background: "rgba(255,255,255,0.5)",
          color: "var(--leida-ink)",
          fontFamily: "var(--font-mono)",
          fontSize: "1rem",
          lineHeight: 1,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)",
        }}
      >
        ×
      </button>
    </div>
  );
}
