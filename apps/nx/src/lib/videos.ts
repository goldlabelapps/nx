import { videosConfig } from "@/config/videos.config";

/**
 * Returns all configured video walkthroughs
 */
export function getAllVideos(): VideoItem[] {
  return videosConfig.items || [];
}

/**
 * Retrieves a specific video item by its slug/id
 */
export function getVideoBySlug(slug: string): VideoItem | null {
  const normalizedSlug = slug.replace(/^\/|\/$/g, "").toLowerCase();
  const allVideos = getAllVideos();
  return (
    allVideos.find(
      (v) =>
        v.id.toLowerCase() === normalizedSlug ||
        v.id.toLowerCase() === normalizedSlug.replace(/^videos\//, "")
    ) || null
  );
}

/**
 * Returns static parameters for Next.js SSG build
 */
export function getVideoStaticSlugs(): { slug: string }[] {
  const allVideos = getAllVideos();
  return allVideos.map((v) => ({
    slug: v.id,
  }));
}
