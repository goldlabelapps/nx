import React from "react";

/**
 * A mobile-first bottom action bar (icon + label) for app navigation.
 *
 * @startingPoint section="Navigation" subtitle="Mobile bottom nav" viewport="390x190"
 */
export function BottomNav(props: BottomNavProps): JSX.Element;

export interface BottomNavItem {
  value: string;
  label: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BottomNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  items: BottomNavItem[];
  /** Controlled selected value; omit for uncontrolled. */
  value?: string;
  onChange?: (value: string, item: BottomNavItem) => void;
  /** Optional click handler with the selected item. */
  onNavigate?: (item: BottomNavItem) => void;
  /** Accessibility label for the nav landmark. */
  ariaLabel?: string;
}