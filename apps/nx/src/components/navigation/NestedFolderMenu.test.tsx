import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NestedFolderMenu } from "./NestedFolderMenu";
import { GuideMeta } from "@/lib/markdown";

vi.mock("next/navigation", () => ({
  usePathname: () => "/flash/history",
}));

const mockGuides: GuideMeta[] = [
  {
    slug: "/",
    cleanSlug: "index",
    title: "Index Page",
    description: "Root index",
    order: 1,
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
];

describe("NestedFolderMenu Component", () => {
  it("renders folder hierarchy and active file item", () => {
    render(<NestedFolderMenu guides={mockGuides} currentCleanSlug="flash/history" />);

    expect(screen.getAllByText("Flash Overview").length).toBeGreaterThan(0);
    expect(screen.getByText("Flash History")).toBeDefined();
  });

  it("filters items when typing in search bar", () => {
    render(<NestedFolderMenu guides={mockGuides} currentCleanSlug="flash/history" />);

    const searchInput = screen.getByPlaceholderText(/Filter 3 folder docs/i);
    fireEvent.change(searchInput, { target: { value: "History" } });

    expect(screen.getByText("Flash History")).toBeDefined();
    expect(screen.queryByText("Index Page")).toBeNull();
  });

  it("toggles folder expand/collapse", () => {
    render(<NestedFolderMenu guides={mockGuides} currentCleanSlug="index" />);

    const folderButton = screen.getByLabelText(/Collapse folder|Expand folder/i);
    expect(folderButton).toBeDefined();

    fireEvent.click(folderButton);
    // Toggling should update state cleanly without crashing
  });
});
