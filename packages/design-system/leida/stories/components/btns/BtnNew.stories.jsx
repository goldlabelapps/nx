import React from "react";
import { BtnNew } from "../../../components/btns/BtnNew.jsx";

const meta = {
  title: "Btns/BtnNew",
  component: BtnNew,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Generic primary CTA skin for create actions. Pass the label for the specific thing being created.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: {
    label: "New Client",
  },
};

export const Product = {
  args: {
    label: "New Product",
  },
};

export const WithIcon = {
  args: {
    label: "New Routine",
    icon: <span aria-hidden="true">+</span>,
  },
};

export const Disabled = {
  args: {
    label: "New Client",
    disabled: true,
  },
};