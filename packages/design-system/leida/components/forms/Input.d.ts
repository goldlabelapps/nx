import React from "react";

/** A pill text input on soft paper, with optional label, hint and error. */
export function Input(props: InputProps): JSX.Element;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono caps label above the field. */
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error text (also tints the border clay). */
  error?: React.ReactNode;
  /** Explicit validation indicator shown on the right side of the field. */
  validationState?: "valid" | "invalid";
  /** Style for the wrapping column. */
  wrapStyle?: React.CSSProperties;
}
