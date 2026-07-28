import React from "react";
import { Eyebrow } from "../../../components/brand/Eyebrow.jsx";

const meta = {
  title: "Brand/Eyebrow",
  component: Eyebrow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Mono, all-caps eyebrow text for section labels, tags, and quiet editorial cues.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Label text to render inside the eyebrow.",
    },
    tone: {
      control: { type: "inline-radio" },
      options: ["clay", "ink", "muted"],
      description: "Color tone pulled from the shared tokens.",
    },
    as: {
      control: { type: "inline-radio" },
      options: ["block", "inline"],
      description: "Block or inline presentation.",
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Aftercare",
    tone: "clay",
    as: "block",
  },
};

export const Inline = {
  args: {
    children: "Section label",
    tone: "ink",
    as: "inline",
  },
};

export const Muted = {
  args: {
    children: "Quiet context",
    tone: "muted",
  },
};