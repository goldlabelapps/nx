import React from "react";
import { ClientCard } from "../../../components/cards/ClientCard.jsx";

const meta = {
  title: "Cards/ClientCard",
  component: ClientCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Compact client card with a split first and last name title.",
      },
    },
  },
  argTypes: {
    firstName: { control: "text" },
    lastName: { control: "text" },
    href: { control: "text" },
    onClick: { action: "card-clicked" },
  },
};

export default meta;

export const Default = {
  args: {
    firstName: "Ellie",
    lastName: "Morrison",
    href: "/clients/ellie-morrison",
  },
};

export const SingleName = {
  args: {
    firstName: "Nadia",
    href: "/clients/nadia",
  },
};