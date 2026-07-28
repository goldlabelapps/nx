import React from "react";

/**
 * A hairline range slider with an ink thumb ringed in parchment, paired
 * with a mono label and a serif-italic live value. As used in the
 * marketing site's cost calculator.
 */
export function RangeSlider(props: RangeSliderProps): JSX.Element;

export interface RangeSliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  /** Mono caps label to the left of the value. */
  label?: React.ReactNode;
  /** Controlled value; omit for uncontrolled. */
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Fires with the numeric value. */
  onChange?: (value: number) => void;
  /** Format the displayed value, e.g. v => `£${v}`. */
  formatValue?: (value: number) => React.ReactNode;
}
