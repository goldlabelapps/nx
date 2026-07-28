import React from "react";
import { DemoTooltip } from "../../../components/feedback/DemoTooltip.jsx";

const meta = {
	title: "Feedback/DemoTooltip",
	component: DemoTooltip,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Guided demo callout bubble used for in-flow coaching prompts and walkthrough hints.",
			},
		},
	},
	argTypes: {
		text: { control: "text" },
		align: {
			control: { type: "inline-radio" },
			options: ["left", "center", "right"],
		},
		tail: {
			control: { type: "inline-radio" },
			options: ["bottom-center", "bottom-right", "top-center"],
		},
		tone: {
			control: { type: "inline-radio" },
			options: ["clay", "frost"],
		},
		icon: { control: false },
		bubbleStyle: { control: false },
	},
};

export default meta;

export const Default = {
	args: {
		text: "Now choose Ellie's cleanser to begin the routine.",
		align: "center",
		tail: "bottom-center",
		tone: "clay",
	},
};

export const PointingUp = {
	args: {
		text: "This hint sits below the target with an upward tail.",
		tail: "top-center",
		align: "center",
		tone: "clay",
	},
};

export const FrostVariant = {
	args: {
		text: "Use the frosted tone for lighter overlays and preview states.",
		tail: "bottom-right",
		align: "right",
		tone: "frost",
		icon: <span aria-hidden="true">i</span>,
	},
	render: (args) => (
		<div style={{ width: "min(560px, 92vw)", padding: 16, background: "linear-gradient(180deg, #ece8df 0%, #dfd7c9 100%)", borderRadius: 16 }}>
			<DemoTooltip {...args} />
		</div>
	),
};