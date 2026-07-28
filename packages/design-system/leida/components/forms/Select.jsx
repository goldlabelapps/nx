import React from "react";

const HELPER_TEXT_STYLE = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  letterSpacing: "0.04em",
  paddingLeft: "4px",
};

const INPUT_VERTICAL_MARGIN = "12px";

/**
 * A rounded select dropdown on soft paper with optional label and helper/error text.
 */
export function Select({
  label,
  hint,
  error,
  options = [],
  id,
  style,
  wrapStyle,
  ...rest
}) {
  const autoId = React.useId();
  const selectId = id || autoId;
  const isDisabled = Boolean(rest.disabled);
  const borderColor = error ? "#c03b2b" : "var(--border-input)";
  const helperColor = error ? "#c03b2b" : "var(--leida-muted)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBlock: INPUT_VERTICAL_MARGIN, ...wrapStyle }}>
      {label ? (
        <label
          htmlFor={selectId}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--leida-muted)",
          }}
        >
          {label}
        </label>
      ) : null}
      <div style={{ position: "relative" }}>
        <select
          id={selectId}
          aria-invalid={Boolean(error)}
          style={{
            width: "100%",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "0.95rem",
            letterSpacing: "var(--track-button)",
            textTransform: "uppercase",
            textAlign: "center",
            textAlignLast: "center",
            color: isDisabled ? "var(--leida-muted)" : "var(--leida-ink)",
            padding: "14px 50px 14px 18px",
            borderRadius: "var(--radius-pill)",
            border: `1px solid ${borderColor}`,
            background: isDisabled ? "var(--surface-input-disabled)" : "var(--surface-input)",
            outline: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.62)",
            cursor: isDisabled ? "not-allowed" : "pointer",
            opacity: isDisabled ? 0.88 : 1,
            transition: "border-color var(--dur-fast), background-color var(--dur-fast), box-shadow var(--dur-fast)",
            ...style,
          }}
          onMouseEnter={(e) => {
            if (e.target !== document.activeElement && !e.target.disabled) {
              e.target.style.borderColor = "var(--border-input-hover)";
              e.target.style.backgroundColor = "var(--surface-input-hover)";
            }
          }}
          onMouseLeave={(e) => {
            if (e.target !== document.activeElement && !e.target.disabled) {
              e.target.style.borderColor = borderColor;
              e.target.style.backgroundColor = "var(--surface-input)";
            }
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--border-input-focus)";
            e.target.style.backgroundColor = "var(--surface-input-focus)";
            e.target.style.boxShadow = "0 0 0 4px rgba(168, 146, 122, 0.28), inset 0 1px 0 rgba(255,255,255,0.78)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = borderColor;
            e.target.style.backgroundColor = "var(--surface-input)";
            e.target.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.62)";
          }}
          onInvalid={(e) => {
            e.target.style.borderColor = "#c03b2b";
            e.target.style.boxShadow = "0 0 0 4px rgba(192, 59, 43, 0.22), inset 0 1px 0 rgba(255,255,255,0.78)";
          }}
          {...rest}
        >
          {options.map((option) => (
            <option key={`${selectId}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "32px",
            top: "58%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: isDisabled ? "var(--leida-muted)" : "var(--leida-sign)",
            fontFamily: "var(--font-mono)",
            fontSize: "1.08rem",
            lineHeight: 1,
            letterSpacing: "0.08em",
          }}
        >
          v
        </span>
      </div>
      {hint || error ? (
        <span
          style={{
            ...HELPER_TEXT_STYLE,
            color: helperColor,
          }}
        >
          {error || hint}
        </span>
      ) : null}
    </div>
  );
}