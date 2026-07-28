import React from "react";
import { Alert } from "../../../components/feedback/Alert.jsx";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Leida's replacement for MUI Alert. Four tones, no icon, with an optional dismiss action.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    title: { control: "text" },
    severity: {
      control: { type: "inline-radio" },
      options: ["success", "info", "warning", "error"],
    },
    dismissible: { control: "boolean" },
    onDismiss: { control: false },
  },
};

export default meta;

export const Success = {
  args: {
    severity: "success",
    title: "Saved",
    children: "Your changes were saved and are now live.",
  },
};

export const Info = {
  args: {
    severity: "info",
    title: "Heads up",
    children: "This is a helpful note for the current screen.",
  },
};

export const Warning = {
  args: {
    severity: "warning",
    title: "Action needed",
    children: "Please review the form before continuing.",
  },
};

export const Error = {
  args: {
    severity: "error",
    title: "Something went wrong",
    children: "Try again in a moment or check your connection.",
  },
};

export const Dismissible = {
  args: {
    severity: "info",
    title: "Dismiss me",
    children: "Click the close button to hide this alert locally.",
    dismissible: true,
  },
};
