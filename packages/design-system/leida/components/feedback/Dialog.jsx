import React from "react";
import { createPortal } from "react-dom";
import { Card } from "../surfaces/Card.jsx";

const SIZES = {
  sm: "min(92vw, 28rem)",
  md: "min(92vw, 36rem)",
  lg: "min(92vw, 46rem)",
  xl: "min(92vw, 56rem)",
};

/**
 * A controlled modal dialog that replaces MUI Dialog. It supports backdrop
 * and escape dismissal, a title and description area, and an optional action
 * row.
 */
export function Dialog({
  open,
  title,
  description,
  requirements,
  children,
  actions,
  size = "sm",
  dismissible = true,
  closeOnBackdropClick = true,
  closeOnEscapeKeyDown = true,
  onClose,
  style,
  backdropStyle,
  paperStyle,
  ...rest
}) {
  const titleId = React.useId();
  const descriptionId = React.useId();

  const isTextDescription = typeof description === "string" || typeof description === "number";
  const isTextChildren = typeof children === "string" || typeof children === "number";
  const normalizedDescription = isTextDescription ? String(description).trim() : "";
  const normalizedChildren = isTextChildren ? String(children).trim() : "";
  const isDuplicateMessage =
    Boolean(normalizedDescription) &&
    Boolean(normalizedChildren) &&
    normalizedDescription === normalizedChildren;
  const hasBodyContent = children !== null && children !== undefined && children !== false && !isDuplicateMessage;

  React.useEffect(() => {
    if (!open || !closeOnEscapeKeyDown) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.(event, "escapeKeyDown");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscapeKeyDown, onClose, open]);

  if (!open) return null;

  const handleBackdropClick = (event) => {
    if (!closeOnBackdropClick) return;
    if (event.target === event.currentTarget) {
      onClose?.(event, "backdropClick");
    }
  };

  const dialogNode = (
    <div
      onClick={handleBackdropClick}
      style={{
        ...backdropStyle,
        position: "fixed",
        inset: 0,
        zIndex: 80,
        display: "grid",
        placeItems: "center",
        padding: "24px",
        // background: "linear-gradient(180deg, rgba(26,24,20,0.4), rgba(26,24,20,0.58))",
        // backdropFilter: "blur(10px)",
        // WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Card
        variant="glass"
        padding="0"
        style={{
          width: SIZES[size] || SIZES.md,
          overflow: "hidden",
          padding: "8px",
          ...style,
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          style={{
            maxHeight: "min(88vh, 52rem)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "calc(var(--radius-xl) - 8px)",
            background: "var(--leida-paper)",
            color: "var(--leida-ink)",
            border: "1px solid var(--leida-line-soft)",
            boxShadow: "var(--shadow-card)",
            ...paperStyle,
          }}
          {...rest}
        >
          <div
            style={{
              display: "flex",
              alignItems: title || description ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: "16px",
              padding: "24px 24px 18px",
              borderBottom: "1px solid var(--leida-line-soft)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.74), rgba(255,255,255,0.36))",
            }}
          >
            <div style={{ minWidth: 0 }}>
              {title ? (
                <div
                  id={titleId}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.45rem",
                    fontStyle: "italic",
                    lineHeight: 1.15,
                    color: "var(--leida-ink)",
                  }}
                >
                  {title}
                </div>
              ) : null}
              {/* {description ? (
                <div
                  id={descriptionId}
                  style={{
                    marginTop: title ? "8px" : 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.58,
                    color: "var(--leida-body)",
                    maxWidth: "56ch",
                  }}
                >
                  {description}
                </div>
              ) : null} */}
            </div>
            {dismissible ? (
              <button
                type="button"
                onClick={(event) => onClose?.(event, "closeButtonClick")}
                aria-label="Close dialog"
                style={{
                  flex: "0 0 auto",
                  width: "34px",
                  height: "34px",
                  borderRadius: "999px",
                  border: "1px solid rgba(40,34,28,0.14)",
                  background: "rgba(255,255,255,0.64)",
                  color: "var(--leida-ink)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.05rem",
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
            ) : null}
          </div>

          {Array.isArray(requirements) && requirements.length ? (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: "16px 24px 0",
                display: "grid",
                gap: "8px",
              }}
            >
              {requirements.map((requirement, index) => {
                const isObject = typeof requirement === "object" && requirement !== null;
                const label = isObject ? requirement.label : requirement;
                const complete = Boolean(isObject && requirement.complete);

                return (
                  <li
                    key={`${String(label)}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      color: complete ? "var(--leida-ink)" : "var(--leida-body)",
                      fontSize: "0.94rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <span aria-hidden="true" style={{ width: "1.1em", textAlign: "center", transform: "translateY(1px)" }}>
                      {complete ? "✓" : "○"}
                    </span>
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {hasBodyContent ? (
            <div
              style={{
                padding: Array.isArray(requirements) && requirements.length ? "18px 24px 24px" : "24px",
                overflowY: "auto",
                flex: "1 1 auto",
                fontFamily: "var(--font-sans)",
                fontSize: "0.98rem",
                lineHeight: 1.65,
                color: "var(--leida-body)",
              }}
            >
              {children}
            </div>
          ) : null}

          {actions ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                padding: "18px 24px 24px",
                borderTop: "1px solid var(--leida-line-soft)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.54))",
              }}
            >
              {actions}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );

  if (typeof document === "undefined") {
    return dialogNode;
  }

  return createPortal(dialogNode, document.body);
}