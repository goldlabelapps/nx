import React from "react";

/**
 * The "cost calculator" range slider - a 3px hairline track with a round
 * ink thumb ringed in parchment. Shows a label + serif italic value.
 */
export function RangeSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  formatValue,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(value ?? min);
  const val = value ?? internal;
  const display = formatValue ? formatValue(val) : val;
  const handle = (e) => {
    const v = Number(e.target.value);
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  const id = React.useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        {label ? (
          <label
            htmlFor={id}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--leida-body)",
            }}
          >
            {label}
          </label>
        ) : <span />}
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.3rem",
            color: "var(--leida-ink)",
          }}
        >
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={handle}
        className="leida-range"
        {...rest}
      />
      <style>{`
        .leida-range { -webkit-appearance: none; appearance: none; width: 100%; height: 3px; border-radius: 3px; background: var(--leida-line); outline: none; margin: 0; }
        .leida-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: var(--leida-ink); cursor: pointer; border: 3px solid var(--leida-parchment); box-shadow: 0 2px 8px rgba(26,24,20,0.3); }
        .leida-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: var(--leida-ink); cursor: pointer; border: 3px solid var(--leida-parchment); box-shadow: 0 2px 8px rgba(26,24,20,0.3); }
      `}</style>
    </div>
  );
}
