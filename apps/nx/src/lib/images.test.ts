import { describe, it, expect } from "vitest";
import { getFeaturedImageUrl } from "./images";

describe("getFeaturedImageUrl", () => {
  it("returns explicit image URL when provided", () => {
    const url = getFeaturedImageUrl({ image: "/custom-image.png" });
    expect(url).toBe("/custom-image.png");
  });

  it("resolves dark theme manifest image for known slug", () => {
    const url = getFeaturedImageUrl({ slug: "flash", theme: "dark" });
    expect(url).toBe("/jpg/flash/flash-og-dark.jpg");
  });

  it("resolves light theme manifest image for known slug when requested", () => {
    const url = getFeaturedImageUrl({ slug: "react", theme: "light" });
    expect(url).toBe("/jpg/react/react-og-light.jpg");
  });

  it("resolves image based on matching tags", () => {
    const url = getFeaturedImageUrl({ slug: "unknown-slug", tags: ["Python"] });
    expect(url).toBe("/jpg/python/python-og-dark.jpg");
  });

  it("falls back to default site OG image when no match is found", () => {
    const url = getFeaturedImageUrl({ slug: "random-non-existent-slug" });
    expect(url).toBe("/png/open-graph.png");
  });

  it("resolves manifest lookup when featuredImage contains a slug string like 'flash'", () => {
    const url = getFeaturedImageUrl({ featuredImage: "flash", theme: "dark" });
    expect(url).toBe("/jpg/flash/flash-og-dark.jpg");
  });
});
