import React from "react";
import { Button } from "../forms/Button.jsx";

const DEFAULT_LABEL = "New";
const DEFAULT_ICON = <span aria-hidden="true">+</span>;

/**
 * Generic "new" CTA skin for creating entities like clients, products, or routines.
 */
export function BtnNew({ label = DEFAULT_LABEL, ...props }) {
  return (
    <Button icon={DEFAULT_ICON} {...props} variant="primary" size="md">
      {label}
    </Button>
  );
}