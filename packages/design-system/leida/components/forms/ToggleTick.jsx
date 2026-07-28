import React from "react";

const SIZE_MAP = {
	sm: 20,
	md: 24,
	lg: 30,
};

const CHECK_SCALE = {
	sm: 0.76,
	md: 1,
	lg: 1.18,
};

/**
 * A circular, press-to-toggle tick control for routine/product selection.
 */
export function ToggleTick({
	checked,
	defaultChecked = false,
	onChange,
	size = "md",
	disabled = false,
	style,
	...rest
}) {
	const [internalChecked, setInternalChecked] = React.useState(Boolean(defaultChecked));
	const [hover, setHover] = React.useState(false);
	const isControlled = checked !== undefined;
	const isOn = isControlled ? checked : internalChecked;
	const pixelSize = SIZE_MAP[size] || SIZE_MAP.md;
	const checkScale = CHECK_SCALE[size] || CHECK_SCALE.md;

	return (
		<button
			type="button"
			aria-pressed={isOn}
			disabled={disabled}
			onClick={(event) => {
				if (disabled) return;
				const next = !isOn;
				if (!isControlled) {
					setInternalChecked(next);
				}
				onChange?.(next, event);
			}}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				width: `${pixelSize}px`,
				height: `${pixelSize}px`,
				borderRadius: "999px",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				border: `1.5px solid ${isOn ? "var(--leida-ink)" : "rgba(168,146,122,0.44)"}`,
				background: isOn ? "var(--leida-ink)" : "rgba(255,255,255,0.5)",
				backdropFilter: isOn ? undefined : "var(--blur-chip)",
				WebkitBackdropFilter: isOn ? undefined : "var(--blur-chip)",
				boxShadow: hover && !disabled
					? "0 6px 14px rgba(40,34,28,0.18)"
					: isOn
						? "0 2px 7px rgba(40,34,28,0.22)"
						: "none",
				transform: hover && !disabled ? "translateY(-1px)" : "none",
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.45 : 1,
				transition: "all var(--dur-fast) var(--ease-out)",
				...style,
			}}
			{...rest}
		>
			{isOn ? (
				<span
					aria-hidden="true"
					style={{
						display: "inline-block",
						width: `${Math.round(10 * checkScale)}px`,
						height: `${Math.round(5 * checkScale)}px`,
						borderLeft: `${Math.max(2, Math.round(2 * checkScale))}px solid var(--leida-parchment)`,
						borderBottom: `${Math.max(2, Math.round(2 * checkScale))}px solid var(--leida-parchment)`,
						transform: "translateY(-1px) rotate(-45deg)",
					}}
				/>
			) : null}
		</button>
	);
}