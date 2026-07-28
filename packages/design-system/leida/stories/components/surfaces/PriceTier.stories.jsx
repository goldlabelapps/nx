import React from "react";
import { PriceTier } from "../../../components/surfaces/PriceTier.jsx";
import { samplePricingFeaturesFeatured, samplePricingFeaturesStarter } from "../../fixtures.jsx";
import { fn } from "storybook/test";

const meta = {
  title: "Surfaces/PriceTier",
  component: PriceTier,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Membership pricing tier with badge, price, cadence, feature list, and CTA.",
      },
    },
  },
  argTypes: {
    name: { control: "text" },
    price: { control: "text" },
    cadence: { control: "text" },
    description: { control: "text" },
    features: { control: false },
    cta: { control: "text" },
    badge: { control: "text" },
    featured: { control: "boolean" },
    onCta: { control: false },
  },
};

export default meta;

export const Starter = {
  args: {
    name: "Starter",
    price: "£39",
    cadence: "/month",
    description: "A lean plan for small clinics that want the core design-system and living pages.",
    features: samplePricingFeaturesStarter,
    cta: "Choose Starter",
    onCta: fn(),
  },
};

export const Featured = {
  args: {
    name: "Studio",
    price: "£79",
    cadence: "/month",
    description: "The featured tier with branded landing pages, shared tokens, and priority setup help.",
    features: samplePricingFeaturesFeatured,
    cta: "Choose Studio",
    badge: "Most popular",
    featured: true,
    onCta: fn(),
  },
};