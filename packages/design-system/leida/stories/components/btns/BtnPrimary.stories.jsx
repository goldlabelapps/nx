import React from "react";
import { BtnPrimary } from "../../../components/btns/BtnPrimary.jsx";

const meta = {
  title: "Btns/BtnPrimary",
  component: BtnPrimary,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Generic primary CTA skin with a built-in leading plus icon and children-based label.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Create Client",
  },
};

export const Routine = {
  args: {
    children: "Create Routine",
  },
};

export const Disabled = {
  args: {
    children: "Create Client",
    disabled: true,
  },
};
