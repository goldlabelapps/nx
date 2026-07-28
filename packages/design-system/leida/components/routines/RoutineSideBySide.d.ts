import React from "react";

export interface RoutineSideBySideItem {
  id?: string;
  name: React.ReactNode;
  shortName?: React.ReactNode;
  image?: string | React.ReactNode;
}

export interface RoutineSideBySideStep {
  stage: React.ReactNode;
  morning?: RoutineSideBySideItem | null;
  evening?: RoutineSideBySideItem | null;
}

/**
 * Side-by-side AM/PM routine step matrix.
 */
export function RoutineSideBySide(props: RoutineSideBySideProps): JSX.Element;

export interface RoutineSideBySideProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  morningLabel?: React.ReactNode;
  eveningLabel?: React.ReactNode;
  morningIcon?: React.ReactNode;
  eveningIcon?: React.ReactNode;
  steps?: RoutineSideBySideStep[];
}