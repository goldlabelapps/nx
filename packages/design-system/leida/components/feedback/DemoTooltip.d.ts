import React from "react";

/** Guided demo callout bubble with an optional icon and directional tail. */
export function DemoTooltip(props: DemoTooltipProps): JSX.Element;

export type DemoTooltipAlign = "left" | "center" | "right";
export type DemoTooltipTail = "bottom-center" | "bottom-right" | "top-center";
export type DemoTooltipTone = "clay" | "frost";

export interface DemoTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
	text?: React.ReactNode;
	children?: React.ReactNode;
	align?: DemoTooltipAlign;
	tail?: DemoTooltipTail;
	tone?: DemoTooltipTone;
	icon?: React.ReactNode;
	maxWidth?: React.CSSProperties["maxWidth"];
	bubbleStyle?: React.CSSProperties;
}