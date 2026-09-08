import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { FeatureExplorer } from "./FeatureExplorer";

describe("FeatureExplorer component", () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });
  });

  it("renders feature tabs and default active preview", () => {
    render(<FeatureExplorer />);
    expect(screen.getByRole("button", { name: /design primitives/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cli & scripts/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /type safety/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /automations/i })).toBeInTheDocument();
  });

  it("switches to CLI tab and displays terminal snippet with copy button", async () => {
    render(<FeatureExplorer />);

    const toolingTab = screen.getByRole("button", { name: /cli & scripts/i });
    fireEvent.click(toolingTab);

    expect(screen.getByText(/All unit tests passed/i)).toBeInTheDocument();

    const copyBtns = screen.getAllByTitle(/copy command/i);
    expect(copyBtns.length).toBeGreaterThan(0);
    await act(async () => {
      fireEvent.click(copyBtns[0]);
    });
    expect(writeTextMock).toHaveBeenCalled();
  });

  it("switches to Type Safety tab and displays code snippet", async () => {
    render(<FeatureExplorer />);

    const typeTab = screen.getByRole("button", { name: /type safety/i });
    fireEvent.click(typeTab);

    expect(screen.getAllByText(/SiteConfig/i).length).toBeGreaterThan(0);

    const copyBtn = screen.getByRole("button", { name: /copy code/i });
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    expect(writeTextMock).toHaveBeenCalled();
  });
});
