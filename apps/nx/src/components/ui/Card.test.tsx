import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card component", () => {
  it("renders children properly", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies variant styling", () => {
    const { rerender } = render(<Card variant="glass">Glass Card</Card>);
    expect(screen.getByText("Glass Card")).toHaveClass("backdrop-blur-xl");

    rerender(<Card variant="glow">Glow Card</Card>);
    expect(screen.getByText("Glow Card")).toHaveClass("border-slate-300");

    rerender(<Card variant="bordered">Bordered Card</Card>);
    expect(screen.getByText("Bordered Card")).toHaveClass("border-neutral-200");
  });

  it("handles hoverEffect disabling", () => {
    render(<Card hoverEffect={false}>No Hover</Card>);
    expect(screen.getByText("No Hover")).not.toHaveClass("hover:translate-y-[-2px]");
  });
});
