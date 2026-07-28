import React from "react";

/**
 * A compact alert with four Leida tones: success, info, warning, and error.
 * Alerts always render a close button and auto-close after a short delay.
 */
export function Alert(props: AlertProps): JSX.Element;

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Optional heading or lead-in copy above the body. */
  title?: React.ReactNode;
  /**
   * Visual tone.
   * @default "info"
   */
  severity?: "success" | "info" | "warning" | "error";
  /** @deprecated Close button is always shown; this prop is ignored. */
  dismissible?: boolean;
  /**
   * Auto-close delay in milliseconds.
   * Set to 0 or a negative value to disable auto-close.
   * @default 6000
   */
  autoCloseMs?: number;
  /** Called after the alert is dismissed via close button or auto-close. */
  onDismiss?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}
