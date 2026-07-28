import React from "react";
import { RoutineProductScroller } from "../../../components/routines/RoutineProductScroller.jsx";
import { FauxArtwork } from "../../fixtures.jsx";

const MORNING_PRODUCTS = [
  {
    id: "cleanser",
    name: "Cicaplast B5 Cleanser",
    brand: "La Roche-Posay",
    price: "GBP 16.50",
    image: <FauxArtwork label="Cleanser" subtitle="Morning step 1" />,
  },
  {
    id: "vitc",
    name: "Vitamin C Tetra Serum",
    brand: "Medik8",
    price: "GBP 35.00",
    tag: "New",
    image: <FauxArtwork label="Vitamin C" subtitle="Morning step 2" />,
  },
  {
    id: "moisturiser",
    name: "Total Moisture Daily Cream",
    brand: "Medik8",
    price: "GBP 48.00",
    image: <FauxArtwork label="Moisturiser" subtitle="Morning step 3" />,
  },
  {
    id: "spf",
    name: "Relief Sun SPF50+",
    brand: "Beauty of Joseon",
    price: "GBP 18.00",
    image: <FauxArtwork label="SPF" subtitle="Morning step 4" />,
  },
];

const EVENING_PRODUCTS = [
  {
    id: "cleanser-pm",
    name: "Cicaplast B5 Cleanser",
    brand: "La Roche-Posay",
    price: "GBP 16.50",
    image: <FauxArtwork label="Cleanser" subtitle="Evening step 1" />,
  },
  {
    id: "peptide",
    name: "6 Peptide Booster",
    brand: "COSRX",
    price: "GBP 27.00",
    tag: "Moved",
    image: <FauxArtwork label="Peptide" subtitle="Evening step 2" />,
  },
  {
    id: "moisturiser-pm",
    name: "Total Moisture Daily Cream",
    brand: "Medik8",
    price: "GBP 48.00",
    image: <FauxArtwork label="Moisturiser" subtitle="Evening step 3" />,
  },
];

const meta = {
  title: "Routines/RoutineProductScroller",
  component: RoutineProductScroller,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Horizontal routine product rail with morning/evening switching, snap scrolling, swipe support on mobile, plus optional arrows and dots.",
      },
    },
  },
  argTypes: {
    morningProducts: { control: false },
    eveningProducts: { control: false },
    onPeriodChange: { control: false },
    period: { control: false },
    defaultPeriod: { control: "radio", options: ["morning", "evening"] },
    showArrows: { control: "boolean" },
    showDots: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: {
    morningProducts: MORNING_PRODUCTS,
    eveningProducts: EVENING_PRODUCTS,
    defaultPeriod: "morning",
    showArrows: true,
    showDots: true,
    style: { width: "min(100vw - 40px, 1100px)" },
  },
};

export const EveningDefault = {
  args: {
    morningProducts: MORNING_PRODUCTS,
    eveningProducts: EVENING_PRODUCTS,
    defaultPeriod: "evening",
    showArrows: true,
    showDots: true,
    style: { width: "min(100vw - 40px, 1100px)" },
  },
};