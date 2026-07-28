import React from "react";

/**
 * The sticky frosted marketing top bar: logo, mono nav links, primary CTA.
 *
 * @startingPoint section="Navigation" subtitle="Marketing top bar" viewport="900x80"
 */
export function TopBar(props: TopBarProps): JSX.Element;

export interface TopBarLink {
  label: React.ReactNode;
  href: string;
}

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  links?: TopBarLink[];
  /** Primary CTA label; omit to hide. */
  cta?: React.ReactNode;
  onCta?: () => void;
  /** Logo height in px. @default 30 */
  logoHeight?: number;
}
