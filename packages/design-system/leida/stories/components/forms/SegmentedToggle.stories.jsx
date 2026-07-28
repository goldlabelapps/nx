import React from "react";
import { SegmentedToggle } from "../../../components/forms/SegmentedToggle.jsx";
import { sampleToggleOptions } from "../../fixtures.jsx";

const meta = {
  title: "Forms/SegmentedToggle",
  component: SegmentedToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Frosted segmented control for small option sets such as morning/evening routines.",
      },
    },
  },
  argTypes: {
    options: { control: false },
    value: { control: false },
    onChange: { control: false },
  },
};

export default meta;

export const Routine = {
  args: {
    options: sampleToggleOptions,
  },
};

export const Controlled = {
  render: (args) => {
    const [value, setValue] = React.useState("evening");
    return <SegmentedToggle {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: sampleToggleOptions,
  },
};