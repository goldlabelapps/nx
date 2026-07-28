import React from "react";
import { Badge } from "../../../components/feedback/Badge.jsx";

const meta = {
  title: "Feedback/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Small mono-caps pill for status, emphasis, and pricing callouts.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    tone: {
      control: { type: "inline-radio" },
      options: ["ink", "clay", "quiet"],
    },
  },
};

export default meta;

export const Ink = {
  args: {
    children: "Most popular",
    tone: "ink",
  },
};

export const Clay = {
  args: {
    children: "New",
    tone: "clay",
  },
};

export const Quiet = {
  args: {
    children: "Guidance",
    tone: "quiet",
  },
};