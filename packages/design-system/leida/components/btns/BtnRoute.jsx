import React from "react";
import { Button } from "../forms/Button.jsx";

const DEFAULT_LABEL = "Create a routine";
const DEFAULT_ICON = <span aria-hidden="true">→</span>;

/**
 * Ghost route CTA styled to match the home route helper action.
 * Pass onClick or render as a link via `as="a"` and `href`.
 */
export function BtnRoute({ children = DEFAULT_LABEL, icon = DEFAULT_ICON, ...props }) {
  return (
    <Button {...props} variant="ghost" size="md">
      {children}
      {icon}
    </Button>
  );
}
