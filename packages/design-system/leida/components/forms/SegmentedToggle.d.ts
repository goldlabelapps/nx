import React from "react";

/**
 * A frosted white pill holding 2–3 options with the active one filled ink.
 * Used for the Morning / Evening routine switch and product-view toggles.
 */
export function SegmentedToggle(props: SegmentedToggleProps): JSX.Element;

export interface SegmentedToggleOption {
  value: string;
  label: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
}

export interface SegmentedToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentedToggleOption[];
  /** Controlled selected value; omit for uncontrolled. */
  value?: string;
  onChange?: (value: string) => void;
}
