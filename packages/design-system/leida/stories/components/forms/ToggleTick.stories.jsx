import React from "react";
import { ToggleTick } from "../../../components/forms/ToggleTick.jsx";

const meta = {
	title: "Forms/ToggleTick",
	component: ToggleTick,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Circular tick selector for product/routine pickers. Works in controlled and uncontrolled modes.",
			},
		},
	},
	argTypes: {
		checked: { control: "boolean" },
		defaultChecked: { control: "boolean" },
		size: {
			control: { type: "inline-radio" },
			options: ["sm", "md", "lg"],
		},
		disabled: { control: "boolean" },
		onChange: { control: false },
	},
};

export default meta;

export const Default = {
	args: {
		defaultChecked: false,
		size: "md",
		"aria-label": "Select this product",
	},
};

export const Checked = {
	args: {
		defaultChecked: true,
		size: "md",
		"aria-label": "Select this product",
	},
};

export const Sizes = {
	render: () => (
		<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
			<ToggleTick size="sm" defaultChecked aria-label="Small selected" />
			<ToggleTick size="md" defaultChecked aria-label="Medium selected" />
			<ToggleTick size="lg" defaultChecked aria-label="Large selected" />
		</div>
	),
};

export const Controlled = {
	render: function Render(args) {
		const [checked, setChecked] = React.useState(false);
		return (
			<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
				<ToggleTick {...args} checked={checked} onChange={(next) => setChecked(next)} />
				<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
					{checked ? "Selected" : "Not selected"}
				</span>
			</div>
		);
	},
	args: {
		size: "md",
		"aria-label": "Toggle selection",
	},
};