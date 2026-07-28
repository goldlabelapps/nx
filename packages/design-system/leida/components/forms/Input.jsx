import React from "react";

const HELPER_TEXT_STYLE = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  letterSpacing: "0.04em",
  paddingLeft: "4px",
};

const INPUT_VERTICAL_MARGIN = "12px";

/**
 * A rounded (pill) text input on soft paper. Optional leading label and
 * helper/error text below.
 */
export function Input({
  label,
  hint,
  error,
  validationState,
  id,
  style,
  wrapStyle,
  ...rest
}) {
  const autoId = React.useId();
  const inputId = id || autoId;
  const isDisabled = Boolean(rest.disabled);
  const isReadOnly = Boolean(rest.readOnly);
  const state = validationState || (error ? "invalid" : undefined);
  const showValidation = state === "valid" || state === "invalid";
  const borderColor = state === "invalid" ? "#c03b2b" : "var(--border-input)";
  const helperColor = state === "invalid" ? "#c03b2b" : "var(--leida-muted)";
  const validationIcon = state === "valid" ? "✓" : "✕";
  const validationColor = state === "valid" ? "#2f8f46" : "#c03b2b";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBlock: INPUT_VERTICAL_MARGIN, ...wrapStyle }}>
      {label ? (
        <label
          htmlFor={inputId}
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
        <input
          id={inputId}
          aria-invalid={state === "invalid" ? true : undefined}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.2rem",
            color: "var(--leida-ink)",
            width: "100%",
            padding: showValidation ? "14px 42px 14px 18px" : "14px 18px",
            borderRadius: "var(--radius-pill)",
            border: `1px solid ${borderColor}`,
            background: isDisabled ? "var(--surface-input-disabled)" : "var(--surface-input)",
            outline: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.62)",
            transition: "border-color var(--dur-fast), background-color var(--dur-fast), box-shadow var(--dur-fast)",
            cursor: isDisabled ? "not-allowed" : isReadOnly ? "default" : "text",
            opacity: isDisabled ? 0.88 : 1,
            ...style,
          }}
          onMouseEnter={(e) => {
            if (e.target !== document.activeElement && !e.target.disabled && !e.target.readOnly) {
              e.target.style.borderColor = "var(--border-input-hover)";
              e.target.style.backgroundColor = "var(--surface-input-hover)";
            }
          }}
          onMouseLeave={(e) => {
            if (e.target !== document.activeElement && !e.target.disabled && !e.target.readOnly) {
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
        />
        {showValidation ? (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              lineHeight: 1,
              color: validationColor,
              pointerEvents: "none",
            }}
          >
            {validationIcon}
          </span>
        ) : null}
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
