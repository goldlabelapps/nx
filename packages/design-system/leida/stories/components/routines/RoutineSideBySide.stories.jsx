import React from "react";
import { RoutineSideBySide } from "../../../components/routines/RoutineSideBySide.jsx";
import { FauxArtwork } from "../../fixtures.jsx";

const STEPS = [
  {
    stage: "Cleanse",
    morning: { id: "am-cleanser", name: "Cicaplast B5 Cleanser", shortName: "Cicaplast", image: <FauxArtwork label="AM Cleanser" subtitle="Step 1" /> },
    evening: { id: "pm-cleanser", name: "Cicaplast B5 Cleanser", shortName: "Cicaplast", image: <FauxArtwork label="PM Cleanser" subtitle="Step 1" /> },
  },
  {
    stage: "Treat",
    morning: { id: "am-vitc", name: "Vitamin C Tetra Serum", shortName: "Vitamin C", image: <FauxArtwork label="AM Vitamin C" subtitle="Step 2" /> },
    evening: { id: "pm-peptide", name: "6 Peptide Booster", shortName: "Peptide", image: <FauxArtwork label="PM Peptide" subtitle="Step 2" /> },
  },
  {
    stage: "Moisturise",
    morning: { id: "am-moist", name: "Total Moisture Daily Cream", shortName: "Moisturiser", image: <FauxArtwork label="AM Moisturiser" subtitle="Step 3" /> },
    evening: { id: "pm-moist", name: "Total Moisture Daily Cream", shortName: "Moisturiser", image: <FauxArtwork label="PM Moisturiser" subtitle="Step 3" /> },
  },
  {
    stage: "Protect",
    morning: { id: "am-spf", name: "Relief Sun SPF50+", shortName: "SPF", image: <FauxArtwork label="AM SPF" subtitle="Step 4" /> },
    evening: null,
  },
];

const meta = {
  title: "Routines/RoutineSideBySide",
  component: RoutineSideBySide,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "At-a-glance AM/PM routine comparison with aligned steps and center progression markers.",
      },
    },
  },
  argTypes: {
    steps: { control: false },
    morningIcon: { control: false },
    eveningIcon: { control: false },
  },
};

export default meta;

export const Default = {
  args: {
    title: "Morning & evening, side by side",
    steps: STEPS,
    style: { width: "min(100vw - 40px, 720px)" },
  },
};

export const Compact = {
  args: {
    title: "Routine overview",
    steps: STEPS.slice(0, 3),
    style: { width: "min(100vw - 40px, 560px)" },
  },
};