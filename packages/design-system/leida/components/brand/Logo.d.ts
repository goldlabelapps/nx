import React from "react";

/**
 * The Leida logo - editorial italic wordmark with the sparkle over the i,
 * or the sparkle alone.
 *
 * @startingPoint section="Brand" subtitle="Leida logo lockup" viewport="360x120"
 */
export function Logo(props: LogoProps): JSX.Element;

export interface LogoProps extends Omit<React.SVGAttributes<SVGSVGElement>, "height"> {
  /** Full wordmark or the sparkle mark alone. @default "full" */
  variant?: "full" | "mark";
  /** Rendered height in px (width scales to the mark's ratio). @default 40 */
  height?: number;
  /** Fill colour. @default "ink" */
  tone?: "ink" | "dusty" | "offwhite" | "current";
}
