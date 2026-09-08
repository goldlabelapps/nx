import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { ParticleCanvas } from "./ParticleCanvas";

describe("ParticleCanvas component", () => {
  it("renders HTML5 canvas element and executes particle animation loop", () => {
    let frameCb: FrameRequestCallback | null = null;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      frameCb = cb;
      return 1;
    });

    const { container } = render(<ParticleCanvas />);
    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();

    // Trigger animation frame loop with particles
    if (frameCb) {
      act(() => {
        (frameCb as unknown as FrameRequestCallback)(performance.now());
      });
    }

    // Trigger window events with mouse position to test interaction logic
    fireEvent.resize(window);
    fireEvent.mouseMove(window, { clientX: 200, clientY: 300 });

    if (frameCb) {
      act(() => {
        (frameCb as unknown as FrameRequestCallback)(performance.now());
      });
    }

    fireEvent.mouseLeave(document);
  });
});
