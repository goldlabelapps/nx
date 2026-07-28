import React from "react";

/**
 * Lightweight mono-caps text link for inline and bar navigation.
 *
 * @startingPoint section="Navigation" subtitle="Text link" viewport="460x120"
 */
export function TextLink(props: TextLinkProps): JSX.Element;

export interface TextLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  /** Label content. */
  children: React.ReactNode;
  /** Optional directional icon node. */
  icon?: React.ReactNode;
  /** Icon placement. @default "end" */
  iconPosition?: "start" | "end";
  /** Marks current route state and boosts contrast. @default false */
  active?: boolean;
  /** Toggle subtle underline treatment. @default true */
  underline?: boolean;
}