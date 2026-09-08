import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { getAllVideos, getVideoBySlug } from "@/lib/videos";
import { VideoLayout } from "@/components/video/VideoLayout";
import VideosIndexPage, { metadata as indexMetadata } from "./page";
import VideoSlugPage, { generateStaticParams, generateMetadata } from "./[slug]/page";
import { vi } from "vitest";

vi.mock("@goldlabelapps/flash", () => ({
  CleverText: ({ text }: { text: string }) => <span>{text}</span>,
}));

describe("Video Data Loader & SSG Engine", () => {
  it("loads all configured videos", () => {
    const videos = getAllVideos();
    expect(videos.length).toBe(2);

    const ids = videos.map((v) => v.id);
    expect(ids).toContain("inwyk");
    expect(ids).toContain("magento-plugin");
  });

  it("retrieves individual videos by slug or id", () => {
    const video = getVideoBySlug("inwyk");
    expect(video).not.toBeNull();
    expect(video?.title).toBe("It's Not What You Know");
    expect(video?.orientation).toBe("landscape");
    expect(video?.videoUrl).toBe("/mp4/INWYK_trailer.mp4");

    const magentoVideo = getVideoBySlug("magento-plugin");
    expect(magentoVideo).not.toBeNull();
    expect(magentoVideo?.title).toBe("Magento Plugin");

    const nonExistent = getVideoBySlug("non-existent-video");
    expect(nonExistent).toBeNull();
  });

  it("generates static slugs for SSG build", async () => {
    const staticSlugs = await generateStaticParams();
    expect(staticSlugs.length).toBe(2);
    const slugValues = staticSlugs.map((s) => s.slug);
    expect(slugValues).toEqual(["inwyk", "magento-plugin"]);
  });

  it("generates dynamic metadata for individual video pages", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "inwyk" }),
    });
    expect(meta.title).toContain("It's Not What You Know");
    expect(meta.description).toContain("London");

    const notFoundMeta = await generateMetadata({
      params: Promise.resolve({ slug: "non-existent" }),
    });
    expect(notFoundMeta.title).toContain("Video Not Found");
  });

  it("has valid index metadata for video hub", () => {
    expect(indexMetadata.title).toContain("Videos");
  });
});

describe("Video UI Components & Layout", () => {
  it("renders VideoLayout with playlist sidebar and landscape video player", () => {
    const allVideos = getAllVideos();
    const current = allVideos[0];

    render(<VideoLayout videos={allVideos} currentVideo={current} />);

    expect(screen.getByText("Live Walkthroughs & Demos")).toBeInTheDocument();
    expect(screen.getAllByText("It's Not What You Know").length).toBeGreaterThan(0);
    expect(screen.getByText("Duration: 1:25")).toBeInTheDocument();
    expect(screen.getByText("Key Walkthrough Highlights")).toBeInTheDocument();
  });

  it("renders VideosIndexPage with VideoSection component and VideoSlugPage", async () => {
    const indexResult = VideosIndexPage();
    render(indexResult);
    expect((await screen.findAllByText(/^Videos$/i)).length).toBeGreaterThan(0);
    expect(screen.getAllByText("It's Not What You Know").length).toBeGreaterThan(0);

    const slugResult = await VideoSlugPage({
      params: Promise.resolve({ slug: "inwyk" }),
    });
    render(slugResult);
    expect(screen.getAllByText("It's Not What You Know").length).toBeGreaterThan(0);
  });
});

describe("Video Data Loader Integration", () => {
  it("has video items configured", () => {
    expect(getAllVideos().length).toBeGreaterThan(0);
  });
});
