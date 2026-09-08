import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomCursorWrapper } from "./CustomCursor";

describe("CustomCursorWrapper", () => {
  it("renders children with floating cursor label", () => {
    render(
      <CustomCursorWrapper cursorLabel="Watch intro">
        <div>Video Thumbnail</div>
      </CustomCursorWrapper>
    );

    expect(screen.getByText("Video Thumbnail")).toBeInTheDocument();
    expect(screen.getByText("Watch intro")).toBeInTheDocument();
  });

  it("handles mouse enter, move and leave events", () => {
    const { container } = render(
      <CustomCursorWrapper cursorLabel="Play intro">
        <div>Interactive Area</div>
      </CustomCursorWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseMove(wrapper, { clientX: 100, clientY: 150 });
    fireEvent.mouseLeave(wrapper);
    expect(screen.getByText("Play intro")).toBeInTheDocument();
  });

  it("triggers onClick when clicked", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <CustomCursorWrapper onClick={handleClick}>
        <div>Clickable Area</div>
      </CustomCursorWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    fireEvent.click(wrapper);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
