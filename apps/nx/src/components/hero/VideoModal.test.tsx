import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoModal } from "./VideoModal";

describe("VideoModal component", () => {
  it("does not render when isOpen is false", () => {
    render(
      <VideoModal
        isOpen={false}
        onClose={vi.fn()}
        videoUrl="https://youtube.com/embed/test"
        title="Test Modal"
      />
    );
    expect(screen.queryByTitle("Test Modal")).not.toBeInTheDocument();
  });

  it("renders iframe when isOpen is true with external URL", () => {
    render(
      <VideoModal
        isOpen={true}
        onClose={vi.fn()}
        videoUrl="https://youtube.com/embed/test"
        title="Test Modal"
      />
    );
    expect(screen.getByTitle("Test Modal")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("renders local html5 video player for local mp4 URLs", () => {
    render(
      <VideoModal
        isOpen={true}
        onClose={vi.fn()}
        videoUrl="/mp4/demo-1.mp4"
        title="Demo Walkthrough"
        orientation="landscape"
      />
    );
    expect(screen.getByTestId("local-video-player")).toHaveAttribute("src", "/mp4/demo-1.mp4");
  });

  it("calls onClose when close button is clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <VideoModal
        isOpen={true}
        onClose={handleClose}
        videoUrl="/mp4/demo-2.mp4"
        title="Test Modal"
      />
    );

    const closeBtn = screen.getByLabelText(/close modal/i);
    await user.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when ESC key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <VideoModal
        isOpen={true}
        onClose={handleClose}
        videoUrl="/mp4/demo-3.mp4"
        title="Test Modal"
        orientation="portrait"
      />
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
