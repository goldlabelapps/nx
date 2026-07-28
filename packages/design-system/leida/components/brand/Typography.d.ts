import React from "react";

export type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  component?: keyof JSX.IntrinsicElements;
  variant?: TypographyVariant;
  color?: string;
  gutterBottom?: boolean;
  display?: React.CSSProperties["display"];
  sx?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Leida's unified typography primitive for app and design-system usage.
 */
export const Typography: React.ForwardRefExoticComponent<
  TypographyProps & React.RefAttributes<HTMLElement>
>;

export function Display(props: TypographyProps): JSX.Element;
export function Heading(props: TypographyProps): JSX.Element;
export function Text(props: TypographyProps): JSX.Element;
export function Microcopy(props: TypographyProps): JSX.Element;
