import React from "react";

/**
 * The base Leida surface - a soft, generously rounded container.
 *
 * @startingPoint section="Surfaces" subtitle="Base card - paper / glass / tile / ink" viewport="360x200"
 */
export function Card(props: CardProps): JSX.Element;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Surface treatment. @default "paper" */
  variant?: "paper" | "glass" | "tile" | "ink";
  /** Inner padding preset, or any CSS padding string. @default "md" */
  padding?: "sm" | "md" | "lg" | string;
  /** Rise + deepen shadow on hover (product-card feel). @default false */
  hoverLift?: boolean;
}
