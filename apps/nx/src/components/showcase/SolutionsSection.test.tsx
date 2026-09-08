import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SolutionsSection } from "./SolutionsSection";
import { siteConfig } from "@/config";

describe("SolutionsSection component", () => {
  it("renders both standard and enterprise tiers", () => {
    render(<SolutionsSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(siteConfig.solutions.title);

    siteConfig.solutions.cards.forEach((card) => {
      expect(screen.getByText(card.heading)).toBeInTheDocument();
      expect(screen.getByText(card.cta.label)).toBeInTheDocument();
    });
  });
});
