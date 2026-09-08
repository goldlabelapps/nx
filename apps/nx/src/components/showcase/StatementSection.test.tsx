import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatementSection } from "./StatementSection";

describe("StatementSection component", () => {
  it("renders the central vision statement and floating badges", () => {
    render(<StatementSection />);
    expect(
      screen.getByText(/built with modern primitives/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Architecture & Design")).toBeInTheDocument();
  });
});
