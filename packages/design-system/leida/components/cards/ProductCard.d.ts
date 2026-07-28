import React from "react";

/**
 * An aftercare product card - photo, serif name, brand, price
 * and a quiet buy action.
 *
 * @startingPoint section="Cards" subtitle="Aftercare product card" viewport="340x400"
 */
export function ProductCard(props: ProductCardProps): JSX.Element;

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL, or your own node (e.g. an <image-slot>). */
  image?: string | React.ReactNode;
  /** Product page URL. When provided, clicking the card navigates to this URL. */
  href?: string;
  /** Product name (serif italic). */
  name: React.ReactNode;
  /** Brand line (mono caps). */
  brand?: React.ReactNode;
  /** Price string, e.g. "£38". */
  price?: React.ReactNode;
  /** Corner tag, e.g. "New". */
  tag?: React.ReactNode;
  /** Whether to show the buy button. @default false */
  showBuyButton?: boolean;
  /** Buy button label. @default "Buy" */
  buyLabel?: React.ReactNode;
  /** CTA style variant. "route" uses BtnRoute, "primary" uses BtnPrimary. @default "route" */
  buyButtonVariant?: "route" | "primary";
  onBuy?: () => void;
}