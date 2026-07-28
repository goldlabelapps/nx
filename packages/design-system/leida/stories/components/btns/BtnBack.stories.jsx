import React from "react";
import { BtnBack } from "../../../components/btns/BtnBack.jsx";

const meta = {
  title: "Btns/BtnBack",
  component: BtnBack,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Ghost back-action CTA that mirrors the home route helper CTA style. Pair with router.back() in app code.",
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
    children: "Back",
  },
};

export const CustomLabel = {
  args: {
    children: "Go Back",
  },
};

export const Disabled = {
  args: {
    children: "Back",
    disabled: true,
  },
};
