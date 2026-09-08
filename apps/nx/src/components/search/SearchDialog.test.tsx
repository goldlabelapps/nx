import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchDialog } from "./SearchDialog";
import { AppProviders } from "@/components/providers/AppProviders";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

describe("SearchDialog component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ guides: [] }),
      })
    );
  });

  it("renders search icon button and opens dialog on click", async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <SearchDialog />
      </AppProviders>
    );

    const searchBtn = screen.getByRole("button", { name: /search/i });
    expect(searchBtn).toBeInTheDocument();

    await user.click(searchBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search site/i)).toBeInTheDocument();
  });

  it("filters search results when typing a query", async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <SearchDialog />
      </AppProviders>
    );

    await user.click(screen.getByRole("button", { name: /search/i }));
    const input = screen.getByPlaceholderText(/search site/i);

    await user.type(input, "React");

    expect(screen.getByText(/skills/i)).toBeInTheDocument();
  });
});
