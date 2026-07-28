import React from "react";
import { Button } from "./Button.jsx";

/**
 * A frosted segmented control - a white pill holding 2–3 options, with the
 * active option filled ink. As used for the Morning / Evening routine toggle.
 */
export function SegmentedToggle({ options, value, onChange, style, ...rest }) {
  const [internal, setInternal] = React.useState(value ?? options[0]?.value);
  const active = value ?? internal;
  const pick = (v) => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return (
    <div
      style={{
        display: "inline-flex",
        width: "fit-content",
        maxWidth: "100%",
        alignSelf: "flex-start",
        gap: "4px",
        padding: "5px",
        borderRadius: "40px",
        background: "rgba(255,255,255,0.78)",
        border: "1px solid var(--leida-line)",
        boxShadow: "0 8px 30px rgba(40,34,28,0.10)",
        ...style,
      }}
      role="tablist"
      {...rest}
    >
      {options.map((opt) => {
        const on = opt.value === active;
        return (
          <Button
            key={opt.value}
            as="button"
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => pick(opt.value)}
            variant={on ? "primary" : "ghost"}
            size="sm"
            style={{
              flex: "0 0 auto",
              boxShadow: on ? "var(--shadow-button)" : "none",
            }}
          >
            {opt.icon ? <span style={{ display: "inline-flex", lineHeight: 0 }}>{opt.icon}</span> : null}
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}
