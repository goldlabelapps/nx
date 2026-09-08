import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogSection } from "./BlogSection";
import { siteConfig } from "@/config";

describe("BlogSection component", () => {
  it("renders blog posts with category tags and dates", () => {
    render(<BlogSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(siteConfig.blogs.title);
    expect(screen.getByText(siteConfig.blogs.posts[0].title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(siteConfig.blogs.viewAllCta.label, "i"))).toBeInTheDocument();
  });

  it("navigates pagination slider", async () => {
    const user = userEvent.setup();
    render(<BlogSection />);

    const nextBtn = screen.getByLabelText(/next blog posts/i);
    await user.click(nextBtn);

    const prevBtn = screen.getByLabelText(/previous blog posts/i);
    await user.click(prevBtn);
  });

  it("renders all articles when showAll prop is true", () => {
    render(<BlogSection showAll compactTop />);
    siteConfig.blogs.posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
    expect(screen.queryByLabelText(/next blog posts/i)).not.toBeInTheDocument();
  });
});
