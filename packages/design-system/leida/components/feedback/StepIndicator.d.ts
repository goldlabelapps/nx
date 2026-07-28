import React from "react";

/** A horizontal progress rail with numbered or custom step markers and optional labels. */
export function StepIndicator(props: StepIndicatorProps): JSX.Element;

export type StepIndicatorState = "complete" | "current" | "upcoming";

export interface StepIndicatorStep {
  key?: React.Key;
  label?: React.ReactNode;
  indicator?: React.ReactNode;
  ariaLabel?: string;
  state?: StepIndicatorState;
}

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: StepIndicatorStep[];
  /** Zero-based active step index. @default 0 */
  currentStep?: number;
  lineStyle?: React.CSSProperties;
}