import React from "react";
import { Checkbox } from "../../../components/forms/Checkbox.jsx";

const meta = {
	title: "Forms/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Frosted checkbox control with an inline label, helper text, and error state.",
			},
		},
	},
	argTypes: {
		label: { control: "text" },
		hint: { control: "text" },
		error: { control: "text" },
		wrapStyle: { control: false },
	},
};

export default meta;

export const Default = {
	args: {
		label: "Send me gentle onboarding updates",
		hint: "A few emails while we set up your account.",
	},
};

export const Checked = {
	args: {
		label: "Save this device",
		defaultChecked: true,
	},
};

export const ErrorState = {
	args: {
		label: "I agree to the terms",
		error: "You need to accept the terms before continuing.",
	},
};

export const Disabled = {
	args: {
		label: "Use my profile photo",
		hint: "Available after verification.",
		disabled: true,
		defaultChecked: true,
	},
};