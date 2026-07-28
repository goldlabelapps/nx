import React from "react";

/**
 * A membership pricing tier with an optional "most popular" badge and a
 * sparkle-bulleted feature list.
 *
 * @startingPoint section="Surfaces" subtitle="Membership pricing tier" viewport="340x460"
 */
export function PriceTier(props: PriceTierProps): JSX.Element;

export interface PriceTierProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tier name (mono caps), e.g. "Solo". */
  name: React.ReactNode;
  /** Price (serif italic), e.g. "£19". */
  price: React.ReactNode;
  /** Cadence suffix, e.g. "/mo". */
  cadence?: React.ReactNode;
  description?: React.ReactNode;
  /** Feature lines, each sparkle-bulleted. */
  features?: React.ReactNode[];
  /** CTA label. @default "Become a member" */
  cta?: React.ReactNode;
  onCta?: () => void;
  /** Corner badge, e.g. "Most popular". */
  badge?: React.ReactNode;
  /** Ink-filled, elevated treatment. @default false */
  featured?: boolean;
}
