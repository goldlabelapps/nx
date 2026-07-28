import React from "react";
import { Input } from "../../../components/forms/Input.jsx";

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Rounded text field with optional label, helper text, and error state.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    validationState: {
      control: { type: "inline-radio" },
      options: ["valid", "invalid"],
    },
    id: { control: "text" },
    wrapStyle: { control: false },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Email address",
    placeholder: "hello@leida.co",
    hint: "We only use this to send your living page.",
  },
};

export const ErrorState = {
  args: {
    label: "Phone number",
    placeholder: "+44 7000 000000",
    error: "Please include a valid mobile number.",
    validationState: "invalid",
  },
};

export const ValidState = {
  args: {
    label: "Email address",
    placeholder: "hello@leida.co",
    hint: "Looks good.",
    validationState: "valid",
  },
};

export const InvalidState = {
  args: {
    label: "Email address",
    placeholder: "hello@leida.co",
    error: "Please enter a valid email address.",
    validationState: "invalid",
  },
};

export const Minimal = {
  args: {
    placeholder: "Type here",
  },
};