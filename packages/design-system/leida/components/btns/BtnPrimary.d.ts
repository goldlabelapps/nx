import React from "react";
import { ButtonProps } from "../forms/Button";

/**
 * Generic primary CTA skin with a leading icon.
 */
export declare function BtnPrimary(props: BtnPrimaryProps): JSX.Element;

export interface BtnPrimaryProps extends Omit<ButtonProps, "children" | "icon" | "variant" | "size"> {
  /** Button label. @default "Primary" */
  children?: React.ReactNode;
}
