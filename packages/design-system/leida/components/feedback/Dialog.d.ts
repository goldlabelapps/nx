import React from "react";

/**
 * A controlled modal dialog that replaces MUI Dialog. It supports backdrop
 * and escape dismissal, a title and description area, and an optional action
 * row.
 */
export function Dialog(props: DialogProps): JSX.Element;

export type DialogCloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";
export type DialogRequirement = React.ReactNode | { label: React.ReactNode; complete?: boolean };

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  requirements?: DialogRequirement[];
  children?: React.ReactNode;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  dismissible?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKeyDown?: boolean;
  onClose?: (event: React.SyntheticEvent | KeyboardEvent, reason: DialogCloseReason) => void;
  backdropStyle?: React.CSSProperties;
  paperStyle?: React.CSSProperties;
}