import React from "react";

/**
 * Leida's eight-point sparkle mark, lifted from the dot of the "i".
 */
export function StarMark(props: StarMarkProps): JSX.Element;

export interface StarMarkProps extends Omit<React.SVGAttributes<SVGSVGElement>, "size"> {
  /** Square size in px. @default 24 */
  size?: number;
  /** Fill colour. @default "ink" */
  tone?: "ink" | "dusty" | "clay" | "offwhite" | "current";
  /** Accessible label; when omitted the mark is decorative. */
  title?: string;
}
