import React from "react";

/** A small filled mono-caps pill for status / emphasis. */
export function Badge(props: BadgeProps): JSX.Element;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** Fill colour. @default "ink" */
  tone?: "ink" | "clay" | "quiet";
}
