import React from "react";
import { ButtonProps } from "../forms/Button";

/**
 * Ghost back-action CTA styled to match home route helper actions.
 */
export declare function BtnBack(props: BtnBackProps): JSX.Element;

export interface BtnBackProps extends Omit<ButtonProps, "children" | "variant" | "size"> {
  /** Button label. @default "Back" */
  children?: React.ReactNode;
  /** Leading icon. @default <span aria-hidden="true">←</span> */
  icon?: React.ReactNode;
}
