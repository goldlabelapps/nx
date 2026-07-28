import React from "react";

export type RoutineAmPm = "am" | "pm" | "both";

export interface RoutineProductSelectorProduct {
  id: string;
  name?: React.ReactNode;
  product_name?: React.ReactNode;
  image?: string | React.ReactNode;
  thumbnail?: string | React.ReactNode;
  imageUrl?: string;
  image_url?: string;
  product_image_url?: string;
  productImageUrl?: string;
  brand?: React.ReactNode;
  brandName?: React.ReactNode;
  routineStep?: string;
  routine_step?: string;
  amPm?: RoutineAmPm;
  am_pm?: RoutineAmPm;
  defaultAmPm?: RoutineAmPm;
}

export interface RoutineProductSelectorSelection {
  productId: string;
  amPm: RoutineAmPm;
  usageNote: string;
}

export interface RoutineProductSelectorAmPmOption {
  value: RoutineAmPm;
  label: React.ReactNode;
}

export interface RoutineProductSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  products?: RoutineProductSelectorProduct[];
  value?: Record<string, RoutineProductSelectorSelection>;
  defaultValue?: Record<string, RoutineProductSelectorSelection>;
  onChange?: (nextValue: Record<string, RoutineProductSelectorSelection>) => void;
  stepOrder?: string[];
  amPmOptions?: RoutineProductSelectorAmPmOption[];
  emptyLabel?: React.ReactNode;
  usageNotePlaceholder?: string;
}

/**
 * Product selection editor used during routine creation.
 * Each selected product can override AM/PM usage and add a usage note.
 */
export function RoutineProductSelector(props: RoutineProductSelectorProps): JSX.Element;
