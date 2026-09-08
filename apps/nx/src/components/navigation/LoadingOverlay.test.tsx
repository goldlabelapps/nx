/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadingOverlayContent } from "./LoadingOverlay";

let currentPathname = "/";
let currentSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
  useSearchParams: () => currentSearchParams,
}));

describe("LoadingOverlay component", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    currentPathname = "/";
    currentSearchParams = new URLSearchParams();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("does not render by default when not loading", () => {
    render(<LoadingOverlayContent />);
    expect(screen.queryByRole("dialog", { name: /loading page/i })).not.toBeInTheDocument();
  });

  it("shows overlay when an internal anchor link is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <>
        <LoadingOverlayContent timeoutMs={4000} />
        <a href="/docs">Docs</a>
      </>
    );

    const link = screen.getByRole("link", { name: /docs/i });
    await act(async () => {
      await user.click(link);
    });

    expect(screen.getByRole("dialog", { name: /loading page/i })).toBeInTheDocument();
  });

  it("does not show overlay for external links, target='_blank', or hash anchors on the same page", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <>
        <LoadingOverlayContent />
        <a href="https://example.com">External</a>
        <a href="/target-blank" target="_blank" rel="noreferrer">Blank</a>
        <a href="#contact">Anchor</a>
      </>
    );

    await act(async () => {
      await user.click(screen.getByRole("link", { name: /external/i }));
    });
    expect(screen.queryByRole("dialog", { name: /loading page/i })).not.toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole("link", { name: /blank/i }));
    });
    expect(screen.queryByRole("dialog", { name: /loading page/i })).not.toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole("link", { name: /anchor/i }));
    });
    expect(screen.queryByRole("dialog", { name: /loading page/i })).not.toBeInTheDocument();
  });

  it("automatically dismisses the overlay after safety timeout", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <>
        <LoadingOverlayContent timeoutMs={3000} />
        <a href="/pricing">Pricing</a>
      </>
    );

    await act(async () => {
      await user.click(screen.getByRole("link", { name: /pricing/i }));
    });
    expect(screen.getByRole("dialog", { name: /loading page/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3001);
    });

    expect(screen.queryByRole("dialog", { name: /loading page/i })).not.toBeInTheDocument();
  });

  it("dismisses overlay when pathname changes", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { rerender } = render(
      <>
        <LoadingOverlayContent timeoutMs={5000} />
        <a href="/articles">Articles</a>
      </>
    );

    await act(async () => {
      await user.click(screen.getByRole("link", { name: /articles/i }));
    });
    expect(screen.getByRole("dialog", { name: /loading page/i })).toBeInTheDocument();

    // Simulate route navigation finished
    currentPathname = "/articles";
    act(() => {
      rerender(
        <>
          <LoadingOverlayContent timeoutMs={5000} />
          <a href="/articles">Articles</a>
        </>
      );
    });

    expect(screen.queryByRole("dialog", { name: /loading page/i })).not.toBeInTheDocument();
  });
});
