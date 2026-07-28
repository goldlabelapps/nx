import React from "react";
import { Toggle } from "../../../components/forms/Toggle.jsx";

const meta = {
	title: "Forms/Toggle",
	component: Toggle,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A button-style toggle that switches between neutral and primary states when pressed.",
			},
		},
	},
	argTypes: {
		children: { control: "text" },
		pressed: { control: "boolean" },
		defaultPressed: { control: "boolean" },
		size: {
			control: { type: "inline-radio" },
			options: ["sm", "md"],
		},
		block: { control: "boolean" },
		disabled: { control: "boolean" },
		onChange: { control: false },
	},
};

export default meta;

export const Default = {
	args: {
		children: "Enable reminders",
		defaultPressed: false,
	},
};

export const On = {
	args: {
		children: "Enable reminders",
		defaultPressed: true,
	},
};

export const Block = {
	args: {
		children: "Save preferences",
		block: true,
		defaultPressed: false,
	},
	render: (args) => (
		<div style={{ width: "min(360px, 100vw)" }}>
			<Toggle {...args} />
		</div>
	),
};

export const Disabled = {
	args: {
		children: "Unavailable",
		defaultPressed: false,
		disabled: true,
	},
};