import React from "react";

const ALIGN_MAP = {
	left: "flex-start",
	center: "center",
	right: "flex-end",
};

const TAIL_MAP = {
	"bottom-center": { bottom: -7, left: "50%", marginLeft: -7 },
	"bottom-right": { bottom: -7, right: 32 },
	"top-center": { top: -7, left: "50%", marginLeft: -7 },
};

const TONE_MAP = {
	clay: {
		background: "var(--leida-clay)",
		color: "var(--leida-parchment)",
		border: "1px solid rgba(255,255,255,0.16)",
	},
	frost: {
		background: "rgba(255,255,255,0.82)",
		color: "var(--leida-ink)",
		border: "1px solid rgba(255,255,255,0.86)",
	},
};

/**
 * Guided demo callout bubble with an optional icon and directional tail.
 */
export function DemoTooltip({
	text,
	children,
	align = "center",
	tail = "bottom-center",
	tone = "clay",
	icon = "✦",
	maxWidth = "34rem",
	style,
	bubbleStyle,
	...rest
}) {
	const content = children || text;
	const resolvedAlign = ALIGN_MAP[align] || ALIGN_MAP.center;
	const tailPosition = TAIL_MAP[tail] || TAIL_MAP["bottom-center"];
	const toneStyle = TONE_MAP[tone] || TONE_MAP.clay;

	return (
		<div
			style={{
				display: "flex",
				justifyContent: resolvedAlign,
				padding: tail === "top-center" ? "10px 0 0" : "0 0 10px",
				...style,
			}}
			{...rest}
		>
			<div
				style={{
					position: "relative",
					display: "inline-flex",
					alignItems: "center",
					gap: "10px",
					padding: "8px 12px",
					borderRadius: "12px",
					fontFamily: "var(--font-serif)",
					fontSize: "0.95rem",
					lineHeight: 1.45,
					maxWidth,
					boxShadow: "0 8px 20px rgba(40,34,28,0.16)",
					...toneStyle,
					...bubbleStyle,
				}}
			>
				{icon ? (
					<span aria-hidden="true" style={{ display: "inline-flex", lineHeight: 1, flexShrink: 0 }}>
						{icon}
					</span>
				) : null}
				{content}
				<span
					aria-hidden="true"
					style={{
						position: "absolute",
						width: 14,
						height: 14,
						background: toneStyle.background,
						borderRight: toneStyle.border,
						borderBottom: toneStyle.border,
						transform: "rotate(45deg)",
						...tailPosition,
					}}
				/>
			</div>
		</div>
	);
}