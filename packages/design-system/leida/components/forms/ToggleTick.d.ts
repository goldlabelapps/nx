import React from "react";

/** A circular, press-to-toggle tick control for routine/product selection. */
export function ToggleTick(props: ToggleTickProps): JSX.Element;

export type ToggleTickSize = "sm" | "md" | "lg";

export interface ToggleTickProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
	checked?: boolean;
	defaultChecked?: boolean;
	size?: ToggleTickSize;
	onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
}