import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MarkdownContent } from "./MarkdownContent";

vi.mock("@/components/auth/GodModeBar", () => ({
  GodModeBar: () => <div data-testid="god-mode-bar" />,
}));

describe("MarkdownContent Component", () => {
  it("renders markdown headings, paragraphs, and lists", () => {
    const content = `
# Main Title
## Section 1
This is a test paragraph with **bold text** and \`inline code\`.

- Item 1
- Item 2
`;

    render(<MarkdownContent content={content} />);

    expect(screen.getByRole("heading", { level: 1, name: "Main Title" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Section 1" })).toBeInTheDocument();
    expect(screen.getByText("bold text")).toBeInTheDocument();
    expect(screen.getByText("inline code")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("resolves relative markdown links to canonical app route paths", () => {
    const content = `
[Sibling Guide](installation.md)
[Index Link](/python/index.md)
[Anchor Link](../config.md#section-2)
[Parent Link](../../career/typescript.md)
[External Link](https://goldlabel.pro)
`;

    render(
      <MarkdownContent
        content={content}
        filePath="/Users/milky/project/apps/nx/public/md/nx/developer/testing.md"
      />
    );

    // Relative links should render as Next.js Links with resolved hrefs
    const siblingLink = screen.getByRole("link", { name: "Sibling Guide" });
    expect(siblingLink.getAttribute("href")).toBe("/nx/developer/installation");

    const indexLink = screen.getByRole("link", { name: "Index Link" });
    expect(indexLink.getAttribute("href")).toBe("/python");

    const anchorLink = screen.getByRole("link", { name: "Anchor Link" });
    expect(anchorLink.getAttribute("href")).toBe("/nx/config#section-2");

    const parentLink = screen.getByRole("link", { name: "Parent Link" });
    expect(parentLink.getAttribute("href")).toBe("/career/typescript");

    const externalLink = screen.getByRole("link", { name: "External Link" });
    expect(externalLink.getAttribute("href")).toBe("https://goldlabel.pro");
    expect(externalLink.getAttribute("target")).toBe("_blank");
  });

  it("renders code blocks with interactive copy button", async () => {
    const user = userEvent.setup();
    const content = "```ts\nconst greeting = 'Hello World';\n```";

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });

    render(<MarkdownContent content={content} />);

    expect(screen.getByText("ts")).toBeInTheDocument();
    const copyBtn = screen.getByRole("button", { name: /copy code/i });
    await user.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith("const greeting = 'Hello World';");
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });
});
