import React from "react";
import { StatCard } from "../../../components/cards/StatCard.jsx";

const meta = {
  title: "Cards/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Editorial metric card with a large serif figure and supporting copy.",
      },
    },
  },
  argTypes: {
    figure: { control: "text" },
    children: { control: "text" },
    source: { control: "text" },
    variant: {
      control: { type: "inline-radio" },
      options: ["paper", "glass", "tile", "ink"],
    },
  },
};

export default meta;

export const Default = {
  args: {
    figure: "94%",
    children: "of clients said the routine page made their aftercare instructions easier to follow.",
    source: "2026 client survey",
    variant: "paper",
  },
};

export const Inverse = {
  args: {
    figure: "12 min",
    children: "Average time to send a new living page from the founder dashboard.",
    source: "internal timing note",
    variant: "ink",
  },
};