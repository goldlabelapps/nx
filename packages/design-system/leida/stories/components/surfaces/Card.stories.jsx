import React from "react";
import { Card } from "../../../components/surfaces/Card.jsx";

const meta = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Base rounded surface with paper, glass, tile, and ink variants plus optional hover lift.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: { type: "inline-radio" },
      options: ["paper", "glass", "tile", "ink"],
    },
    padding: { control: "text" },
    hoverLift: { control: "boolean" },
  },
};

export default meta;

export const Paper = {
  args: {
    children: "Default paper card",
    variant: "paper",
    padding: "md",
  },
};

export const Glass = {
  args: {
    children: "Frosted panel over texture",
    variant: "glass",
    padding: "lg",
  },
};

export const TileHover = {
  args: {
    children: "Hover the tile card to see the lift effect",
    variant: "tile",
    padding: "lg",
    hoverLift: true,
  },
};

export const Inverse = {
  args: {
    children: "Inverse ink surface",
    variant: "ink",
    padding: "lg",
  },
};