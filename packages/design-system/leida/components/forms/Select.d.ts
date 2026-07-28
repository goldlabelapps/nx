import React from "react";

/** A rounded select dropdown on soft paper with optional label and helper/error text. */
export function Select(props: SelectProps): JSX.Element;

export interface SelectOption {
  label: React.ReactNode;
  value: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  hint?: string;
  error?: string;
  options?: SelectOption[];
  wrapStyle?: React.CSSProperties;
}