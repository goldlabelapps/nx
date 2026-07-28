import React from "react";
import { RangeSlider } from "../../../components/forms/RangeSlider.jsx";

const meta = {
  title: "Forms/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Hairline range control for live calculators and adjustable pricing flows.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    formatValue: { control: false },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Weekly appointments",
    value: 28,
    min: 0,
    max: 100,
  },
};

export const Currency = {
  args: {
    label: "Monthly budget",
    value: 45,
    min: 0,
    max: 100,
    formatValue: (value) => `£${value * 10}`,
  },
};