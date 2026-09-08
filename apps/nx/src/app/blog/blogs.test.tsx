import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { getAllPosts, getPostBySlug, getPostStaticSlugs } from "@/lib/blogs";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import BlogsIndexPage, { metadata as indexMetadata } from "./page";
import BlogSlugPage, { generateStaticParams, generateMetadata } from "./[slug]/page";

describe("Blog Data Loader & SSG Engine", () => {
  it("loads all configured blog posts", () => {
    const posts = getAllPosts();
    expect(posts.length).toBe(5);

    const ids = posts.map((p) => p.id);
    expect(ids).toContain("getting-started-guide");
    expect(ids).toContain("theming-and-customization");
    expect(ids).toContain("architecture-and-extensibility");
    expect(ids).toContain("flash-vector-sprites");
    expect(ids).toContain("flash-history");
  });

  it("retrieves individual blog posts by slug", () => {
    const post = getPostBySlug("getting-started-guide");
    expect(post).not.toBeNull();
    expect(post?.title).toBe("Getting Started with the Application Template");
    expect(post?.content).toContain("nx.config.json");

    const nonExistent = getPostBySlug("non-existent-article");
    expect(nonExistent).toBeNull();
  });

  it("generates static slugs for SSG build", async () => {
    const staticSlugs = await generateStaticParams();
    expect(staticSlugs.length).toBe(5);
    const slugValues = staticSlugs.map((s) => s.slug);
    expect(slugValues).toEqual(getPostStaticSlugs().map((s) => s.slug));
  });

  it("generates dynamic metadata for individual blog pages with featured image", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "getting-started-guide" }),
    });
    expect(meta.title).toContain("Getting Started with the Application Template");
    expect(meta.openGraph?.images).toBeDefined();
    expect((meta.openGraph?.images as Array<{ url: string }>)[0]?.url).toBeDefined();
    expect(meta.twitter?.images).toBeDefined();

    const notFoundMeta = await generateMetadata({
      params: Promise.resolve({ slug: "non-existent" }),
    });
    expect(notFoundMeta.title).toContain("Blog Not Found");
  });

  it("has valid index metadata for the blogs hub", () => {
    expect(indexMetadata.title).toContain("Blog");
  });
});

describe("Blog UI Components", () => {
  it("renders BlogsIndexPage", () => {
    render(<BlogsIndexPage />);
    expect(screen.getAllByText(/Blog/i).length).toBeGreaterThan(0);
  });

  it("renders BlogSlugPage with content and pagination controls", async () => {
    const result = await BlogSlugPage({ params: Promise.resolve({ slug: "getting-started-guide" }) });
    render(result);
    expect(screen.getAllByText(/Getting Started with the Application Template/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Blogs Navigation")).toBeInTheDocument();
  });

  it("renders ArticleLayout with sidebar navigation links and toggles mobile menu", async () => {
    const fireEvent = (await import("@testing-library/react")).fireEvent;
    const posts = getAllPosts();
    render(
      <ArticleLayout posts={posts} currentPost={posts[0]}>
        <div>Article Body</div>
      </ArticleLayout>
    );

    const toggleBtn = screen.getByLabelText("Toggle navigation menu");
    expect(toggleBtn).toBeInTheDocument();
    expect(screen.getByText("Blogs Navigation")).toBeInTheDocument();
    expect(screen.getByText("Article Body")).toBeInTheDocument();

    expect(screen.getByText("Show")).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByText("Hide")).toBeInTheDocument();
  });
});

