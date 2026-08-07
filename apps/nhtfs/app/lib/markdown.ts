import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { T_NavNode } from '@nx/design-system';
import type { MarkdownFrontmatter, MarkdownPage } from '../../types';

const MARKDOWN_ROOT = path.join(process.cwd(), 'public', 'nx', 'markdown');

function toRoutePath(segments: string[]): string {
  if (!segments.length) {
    return '/';
  }

  return `/${segments.join('/')}`;
}

function normalizeRouteSlug(slug: string | undefined, fallbackSegments: string[]): string {
  const fallback = toRoutePath(fallbackSegments);

  if (typeof slug !== 'string' || !slug.trim()) {
    return fallback;
  }

  const normalized = slug.trim().startsWith('/') ? slug.trim() : `/${slug.trim()}`;
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized;
}

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function slugSegmentsFromFile(filePath: string): string[] {
  const relPath = path.relative(MARKDOWN_ROOT, filePath).replace(/\\/g, '/');
  const withoutExt = relPath.replace(/\.md$/, '');

  if (withoutExt === 'index') {
    return [];
  }

  const segments = withoutExt.split('/').filter(Boolean);

  if (segments[segments.length - 1] === 'index') {
    return segments.slice(0, -1);
  }

  return segments;
}

function readMarkdownPage(filePath: string): MarkdownPage {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slugSegments = slugSegmentsFromFile(filePath);
  const frontmatter = (data || {}) as MarkdownFrontmatter;
  const title = typeof frontmatter.title === 'string' && frontmatter.title.trim()
    ? frontmatter.title.trim()
    : (slugSegments[slugSegments.length - 1] || 'Home');
  const description = typeof frontmatter.description === 'string' ? frontmatter.description : '';
  const routePath = normalizeRouteSlug(frontmatter.slug, slugSegments);

  return {
    slugSegments,
    routePath,
    filePath,
    frontmatter,
    title,
    description,
    content,
  };
}

export function getAllMarkdownPages(): MarkdownPage[] {
  const files = walkMarkdownFiles(MARKDOWN_ROOT);
  const pages = files.map(readMarkdownPage);

  return pages.sort((a, b) => {
    const orderA = typeof a.frontmatter.order === 'number' ? a.frontmatter.order : 9999;
    const orderB = typeof b.frontmatter.order === 'number' ? b.frontmatter.order : 9999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.routePath.localeCompare(b.routePath);
  });
}

export function getMarkdownPageBySlug(slugSegments: string[]): MarkdownPage | null {
  const requested = toRoutePath(slugSegments);
  const pages = getAllMarkdownPages();

  return pages.find((page) => page.routePath === requested) || null;
}

export function getMarkdownStaticParams() {
  return getAllMarkdownPages().map((page) => ({
    slug: page.slugSegments.length ? page.slugSegments : undefined,
  }));
}

export function getMarkdownNavItems(): T_NavNode[] {
  return getAllMarkdownPages()
    .filter((page) => {
      const hide = page.frontmatter.hideInNav;
      return hide !== true && hide !== 'true';
    })
    .map((page) => ({
      title: page.routePath === '/' ? 'Home' : page.title,
      slug: page.routePath,
      path: page.routePath,
    }));
}
