import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoSection } from "./VideoSection";

describe("VideoSection component", () => {
  it("renders It's Not What You Know video item and video modal", async () => {
    const user = userEvent.setup();
    render(<VideoSection />);

    expect(screen.getAllByText("It's Not What You Know").length).toBeGreaterThan(0);

    const watchBtn = screen.getByText("Watch");
    await user.click(watchBtn);

    expect(screen.getByTestId("video-modal-overlay")).toBeInTheDocument();
    expect(screen.getByTestId("local-video-player")).toHaveAttribute("src", "/mp4/INWYK_trailer.mp4");
  });
});
