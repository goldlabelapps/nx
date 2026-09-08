import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LogoContextMenu } from "./LogoContextMenu";
import { nxConfig } from "@/lib/nxConfig";

describe("LogoContextMenu", () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });
  });

  it("renders Template logo link", () => {
    render(<LogoContextMenu />);
    expect(screen.getByLabelText(new RegExp(nxConfig.name, "i"))).toBeInTheDocument();
  });

  it("hides text label when iconOnly is true", () => {
    const { container } = render(<LogoContextMenu iconOnly />);
    expect(screen.getByLabelText(new RegExp(nxConfig.name, "i"))).toBeInTheDocument();
    expect(container.querySelector("span.font-extrabold")).not.toBeInTheDocument();
  });

  it("opens context menu on right click and handles SVG copying", async () => {
    render(<LogoContextMenu />);

    const logoLink = screen.getByLabelText(new RegExp(nxConfig.name, "i"));
    const container = logoLink.closest("div")!;
    fireEvent.contextMenu(container, { clientX: 150, clientY: 50 });

    expect(screen.getByText(/Copy .* Logo as SVG/i)).toBeInTheDocument();
    expect(screen.getByText(/Guidelines/i)).toBeInTheDocument();

    const copyBtn = screen.getByRole("button", { name: /copy .* logo as svg/i });
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    expect(writeTextMock).toHaveBeenCalled();
  });

  it("closes context menu when clicking outside or scrolling", () => {
    render(
      <div>
        <LogoContextMenu />
        <div data-testid="outside">Outside Element</div>
      </div>
    );

    const logoLink = screen.getByLabelText(new RegExp(nxConfig.name, "i"));
    const container = logoLink.closest("div")!;
    fireEvent.contextMenu(container, { clientX: 100, clientY: 50 });
    expect(screen.getByText(/Copy .* Logo as SVG/i)).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByText(/Copy .* Logo as SVG/i)).not.toBeInTheDocument();
  });
});
