import React from "react";
import { BtnRoute } from "../../../components/btns/BtnRoute.jsx";

const meta = {
  title: "Btns/BtnRoute",
  component: BtnRoute,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Ghost route CTA that mirrors the home route 'Create a routine' helper action.",
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
    children: "Create a routine",
  },
};

export const CustomLabel = {
  args: {
    children: "Select products",
  },
};

export const Disabled = {
  args: {
    children: "Create a routine",
    disabled: true,
  },
};
