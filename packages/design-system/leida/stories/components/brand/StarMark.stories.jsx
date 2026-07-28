import React from "react";
import { StarMark } from "../../../components/brand/StarMark.jsx";

const meta = {
  title: "Brand/StarMark",
  component: StarMark,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "The standalone sparkle icon used for app accents, favicons, quiet separators, and compact brand moments.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "range", min: 12, max: 120, step: 1 },
    },
    tone: {
      control: { type: "inline-radio" },
      options: ["ink", "dusty", "clay", "offwhite", "current"],
    },
    title: {
      control: "text",
      description: "Optional accessible title. Leave blank for decorative use.",
    },
  },
};

export default meta;

export const Default = {
  args: {
    size: 40,
    tone: "ink",
  },
};

export const Accent = {
  args: {
    size: 56,
    tone: "clay",
    title: "Leida sparkle mark",
  },
};

export const Inverse = {
  args: {
    size: 44,
    tone: "current",
  },
  render: (args) => (
    <div style={{ padding: "28px", borderRadius: "var(--radius-xl)", background: "var(--leida-ink)", color: "var(--leida-parchment)" }}>
      <StarMark {...args} />
    </div>
  ),
};