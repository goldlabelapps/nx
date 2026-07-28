import React from "react";

/** A statement stat: big serif figure, supporting copy, optional source. */
export function StatCard(props: StatCardProps): JSX.Element;

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The headline figure (serif italic), e.g. "3×" or "£0". */
  figure: React.ReactNode;
  /** Supporting sentence. */
  children?: React.ReactNode;
  /** Mono-caps source / citation. */
  source?: React.ReactNode;
  /** @default "paper" */
  variant?: "paper" | "glass" | "tile" | "ink";
}