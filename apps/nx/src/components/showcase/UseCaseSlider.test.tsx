import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UseCaseSlider } from "./UseCaseSlider";

describe("UseCaseSlider component (re-exports VideoSection)", () => {
  it("renders It's Not What You Know video walkthrough", () => {
    render(<UseCaseSlider />);
    expect(screen.getAllByText("It's Not What You Know").length).toBeGreaterThan(0);
  });

  it("navigates slider with previous and next buttons", async () => {
    const user = userEvent.setup();
    render(<UseCaseSlider />);

    const nextBtn = screen.getByLabelText(/next video/i);
    await user.click(nextBtn);

    const prevBtn = screen.getByLabelText(/previous video/i);
    await user.click(prevBtn);
  });

  it("renders video features and action buttons", () => {
    render(<UseCaseSlider />);
    expect(screen.getByText("Watch")).toBeInTheDocument();
  });
});
