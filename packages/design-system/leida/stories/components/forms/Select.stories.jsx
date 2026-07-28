import React from "react";
import { Select } from "../../../components/forms/Select.jsx";
import { sampleSelectOptions } from "../../fixtures.jsx";

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Rounded select field with a custom indicator, helper text, and error state.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    options: { control: false },
    id: { control: "text" },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Routine time",
    options: sampleSelectOptions,
    defaultValue: "evening",
    hint: "Choose the routine this page should open on.",
  },
};

export const ErrorState = {
  args: {
    label: "Treatment room",
    options: sampleSelectOptions,
    defaultValue: "morning",
    error: "Please pick a room before saving.",
  },
};

export const Disabled = {
  args: {
    label: "Session",
    options: sampleSelectOptions,
    disabled: true,
    defaultValue: "night",
    hint: "Disabled states still preserve the current value.",
  },
};