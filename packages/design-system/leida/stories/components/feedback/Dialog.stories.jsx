import React from "react";
import { Button } from "../../../components/forms/Button.jsx";
import { Dialog } from "../../../components/feedback/Dialog.jsx";

const meta = {
  title: "Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Leida's replacement for MUI Dialog. Controlled, centered, and built for confirmation or focused tasks.",
      },
    },
  },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    children: { control: "text" },
    actions: { control: false },
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg", "xl"],
    },
    dismissible: { control: "boolean" },
    closeOnBackdropClick: { control: "boolean" },
    closeOnEscapeKeyDown: { control: "boolean" },
    onClose: { control: false },
  },
};

export default meta;

export const Default = {
  args: {
    open: true,
    title: "Delete client note?",
    description: "This action cannot be undone once the note is removed from the timeline.",
    size: "md",
    dismissible: true,
    children: "A dialog body can hold longer copy, form fields, or any custom layout.",
    actions: (
      <>
        <Button variant="quiet">Cancel</Button>
        <Button variant="primary">Delete note</Button>
      </>
    ),
  },
};

export const Large = {
  args: {
    open: true,
    title: "Session details",
    description: "Use a wider dialog when the content needs more breathing room.",
    size: "xl",
    dismissible: true,
    children: "This variant is useful for forms or multi-section review screens.",
    actions: (
      <>
        <Button variant="quiet">Back</Button>
        <Button variant="secondary">Save draft</Button>
      </>
    ),
  },
};

export const ControlledDismiss = {
  render: function Render(args) {
    const [open, setOpen] = React.useState(args.open);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={(event, reason) => {
            if (reason === "closeButtonClick" || reason === "backdropClick" || reason === "escapeKeyDown") {
              setOpen(false);
            }
            args.onClose?.(event, reason);
          }}
        />
      </>
    );
  },
  args: {
    open: false,
    title: "Review changes",
    description: "This story demonstrates the close button, backdrop click, and escape key behavior.",
    size: "md",
    dismissible: true,
    children: "Dismissed by parent state, like a real MUI Dialog replacement.",
    actions: (
      <>
        <Button variant="quiet">Cancel</Button>
        <Button variant="secondary">Continue</Button>
      </>
    ),
  },
};

export const RequirementsChecklist = {
  args: {
    open: true,
    title: "Launch checklist",
    description: "Complete each requirement before publishing this routine.",
    size: "md",
    dismissible: true,
    requirements: [
      { label: "Brand voice approved", complete: true },
      { label: "Before and after photos uploaded", complete: true },
      { label: "Client consent added", complete: false },
      { label: "Follow-up reminder scheduled", complete: false },
    ],
    children: "Outstanding requirements are shown with open circles and completed steps use tick marks.",
    actions: (
      <>
        <Button variant="quiet">Back</Button>
        <Button variant="secondary">Save draft</Button>
      </>
    ),
  },
};