import React from "react";
import { Logo } from "../../../components/brand/Logo.jsx";

const meta = {
  title: "Brand/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Editorial logo mark with a full wordmark variant and a standalone sparkle mark for compact placements.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "inline-radio" },
      options: ["full", "mark"],
    },
    height: {
      control: { type: "range", min: 24, max: 120, step: 1 },
    },
    tone: {
      control: { type: "inline-radio" },
      options: ["ink", "dusty", "offwhite", "current"],
    },
  },
};

export default meta;

export const FullWordmark = {
  args: {
    variant: "full",
    height: 44,
    tone: "ink",
  },
};

export const MarkOnly = {
  args: {
    variant: "mark",
    height: 56,
    tone: "clay",
  },
};

export const Inverse = {
  args: {
    variant: "full",
    height: 44,
    tone: "current",
    style: { color: "var(--leida-parchment)" },
  },
  render: (args) => (
    <div style={{ padding: "28px", borderRadius: "var(--radius-xl)", background: "var(--leida-ink)" }}>
      <Logo {...args} />
    </div>
  ),
};