import { describe, it, expect } from "vitest";
import { buildNestedMenuTree, filterMenuNodes, getAncestorFolderIds, formatFolderTitle, getBreadcrumbItems } from "./nestedMenu";
import { GuideMeta } from "./markdown";

describe("nestedMenu library", () => {
  it("formats folder titles correctly", () => {
    expect(formatFolderTitle("api")).toBe("API");
    expect(formatFolderTitle("flash")).toBe("Flash");
    expect(formatFolderTitle("apps-packages")).toBe("Apps Packages");
    expect(formatFolderTitle("design_system")).toBe("Design System");
  });

  const mockGuides: GuideMeta[] = [
    {
      slug: "/",
      cleanSlug: "index",
      title: "Index Page",
      description: "Root index",
      order: 1,
    },
    {
      slug: "/about",
      cleanSlug: "about",
      title: "About Us",
      description: "About document",
      order: 2,
    },
    {
      slug: "/flash/flash",
      cleanSlug: "flash/flash",
      title: "Flash Overview",
      description: "Flash main guide",
      order: 1,
    },
    {
      slug: "/flash/history",
      cleanSlug: "flash/history",
      title: "Flash History",
      description: "Flash history document",
      order: 2,
    },
    {
      slug: "/docs/engineering/architecture",
      cleanSlug: "docs/engineering/architecture",
      title: "Architecture Guide",
      description: "Deep engineering doc",
      order: 5,
    },
  ];

  it("builds nested menu tree from markdown folder paths", () => {
    const tree = buildNestedMenuTree(mockGuides);

    expect(tree).toBeDefined();

    // Check index file is at root
    const indexNode = tree.find((n) => n.cleanSlug === "index");
    expect(indexNode).toBeDefined();
    expect(indexNode?.name).toBe("Index Page");

    // Check flash folder node exists
    const flashFolderNode = tree.find((n) => n.id === "folder:flash");
    expect(flashFolderNode).toBeDefined();
    expect(flashFolderNode?.isFolder).toBe(true);
    expect(flashFolderNode?.name).toBe("Flash Overview"); // Derived from flash/flash.md title

    // Check children inside flash folder
    const flashHistoryItem = flashFolderNode?.children.find((c) => c.cleanSlug === "flash/history");
    expect(flashHistoryItem).toBeDefined();
    expect(flashHistoryItem?.name).toBe("Flash History");

    // Check deep multi-level folder docs/engineering
    const docsFolderNode = tree.find((n) => n.id === "folder:docs");
    expect(docsFolderNode).toBeDefined();
    const engineeringFolderNode = docsFolderNode?.children.find((c) => c.id === "folder:docs/engineering");
    expect(engineeringFolderNode).toBeDefined();
    const archItem = engineeringFolderNode?.children.find((c) => c.cleanSlug === "docs/engineering/architecture");
    expect(archItem?.name).toBe("Architecture Guide");
  });

  it("filters menu nodes recursively by search query", () => {
    const tree = buildNestedMenuTree(mockGuides);

    const filtered = filterMenuNodes(tree, "History");
    expect(filtered.length).toBeGreaterThan(0);

    const flashFolderNode = filtered.find((n) => n.id === "folder:flash");
    expect(flashFolderNode).toBeDefined();
    expect(flashFolderNode?.children.some((c) => c.cleanSlug === "flash/history")).toBe(true);
  });

  it("returns ancestor folder IDs for auto-expanding current active route", () => {
    const tree = buildNestedMenuTree(mockGuides);
    const ancestors = getAncestorFolderIds(tree, "docs/engineering/architecture");

    expect(ancestors).toContain("folder:docs");
    expect(ancestors).toContain("folder:docs/engineering");
  });

  it("builds dynamic breadcrumb items based on route segments and content titles", () => {
    const breadcrumbs = getBreadcrumbItems("flash/history", mockGuides);

    expect(breadcrumbs).toHaveLength(2);
    expect(breadcrumbs[0]).toEqual({
      label: "Flash Overview",
      href: "/flash/flash",
      isLast: false,
    });
    expect(breadcrumbs[1]).toEqual({
      label: "Flash History",
      href: "/flash/history",
      isLast: true,
    });

    const deepBreadcrumbs = getBreadcrumbItems("docs/engineering/architecture", mockGuides);
    expect(deepBreadcrumbs[0]).toEqual({
      label: "Docs",
      href: "/docs/engineering/architecture",
      isLast: false,
    });
    expect(deepBreadcrumbs[1]).toEqual({
      label: "Engineering",
      href: "/docs/engineering/architecture",
      isLast: false,
    });
    expect(deepBreadcrumbs[2]).toEqual({
      label: "Architecture Guide",
      href: "/docs/engineering/architecture",
      isLast: true,
    });
  });
});
