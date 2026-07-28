import React from "react";

/** A pill toggle button. Click once to turn on, click again to turn off. */
export function Toggle(props: ToggleProps): JSX.Element;

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** Button label. */
	children: React.ReactNode;
	/** Controlled pressed state; omit for uncontrolled. */
	pressed?: boolean;
	/** Initial pressed state when uncontrolled. @default false */
	defaultPressed?: boolean;
	/** Called whenever the toggle changes. */
	onChange?: (pressed: boolean) => void;
	/** Size. @default "md" */
	size?: "sm" | "md";
	/** Stretch to full width. @default false */
	block?: boolean;
	disabled?: boolean;
}