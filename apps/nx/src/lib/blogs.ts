import { blogsConfig } from "@/config/blogs.config";

/**
 * Returns all configured articles/blog posts
 */
export function getAllPosts(): BlogPost[] {
  return blogsConfig.posts || [];
}

/**
 * Retrieves a specific article by its slug/id
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const normalizedSlug = slug.replace(/^\/|\/$/g, "").toLowerCase();
  const allPosts = getAllPosts();
  return allPosts.find((p) => p.id.toLowerCase() === normalizedSlug) || null;
}

/**
 * Returns static parameters for Next.js SSG build
 */
export function getPostStaticSlugs(): { slug: string }[] {
  return getAllPosts().map((p) => ({ slug: p.id }));
}
