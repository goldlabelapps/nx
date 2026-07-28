import React from "react";
import { BottomNav } from "../../../components/navigation/BottomNav.jsx";
import { sampleBottomNavItems } from "../../fixtures.jsx";
import { fn } from "storybook/test";

const meta = {
  title: "Navigation/BottomNav",
  component: BottomNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Fixed bottom navigation with icon-plus-label items and a frosted surface.",
      },
    },
  },
  argTypes: {
    items: { control: false },
    value: { control: false },
    onChange: { control: false },
    onNavigate: { control: false },
    ariaLabel: { control: "text" },
  },
};

export default meta;

export const Default = {
  args: {
    items: sampleBottomNavItems,
    value: "routine",
    onChange: fn(),
    onNavigate: fn(),
  },
  render: (args) => (
    <div style={{ minHeight: "100vh", paddingBottom: "120px", background: "linear-gradient(180deg, rgba(168,146,122,0.10), transparent 40%), var(--surface-page)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 160px", lineHeight: 1.7 }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "2.4rem", margin: "0 0 12px" }}>Living page</h2>
        <p>
          The bottom nav needs vertical space because it is fixed to the viewport. This story leaves enough room to see the control in context.
        </p>
      </div>
      <BottomNav {...args} />
    </div>
  ),
};