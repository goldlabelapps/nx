import React from "react";

const SIZES = {
	sm: { padding: "7px 12px", fontSize: "0.85rem" },
	md: { padding: "10px 18px", fontSize: "0.95rem" },
};

const OFF_STYLE = {
	background: "rgba(255,255,255,0.4)",
	color: "var(--leida-ink)",
	border: "1px solid var(--leida-line)",
	backdropFilter: "var(--blur-chip)",
	WebkitBackdropFilter: "var(--blur-chip)",
};

const ON_STYLE = {
	background: "var(--leida-ink)",
	color: "var(--leida-parchment)",
	border: "1px solid transparent",
	boxShadow: "var(--shadow-button)",
};

/**
 * A pill toggle button. Click once to turn on, click again to turn off.
 */
export function Toggle({
	children,
	defaultPressed = false,
	pressed,
	onChange,
	size = "md",
	block = false,
	disabled = false,
	style,
	...rest
}) {
	const [internalPressed, setInternalPressed] = React.useState(Boolean(defaultPressed));
	const [hover, setHover] = React.useState(false);
	const isControlled = pressed !== undefined;
	const isOn = isControlled ? pressed : internalPressed;
	const s = SIZES[size] || SIZES.md;
	const baseStyle = isOn ? ON_STYLE : OFF_STYLE;
	const lift = hover && !disabled
		? {
			transform: "translateY(-2px)",
			boxShadow: isOn ? "var(--shadow-button-hi)" : "var(--shadow-card)",
		}
		: null;

	return (
		<button
			type="button"
			aria-pressed={isOn}
			disabled={disabled}
			onClick={() => {
				if (!isControlled) {
					setInternalPressed((current) => !current);
				}
				onChange?.(!isOn);
			}}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				display: block ? "flex" : "inline-flex",
				width: block ? "100%" : undefined,
				alignItems: "center",
				justifyContent: "center",
				gap: "9px",
				fontFamily: "var(--font-mono)",
				letterSpacing: "var(--track-button)",
				textTransform: "uppercase",
				borderRadius: "var(--radius-pill)",
				textDecoration: "none",
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.45 : 1,
				transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)",
				...baseStyle,
				...s,
				...lift,
				...style,
			}}
			{...rest}
		>
			{children}
		</button>
	);
}