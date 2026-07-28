import React from "react";
import { ButtonProps } from "../forms/Button";

/**
 * Ghost route CTA styled to match the home route helper action.
 */
export declare function BtnRoute(props: BtnRouteProps): JSX.Element;

export interface BtnRouteProps extends Omit<ButtonProps, "children" | "variant" | "size"> {
  /** Button label. @default "Create a routine" */
  children?: React.ReactNode;
  /** Trailing icon shown to the right of the label. @default <span aria-hidden="true">→</span> */
  icon?: React.ReactNode;
}
