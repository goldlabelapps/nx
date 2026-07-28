import React from "react";

/**
 * A hairline-divided disclosure list (FAQ / details) with rotating clay
 * chevrons.
 *
 * @startingPoint section="Feedback" subtitle="FAQ accordion" viewport="640x360"
 */
export function Accordion(props: AccordionProps): JSX.Element;

export interface AccordionItem {
  /** The summary / question (heading row). */
  id?: string;
  q: React.ReactNode;
  /** The revealed body / answer. */
  a: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once. @default true */
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  /** Summary typography. @default "mono" */
  summaryStyle?: "serif" | "mono";
  style?: React.CSSProperties;
}
