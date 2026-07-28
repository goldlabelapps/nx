import React from "react";

/**
 * A mono, all-caps, wide-tracked label that sits above a heading or
 * labels a group - Leida's signature "eyebrow". Renders a darker accent by default.
 */
export function Eyebrow(props: EyebrowProps): JSX.Element;

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Eyebrow text. */
  children: React.ReactNode;
  /** Colour of the label. @default "clay" */
  tone?: "clay" | "ink" | "muted";
  /** Render inline vs. as its own block. @default "block" */
  as?: "block" | "inline";
}
