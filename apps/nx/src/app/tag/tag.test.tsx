import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TagPage, { generateStaticParams, generateMetadata } from "./[slug]/page";
import TagIndexPage from "./page";

describe("Tag Route Engine & UI Components", () => {
  it("generates static params including guide tags and profile tags", () => {
    const staticParams = generateStaticParams();
    const slugs = staticParams.map((p) => p.slug);

    expect(slugs).toContain("nextjs");
    expect(slugs).toContain("guide");
    expect(slugs).toContain("setup");
  });

  it("generates metadata for tags", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "guide" }),
    });
    expect(meta.title).toContain("Guide Experience & Tagged Content");
  });

  it("renders TagPage for 'guide' tag showing matching guides", async () => {
    const jsx = await TagPage({
      params: Promise.resolve({ slug: "guide" }),
    });
    render(jsx);

    expect(screen.getAllByText("Guide")[0]).toBeInTheDocument();
    expect(screen.getByText(/Guides & Documentation/i)).toBeInTheDocument();
  });

  it("renders TagIndexPage listing all tags", async () => {
    const jsx = await TagIndexPage();
    render(jsx);

    expect(screen.getByText(/Browse by Topic & Technology/i)).toBeInTheDocument();
    expect(screen.getByText("Guide")).toBeInTheDocument();
  });
});
