import React from "react";

const STEP_STATES = {
  complete: {
    fill: "var(--leida-ink)",
    border: "var(--leida-ink)",
    text: "var(--leida-parchment)",
    label: "var(--leida-ink)",
  },
  current: {
    fill: "var(--leida-clay)",
    border: "var(--leida-clay)",
    text: "var(--leida-parchment)",
    label: "var(--leida-ink)",
  },
  upcoming: {
    fill: "rgba(255,255,255,0.9)",
    border: "rgba(168,146,122,0.38)",
    text: "var(--leida-muted)",
    label: "var(--leida-muted)",
  },
};

function getStepState(index, currentStep, explicitState) {
  if (explicitState && STEP_STATES[explicitState]) return explicitState;
  if (index < currentStep) return "complete";
  if (index === currentStep) return "current";
  return "upcoming";
}

/**
 * A horizontal progress rail with numbered or custom step markers and
 * optional labels underneath each step.
 */
export function StepIndicator({
  steps,
  currentStep = 0,
  lineStyle,
  style,
  ...rest
}) {
  const safeSteps = Array.isArray(steps) ? steps : [];
  const clampedCurrentStep = Math.max(0, Math.min(currentStep, Math.max(safeSteps.length - 1, 0)));
  const progress = safeSteps.length > 1 ? (clampedCurrentStep / (safeSteps.length - 1)) * 100 : 0;

  return (
    <ol
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${Math.max(safeSteps.length, 1)}, minmax(0, 1fr))`,
        gap: "16px",
        position: "relative",
        alignItems: "start",
        ...style,
      }}
      {...rest}
    >
      {safeSteps.length > 1 ? (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "18px",
              left: "calc(18px + 6px)",
              right: "calc(18px + 6px)",
              height: "1px",
              background: "rgba(168,146,122,0.32)",
              zIndex: 0,
              ...lineStyle,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "18px",
              left: "calc(18px + 6px)",
              width: `calc((100% - 48px) * ${progress / 100})`,
              height: "1px",
              background: "var(--leida-clay)",
              zIndex: 0,
              transition: "width var(--dur-med) var(--ease-out)",
              ...lineStyle,
            }}
          />
        </>
      ) : null}
      {safeSteps.map((step, index) => {
        const state = getStepState(index, clampedCurrentStep, step?.state);
        const tone = STEP_STATES[state];
        const indicator = step?.indicator ?? index + 1;
        const label = step?.label;
        const srLabel = step?.ariaLabel || (typeof label === "string" && label) || `Step ${index + 1}`;

        return (
          <li
            key={step?.key || srLabel || index}
            aria-current={state === "current" ? "step" : undefined}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "10px",
              minWidth: 0,
            }}
          >
            <span
              aria-label={srLabel}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${tone.border}`,
                background: tone.fill,
                color: tone.text,
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                letterSpacing: "0.02em",
                boxShadow: state === "current" ? "0 8px 18px rgba(168,146,122,0.22)" : "none",
                transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
              }}
            >
              {indicator}
            </span>
            {label ? (
              <span
                style={{
                  display: "block",
                  maxWidth: "11ch",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  lineHeight: 1.45,
                  color: tone.label,
                }}
              >
                {label}
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}