import React from "react";
import { Button } from "../forms/Button.jsx";

const DEFAULT_LABEL = "Back";
const DEFAULT_ICON = <span aria-hidden="true">←</span>;

/**
 * Ghost back-action CTA styled to match home route helper actions.
 * Pass an onClick handler like () => router.back() from the consuming app.
 */
export function BtnBack({ children = DEFAULT_LABEL, icon = DEFAULT_ICON, ...props }) {
  return (
    <Button icon={icon} {...props} variant="ghost" size="md">
      {children}
    </Button>
  );
}
