import React from "react";
import { Button } from "../forms/Button.jsx";

const DEFAULT_LABEL = "Primary";
const DEFAULT_ICON = <span aria-hidden="true">+</span>;

/**
 * Generic primary CTA skin with a leading icon.
 */
export function BtnPrimary({ children = DEFAULT_LABEL, ...props }) {
  return (
    <Button icon={true} {...props} variant="primary" size="md">
      {children}
    </Button>
  );
}
