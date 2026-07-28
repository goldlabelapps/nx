import React from "react";

/**
 * A compact client card with a split first and last name title.
 *
 * @startingPoint section="Cards" subtitle="Client card" viewport="320x240"
 */
export function ClientCard(props: ClientCardProps): JSX.Element;

export interface ClientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Client first name. */
  firstName: React.ReactNode;
  /** Client last name. */
  lastName?: React.ReactNode;
  /** Client page URL. When provided, clicking the card navigates to this URL. */
  href?: string;
}