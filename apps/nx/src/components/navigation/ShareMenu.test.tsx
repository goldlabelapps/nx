import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShareMenu } from "./ShareMenu";

describe("ShareMenu component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the share trigger as an icon button", () => {
    render(<ShareMenu />);
    const button = screen.getByRole("button", { name: /share/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByText("Share")).not.toBeInTheDocument();
  });

  it("opens the popover menu on click and displays share options", async () => {
    const user = userEvent.setup();
    render(<ShareMenu />);

    const button = screen.getByRole("button", { name: /share/i });
    await user.click(button);

    expect(screen.getByRole("dialog", { name: /share options/i })).toBeInTheDocument();
    expect(screen.getByText("Share this page")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Twitter / X")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
  });

  it("copies link to clipboard and updates UI feedback", async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });

    render(<ShareMenu url="https://template.goldlabel.pro" />);

    const trigger = screen.getByRole("button", { name: /share/i });
    await user.click(trigger);

    const copyBtn = screen.getByText("Copy Link");
    await user.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith("https://template.goldlabel.pro");
    expect(screen.getByText("Link Copied!")).toBeInTheDocument();
  });

  it("closes popover when Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<ShareMenu />);

    const trigger = screen.getByRole("button", { name: /share/i });
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes popover when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        <ShareMenu />
      </div>
    );

    const trigger = screen.getByRole("button", { name: /share/i });
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside-element"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
