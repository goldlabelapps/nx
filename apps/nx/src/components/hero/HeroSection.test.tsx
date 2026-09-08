import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";
import { siteConfig } from "@/config";

describe("HeroSection component", () => {
  it("renders hero headline, subtitle, and CTAs", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(siteConfig.hero.headline);
    expect(screen.getByText(siteConfig.statement.badge || "Modular Application Template")).toBeInTheDocument();
    expect(screen.getByText(siteConfig.hero.primaryCta.label)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.hero.secondaryCta.label)).toBeInTheDocument();
  });
});
