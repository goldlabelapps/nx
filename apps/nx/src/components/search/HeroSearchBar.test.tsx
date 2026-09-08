import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeroSearchBar } from "./HeroSearchBar";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

describe("HeroSearchBar component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders tag buttons and scrolls container into view on tag click", async () => {
    const scrollIntoViewMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const user = userEvent.setup();
    render(<HeroSearchBar />);

    const flashBtn = screen.getByRole("button", { name: "Flash" });
    expect(flashBtn).toBeInTheDocument();

    await user.click(flashBtn);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(screen.getByText(/skills/i)).toBeInTheDocument();
  });
});
