import { GuideMeta } from "./markdown";

export interface MenuItemNode {
  id: string;
  name: string;
  slug?: string;
  cleanSlug?: string;
  isFolder: boolean;
  order: number;
  icon?: string;
  guide?: GuideMeta;
  children: MenuItemNode[];
  path: string;
}

export function formatFolderTitle(slugSegment: string): string {
  if (!slugSegment) return "";
  const known: Record<string, string> = {
    api: "API",
    pwa: "PWA",
    cli: "CLI",
    gpxroute: "GPX Route",
    ux: "UX",
    ui: "UI",
  };

  const lower = slugSegment.toLowerCase();
  if (known[lower]) return known[lower];

  return slugSegment
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Builds a nested menu tree based on markdown directory/folder nesting structure.
 */
export function buildNestedMenuTree(guides: GuideMeta[]): MenuItemNode[] {
  const rootNodes: MenuItemNode[] = [];
  const folderMap = new Map<string, MenuItemNode>();

  const sortedGuides = [...guides].sort((a, b) => a.order - b.order);

  function getOrCreateFolderNode(folderPath: string): MenuItemNode {
    if (folderMap.has(folderPath)) {
      return folderMap.get(folderPath)!;
    }

    const segments = folderPath.split("/");
    const folderName = segments[segments.length - 1];
    const formattedName = formatFolderTitle(folderName);

    const folderNode: MenuItemNode = {
      id: `folder:${folderPath}`,
      name: formattedName,
      isFolder: true,
      order: 100,
      path: folderPath,
      children: [],
    };

    folderMap.set(folderPath, folderNode);

    if (segments.length === 1) {
      rootNodes.push(folderNode);
    } else {
      const parentPath = segments.slice(0, -1).join("/");
      const parentFolderNode = getOrCreateFolderNode(parentPath);
      parentFolderNode.children.push(folderNode);
    }

    return folderNode;
  }

  for (const guide of sortedGuides) {
    if (guide.cleanSlug === "index" || guide.cleanSlug === "") {
      rootNodes.unshift({
        id: `item:${guide.cleanSlug}`,
        name: guide.title || "Overview",
        slug: guide.slug,
        cleanSlug: guide.cleanSlug,
        isFolder: false,
        order: guide.order,
        icon: guide.icon,
        guide,
        children: [],
        path: guide.cleanSlug,
      });
      continue;
    }

    const segments = guide.cleanSlug.split("/");

    if (segments.length === 1) {
      // Top level standalone file
      rootNodes.push({
        id: `item:${guide.cleanSlug}`,
        name: guide.title,
        slug: guide.slug,
        cleanSlug: guide.cleanSlug,
        isFolder: false,
        order: guide.order,
        icon: guide.icon,
        guide,
        children: [],
        path: guide.cleanSlug,
      });
    } else {
      // File inside a folder structure
      const folderSegments = segments.slice(0, -1);
      const folderPath = folderSegments.join("/");
      const fileName = segments[segments.length - 1];
      const folderName = folderSegments[folderSegments.length - 1];

      const folderNode = getOrCreateFolderNode(folderPath);

      // Check if this file is the main index/file for the folder (e.g. flash/flash or flash/index)
      if (fileName === "index" || fileName.toLowerCase() === folderName.toLowerCase()) {
        if (!folderNode.guide) {
          folderNode.guide = guide;
          folderNode.slug = guide.slug;
          folderNode.cleanSlug = guide.cleanSlug;
          folderNode.name = guide.title || folderNode.name;
          folderNode.icon = guide.icon || folderNode.icon;
          folderNode.order = Math.min(folderNode.order, guide.order);
        }
      }

      folderNode.children.push({
        id: `item:${guide.cleanSlug}`,
        name: guide.title,
        slug: guide.slug,
        cleanSlug: guide.cleanSlug,
        isFolder: false,
        order: guide.order,
        icon: guide.icon,
        guide,
        children: [],
        path: guide.cleanSlug,
      });
    }
  }

  // Sort children inside folders by order & name
  function sortNodes(nodes: MenuItemNode[]) {
    nodes.sort((a, b) => {
      if (a.isFolder !== b.isFolder) {
        return a.isFolder ? -1 : 1;
      }
      if (a.order !== b.order) return a.order - b.order;
      return a.name.localeCompare(b.name);
    });

    for (const node of nodes) {
      if (node.children.length > 0) {
        sortNodes(node.children);
      }
    }
  }

  sortNodes(rootNodes);
  return rootNodes;
}

/**
 * Filter menu nodes recursively by search query.
 */
export function filterMenuNodes(nodes: MenuItemNode[], query: string): MenuItemNode[] {
  if (!query.trim()) return nodes;
  const q = query.toLowerCase();

  const results: MenuItemNode[] = [];

  for (const node of nodes) {
    const nameMatches = node.name.toLowerCase().includes(q);
    const descMatches = node.guide?.description?.toLowerCase().includes(q) ?? false;
    const tagMatches = node.guide?.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;

    const filteredChildren = node.children.length > 0 ? filterMenuNodes(node.children, q) : [];

    if (nameMatches || descMatches || tagMatches || filteredChildren.length > 0) {
      results.push({
        ...node,
        children: filteredChildren,
      });
    }
  }

  return results;
}

/**
 * Collect all folder IDs that contain the given active cleanSlug to auto-expand them.
 */
export function getAncestorFolderIds(nodes: MenuItemNode[], activeCleanSlug: string): string[] {
  const ancestorIds: string[] = [];

  function search(nodeList: MenuItemNode[], currentAncestors: string[]): boolean {
    for (const node of nodeList) {
      const nextAncestors = node.isFolder ? [...currentAncestors, node.id] : currentAncestors;

      if (!node.isFolder && node.cleanSlug === activeCleanSlug) {
        ancestorIds.push(...currentAncestors);
        return true;
      }

      if (node.isFolder && node.cleanSlug === activeCleanSlug) {
        ancestorIds.push(...nextAncestors);
        return true;
      }

      if (node.children.length > 0) {
        if (search(node.children, nextAncestors)) {
          return true;
        }
      }
    }
    return false;
  }

  search(nodes, []);
  return Array.from(new Set(ancestorIds));
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isLast: boolean;
}

/**
 * Builds breadcrumb items from the nested route segments, labelled by content item titles.
 */
export function getBreadcrumbItems(cleanSlug: string, guides: GuideMeta[]): BreadcrumbItem[] {
  if (!cleanSlug || cleanSlug === "index") {
    return [];
  }

  const sortedGuides = [...guides].sort((a, b) => a.order - b.order);
  const segments = cleanSlug.split("/");
  const items: BreadcrumbItem[] = [];

  let cumulative = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    cumulative = cumulative ? `${cumulative}/${segment}` : segment;
    const isLast = i === segments.length - 1;

    // Search for a matching guide for this cumulative route
    const match = sortedGuides.find(
      (g) =>
        g.cleanSlug === cumulative ||
        g.cleanSlug === `${cumulative}/${segment}` ||
        g.cleanSlug === `${cumulative}/index`
    );

    // If no direct guide match for folder, find the first guide inside this folder
    const firstChildGuide = match
      ? null
      : sortedGuides.find(
          (g) => g.cleanSlug === cumulative || g.cleanSlug.startsWith(`${cumulative}/`)
        );

    const label = match?.title || formatFolderTitle(segment);
    
    let href = `/${cumulative}`;
    if (match) {
      href = match.cleanSlug === "index" ? "/" : `/${match.cleanSlug}`;
    } else if (firstChildGuide) {
      href = firstChildGuide.cleanSlug === "index" ? "/" : `/${firstChildGuide.cleanSlug}`;
    }

    items.push({
      label,
      href,
      isLast,
    });
  }

  return items;
}

