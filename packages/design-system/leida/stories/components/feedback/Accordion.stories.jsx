import React from "react";
import { Accordion } from "../../../components/feedback/Accordion.jsx";
import { sampleFaqs } from "../../fixtures.jsx";

const meta = {
  title: "Feedback/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Hairline-divided disclosure list for FAQs and other expandable copy blocks.",
      },
    },
  },
  argTypes: {
    items: { control: false },
    allowMultiple: { control: "boolean" },
    summaryStyle: {
      control: { type: "inline-radio" },
      options: ["serif", "mono"],
    },
  },
};

export default meta;

export const SerifFaq = {
  args: {
    items: sampleFaqs,
    summaryStyle: "serif",
    allowMultiple: false,
  },
};

export const MonoMultiOpen = {
  args: {
    items: sampleFaqs,
    summaryStyle: "mono",
    allowMultiple: true,
  },
};