import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders with default props as a button", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("bg-[#0f172a]");
  });

  it("handles clicks appropriately", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Submit</Button>);
    const btn = screen.getByRole("button", { name: /submit/i });
    await user.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as internal link when href is provided", () => {
    render(<Button href="/download">Download</Button>);
    const link = screen.getByRole("link", { name: /download/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/download");
  });

  it("renders as external link with security attributes when external is true", () => {
    render(
      <Button href="https://google.com" external>
        External
      </Button>
    );
    const link = screen.getByRole("link", { name: /external/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders icons on left or right position", () => {
    const { rerender } = render(
      <Button icon="Download" iconPosition="left">
        Download
      </Button>
    );
    expect(screen.getByText("Download")).toBeInTheDocument();

    rerender(
      <Button icon="ArrowRight" iconPosition="right">
        Next
      </Button>
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("applies different variant and size classes", () => {
    const { rerender } = render(
      <Button variant="secondary" size="sm">
        Secondary
      </Button>
    );
    let btn = screen.getByRole("button", { name: /secondary/i });
    expect(btn).toHaveClass("text-xs");

    rerender(
      <Button variant="outline" size="lg">
        Outline
      </Button>
    );
    btn = screen.getByRole("button", { name: /outline/i });
    expect(btn).toHaveClass("text-base");

    rerender(<Button variant="glass">Glass</Button>);
    expect(screen.getByRole("button", { name: /glass/i })).toBeInTheDocument();

    rerender(<Button variant="pill">Pill</Button>);
    expect(screen.getByRole("button", { name: /pill/i })).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const btn = screen.getByRole("button", { name: /disabled button/i });
    expect(btn).toBeDisabled();
  });
});
