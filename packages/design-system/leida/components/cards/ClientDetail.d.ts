import React from "react";

export interface ClientDetailClient {
  slug?: React.ReactNode;
  email?: React.ReactNode;
  first_name?: React.ReactNode;
  firstName?: React.ReactNode;
  last_name?: React.ReactNode;
  lastName?: React.ReactNode;
  skin_type?: React.ReactNode;
  skinType?: React.ReactNode;
  is_pregnant?: boolean;
  isPregnant?: boolean;
  concern_tags?: React.ReactNode[];
  concernTags?: React.ReactNode[];
  skin_overview?: React.ReactNode;
  skinOverview?: React.ReactNode;
}

/**
 * A responsive client detail card with always-visible details,
 * including a shortened overview excerpt and optional concern tags.
 *
 * @startingPoint section="Cards" subtitle="Client detail card" viewport="360x420"
 */
export function ClientDetail(props: ClientDetailProps): JSX.Element;

export interface ClientDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Client data from the API. Both snake_case and camelCase fields are accepted for convenience. */
  client: ClientDetailClient;
  /** Edit page URL used when the skin overview is missing. */
  editHref?: string;
  /** Optional action button shown in the card header area. */
  actionButton?: React.ReactNode;
  /** Optional line clamp for the shortened overview text. */
  overviewLines?: number;
}