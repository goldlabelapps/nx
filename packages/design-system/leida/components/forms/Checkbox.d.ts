import React from "react";

/** A frosted checkbox with an inline label, helper text, and error state. */
export function Checkbox(props: CheckboxProps): JSX.Element;

export interface CheckboxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	/** Label shown beside the checkbox. */
	label?: React.ReactNode;
	/** Helper text shown below the field. */
	hint?: React.ReactNode;
	/** Error text shown below the field and used to tint the checkbox. */
	error?: React.ReactNode;
	/** Style for the wrapping column. */
	wrapStyle?: React.CSSProperties;
}