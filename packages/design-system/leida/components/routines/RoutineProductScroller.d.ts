import React from "react";

export type RoutinePeriod = "morning" | "evening";

export interface RoutineProductScrollerProduct {
  id?: string;
  name: React.ReactNode;
  brand?: React.ReactNode;
  price?: React.ReactNode;
  image?: string | React.ReactNode;
  tag?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Morning/evening routine product rail with snap scrolling and touch support.
 */
export function RoutineProductScroller(props: RoutineProductScrollerProps): JSX.Element;

export interface RoutineProductScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  morningProducts?: RoutineProductScrollerProduct[];
  eveningProducts?: RoutineProductScrollerProduct[];
  period?: RoutinePeriod;
  defaultPeriod?: RoutinePeriod;
  onPeriodChange?: (period: RoutinePeriod) => void;
  showArrows?: boolean;
  showDots?: boolean;
  emptyLabel?: React.ReactNode;
}