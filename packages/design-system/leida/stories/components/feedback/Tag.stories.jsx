import React from "react";
import { Tag } from "../../../components/feedback/Tag.jsx";

const Star = () => <span aria-hidden="true">✦</span>;

const meta = {
  title: "Feedback/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Compact chip for labels, statuses, and floating media overlays. Supports frosted, clay, and outline treatments.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: { type: "inline-radio" },
      options: ["frost", "clay", "outline"],
    },
    icon: { control: false },
  },
};

export default meta;

export const Frost = {
  args: {
    children: "Limited",
    variant: "frost",
  },
};

export const Clay = {
  args: {
    children: "New",
    variant: "clay",
  },
};

export const OutlineWithIcon = {
  args: {
    children: "Sample",
    variant: "outline",
    icon: <Star />,
  },
};