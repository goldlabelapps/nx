import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { siteConfig } from "@/config";

describe("Footer component", () => {
  it("renders columns and bottom legal links without duplicating the header row", () => {
    render(<Footer />);

    siteConfig.footer.columns.forEach((column) => {
      expect(screen.getByRole("heading", { name: column.title })).toBeInTheDocument();
    });

    siteConfig.footer.bottomLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });

    expect(screen.queryByText(siteConfig.footer.copyright)).not.toBeInTheDocument();

    const githubLink = screen.getByRole("link", { name: "GitHub Repository" });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/goldlabelapps/nx");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
