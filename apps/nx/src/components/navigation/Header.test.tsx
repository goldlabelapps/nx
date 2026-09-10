import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { AppProviders } from "@/components/providers/AppProviders";
import { siteConfig } from "@/config";

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: pushMock,
      refresh: refreshMock,
    }),
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => "/",
  };
});

describe("Header component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ authenticated: false }),
      })
    );

    vi.stubGlobal("confirm", vi.fn().mockReturnValue(true));
  });

  it("renders brand logo and navigation links", () => {
    render(<AppProviders><Header /></AppProviders>);
    expect(screen.getByLabelText(siteConfig.brand.name)).toBeInTheDocument();

    siteConfig.navigation.links.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("passes iconOnly prop to logo when iconOnly is set", () => {
    const { container } = render(<AppProviders><Header iconOnly /></AppProviders>);
    expect(screen.getByLabelText(siteConfig.brand.name)).toBeInTheDocument();
    expect(container.querySelector("span.font-extrabold")).not.toBeInTheDocument();
  });

  it("renders sign-in action when signed out, and opens settings dialog with settings icon button", async () => {
    render(<AppProviders><Header /></AppProviders>);
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();

    const user = userEvent.setup();
    const settingsBtn = screen.getByRole("button", { name: /settings/i });
    expect(settingsBtn).toBeInTheDocument();

    await user.click(settingsBtn);

    expect(screen.getByRole("dialog", { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByText(/appearance/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign out & clear/i })).toBeInTheDocument();
  });

  it("opens Sign Out & Clear Data confirm dialog when button is clicked inside settings", async () => {
    render(<AppProviders><Header /></AppProviders>);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /settings/i }));
    await user.click(screen.getByRole("button", { name: /sign out & clear/i }));

    expect(screen.getByRole("dialog", { name: /sign out & clear data\?/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign out & clear data/i })).toBeInTheDocument();
  });

  it("replaces sign-in actions with account link when authenticated", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ authenticated: true }),
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<AppProviders><Header /></AppProviders>);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /account/i })).toBeInTheDocument();
    });

    expect(screen.queryByRole("link", { name: /sign in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^sign out$/i })).not.toBeInTheDocument();
  });

  it("updates background styling on scroll", async () => {
    const { container } = render(<AppProviders><Header /></AppProviders>);
    const header = container.querySelector("header");
    expect(header).toHaveClass("bg-transparent");

    await waitFor(() => {
      expect(header).toBeInTheDocument();
    });

    // Simulate scroll
    window.scrollY = 50;
    act(() => {
      fireEvent.scroll(window);
    });
    expect(header).toHaveClass("bg-white/95");
  });
});
