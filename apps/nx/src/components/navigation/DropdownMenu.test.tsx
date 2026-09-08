import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DropdownMenu } from "./DropdownMenu";

const mockItem: NavItem = {
  label: "Platform",
  dropdown: [
    {
      title: "Core Module",
      description: "Production-ready starter module",
      href: "#features",
      icon: "Layers",
      badge: "v1.0.1",
    },
    {
      title: "External Docs",
      description: "Architecture & integration guide",
      href: "https://example.com/docs",
      external: true,
    },
  ],
};

describe("DropdownMenu component", () => {
  it("renders trigger button and toggles open state on hover", async () => {
    render(<DropdownMenu item={mockItem} />);
    const trigger = screen.getByRole("button", { name: /platform/i });
    expect(trigger).toBeInTheDocument();

    // Hover to open
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(screen.getByText("Core Module")).toBeInTheDocument();
    expect(screen.getByText("v1.0.1")).toBeInTheDocument();
    expect(screen.getByText("External Docs")).toBeInTheDocument();

    // Mouse leave with timer
    vi.useFakeTimers();
    fireEvent.mouseLeave(trigger.parentElement!);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    vi.useRealTimers();
  });

  it("toggles on click as well", () => {
    render(<DropdownMenu item={mockItem} />);
    const trigger = screen.getByRole("button", { name: /platform/i });
    fireEvent.click(trigger);
    expect(screen.getByText("Core Module")).toBeInTheDocument();
  });

  it("renders trigger link to item.href when item.href is provided", () => {
    const itemWithHref: NavItem = {
      label: "Videos",
      href: "/videos",
      dropdown: [
        {
          title: "Sample Video",
          href: "/videos/sample",
        },
      ],
    };
    render(<DropdownMenu item={itemWithHref} />);
    const link = screen.getByRole("link", { name: /videos/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/videos");
  });
});
