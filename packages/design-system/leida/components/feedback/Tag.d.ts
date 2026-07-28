import React from "react";

/** A small mono-caps tag/chip; frosted glass, solid clay, or outline. */
export function Tag(props: TagProps): JSX.Element;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** @default "frost" */
  variant?: "frost" | "clay" | "outline";
  /** Optional leading icon. */
  icon?: React.ReactNode;
}
