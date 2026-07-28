import React from "react";
import { ButtonProps } from "../forms/Button";

/**
 * Generic "new" CTA skin for creating entities like clients, products, or routines.
 */
export declare function BtnNew(props: BtnNewProps): JSX.Element;

export interface BtnNewProps extends Omit<ButtonProps, "children" | "variant" | "size"> {
  /** Button label. @default "New" */
  label?: React.ReactNode;
  /** Leading icon. @default <span aria-hidden="true">+</span> */
  icon?: React.ReactNode;
}