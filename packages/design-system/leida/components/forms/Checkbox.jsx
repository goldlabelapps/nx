import React from "react";

const HELPER_TEXT_STYLE = {
	fontFamily: "var(--font-mono)",
	fontSize: "0.78rem",
	letterSpacing: "0.04em",
	paddingLeft: "34px",
};

const INPUT_VERTICAL_MARGIN = "12px";
const BOX_SIZE = "22px";

/**
 * A frosted checkbox with an inline label, helper text, and error state.
 */
export function Checkbox({
	label,
	hint,
	error,
	id,
	style,
	wrapStyle,
	defaultChecked = false,
	checked,
	onChange,
	onFocus,
	onBlur,
	...rest
}) {
	const autoId = React.useId();
	const checkboxId = id || autoId;
	const [internalChecked, setInternalChecked] = React.useState(Boolean(defaultChecked));
	const [isFocused, setIsFocused] = React.useState(false);
	const [isHovered, setIsHovered] = React.useState(false);
	const isControlled = checked !== undefined;
	const currentChecked = isControlled ? checked : internalChecked;
	const isDisabled = Boolean(rest.disabled);
	const borderColor = error ? "#c03b2b" : "var(--border-input)";
	const helperColor = error ? "#c03b2b" : "var(--leida-muted)";
	const boxBackground = currentChecked
		? "linear-gradient(180deg, rgba(40, 34, 28, 0.98), rgba(23, 19, 16, 0.98))"
		: isDisabled
			? "var(--surface-input-disabled)"
			: isHovered || isFocused
				? "var(--surface-input-hover)"
				: "var(--surface-input)";
	const boxShadow = currentChecked
		? "var(--shadow-glass)"
		: isFocused
			? "0 0 0 4px rgba(168, 146, 122, 0.24), inset 0 1px 0 rgba(255,255,255,0.72)"
			: "inset 0 1px 0 rgba(255,255,255,0.62)";

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBlock: INPUT_VERTICAL_MARGIN, ...wrapStyle }}>
			<label
				htmlFor={checkboxId}
				style={{
					position: "relative",
					display: "inline-flex",
					alignItems: "flex-start",
					gap: "12px",
					cursor: isDisabled ? "not-allowed" : "pointer",
					opacity: isDisabled ? 0.84 : 1,
					userSelect: "none",
					fontFamily: "var(--font-sans)",
					color: "var(--leida-ink)",
					...style,
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<span
					aria-hidden="true"
					style={{
						position: "relative",
						flex: "0 0 auto",
						width: BOX_SIZE,
						height: BOX_SIZE,
						borderRadius: "8px",
						border: `1px solid ${isFocused ? "var(--border-input-focus)" : borderColor}`,
						background: boxBackground,
						boxShadow,
						transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast), border-color var(--dur-fast), background-color var(--dur-fast)",
						transform: isHovered && !isDisabled ? "translateY(-1px)" : "none",
					}}
				>
					{currentChecked ? (
						<span
							aria-hidden="true"
							style={{
								position: "absolute",
								left: "50%",
								top: "50%",
								transform: "translate(-50%, -57%) rotate(-45deg)",
								width: "10px",
								height: "5px",
								borderLeft: "2px solid var(--leida-parchment)",
								borderBottom: "2px solid var(--leida-parchment)",
							}}
						/>
					) : null}
				</span>
				<span style={{ paddingTop: "1px" }}>
					{label ? (
						<span
							style={{
								display: "block",
								fontFamily: "var(--font-mono)",
								fontSize: "0.76rem",
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								lineHeight: 1.4,
							}}
						>
							{label}
						</span>
					) : null}
				</span>
				<input
					id={checkboxId}
					type="checkbox"
					checked={isControlled ? checked : undefined}
					defaultChecked={isControlled ? undefined : defaultChecked}
					aria-invalid={error ? true : undefined}
					style={{
						position: "absolute",
						width: "1px",
						height: "1px",
						padding: 0,
						margin: "-1px",
						overflow: "hidden",
						clip: "rect(0, 0, 0, 0)",
						whiteSpace: "nowrap",
						border: 0,
						pointerEvents: "none",
					}}
					onFocus={(event) => {
						setIsFocused(true);
						onFocus?.(event);
					}}
					onBlur={(event) => {
						setIsFocused(false);
						onBlur?.(event);
					}}
					onChange={(event) => {
						if (!isControlled) {
							setInternalChecked(event.target.checked);
						}
						onChange?.(event);
					}}
					{...rest}
				/>
			</label>
			{hint || error ? (
				<span
					style={{
						...HELPER_TEXT_STYLE,
						color: helperColor,
					}}
				>
					{error || hint}
				</span>
			) : null}
		</div>
	);
}