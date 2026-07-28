import React from "react";
import { TopBar } from "../../../components/navigation/TopBar.jsx";
import { sampleBrandLinks } from "../../fixtures.jsx";
import { fn } from "storybook/test";

const meta = {
  title: "Navigation/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Sticky frosted top bar with logo, mono caps links, and a primary CTA.",
      },
    },
  },
  argTypes: {
    links: { control: false },
    cta: { control: "text" },
    onCta: { control: false },
    logoHeight: { control: { type: "range", min: 20, max: 60, step: 1 } },
  },
};

export default meta;

export const Default = {
  args: {
    links: sampleBrandLinks,
    cta: "Start now",
    onCta: fn(),
    logoHeight: 30,
  },
  render: (args) => (
    <div style={{ minHeight: "70vh", background: "linear-gradient(180deg, rgba(168,146,122,0.10), transparent 36%), var(--surface-page)" }}>
      <TopBar {...args} />
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ maxWidth: "56ch", fontSize: "1.15rem", lineHeight: 1.65 }}>
          The top bar should feel like it belongs to a calm, editorial landing page. This story gives it the kind of space it has in the app.
        </p>
      </div>
    </div>
  ),
};