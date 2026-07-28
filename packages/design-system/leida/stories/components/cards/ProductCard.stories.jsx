import React from "react";
import { ProductCard } from "../../../components/cards/ProductCard.jsx";
import { FauxArtwork } from "../../fixtures.jsx";
import { fn } from "storybook/test";

const meta = {
  title: "Cards/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Aftercare product card with image, serif product name, brand line, price, optional tag, and optional quiet buy action.",
      },
    },
  },
  argTypes: {
    image: { control: false },
    href: { control: "text" },
    name: { control: "text" },
    brand: { control: "text" },
    price: { control: "text" },
    tag: { control: "text" },
    showBuyButton: { control: "boolean" },
    buyLabel: { control: "text" },
    onBuy: { control: false },
    onClick: { action: "card-clicked" },
  },
};

export default meta;

export const WithArtwork = {
  args: {
    image: <FauxArtwork label="Vitamin C15" subtitle="Brightening serum" />,
    name: "Vitamin C15",
    brand: "Medik8",
    price: "£38",
    tag: "New",
    href: "/products/vitamin-c15",
    showBuyButton: true,
    buyLabel: "Buy",
    onBuy: fn(),
  },
};

export const PlaceholderImage = {
  args: {
    name: "Gentle Cleanser",
    brand: "Mesoestetic",
    price: "£24",
    tag: "Routine",
  },
};