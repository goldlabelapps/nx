import React from "react";
import { StepIndicator } from "../../../components/feedback/StepIndicator.jsx";

const baseSteps = [
  { label: "Consult" },
  { label: "Plan" },
  { label: "Checkout" },
];

const meta = {
  title: "Feedback/StepIndicator",
  component: StepIndicator,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Horizontal step progress with numbered or custom markers and optional labels underneath.",
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: "inline-radio" },
      options: [0, 1, 2],
    },
    steps: { control: false },
    lineStyle: { control: false },
  },
};

export default meta;

export const Default = {
  args: {
    currentStep: 1,
    steps: baseSteps,
  },
};

export const WithoutLabels = {
  args: {
    currentStep: 2,
    steps: [{}, {}, {}],
  },
};

export const CustomIndicators = {
  args: {
    currentStep: 1,
    steps: [
      { label: "Skin quiz", indicator: "A" },
      { label: "Results", indicator: "B" },
      { label: "Routine", indicator: "C" },
    ],
  },
};