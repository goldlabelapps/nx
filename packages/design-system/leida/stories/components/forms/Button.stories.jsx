import React from "react";
import { Button } from "../../../components/forms/Button.jsx";

const Arrow = () => <span aria-hidden="true">→</span>;

const meta = {
  title: "Forms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Mono-caps pill button with primary, ghost, and quiet variants plus size and block modes.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: { type: "inline-radio" },
      options: ["primary", "ghost", "quiet"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md"],
    },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
    as: {
      control: { type: "inline-radio" },
      options: ["button", "a"],
    },
    icon: { control: false },
  },
};

export default meta;

export const Primary = {
  args: {
    children: "Book now",
    variant: "primary",
    size: "md",
    icon: <Arrow />,
  },
};

export const Ghost = {
  args: {
    children: "See details",
    variant: "ghost",
    size: "md",
  },
};

export const Quiet = {
  args: {
    children: "Save draft",
    variant: "quiet",
    size: "sm",
  },
};

export const Block = {
  render: (args) => (
    <div style={{ width: "min(360px, 100vw)" }}>
      <Button {...args} />
    </div>
  ),
  args: {
    children: "Continue",
    variant: "primary",
    block: true,
  },
};

export const Disabled = {
  args: {
    children: "Unavailable",
    variant: "quiet",
    disabled: true,
  },
};

export const LinkButton = {
  args: {
    as: "a",
    href: "#",
    children: "Open page",
    variant: "ghost",
  },
};