import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DownloadBanner } from "./DownloadBanner";
import { siteConfig } from "@/config";

vi.mock("canvas-confetti", () => {
  return {
    default: vi.fn(),
  };
});

describe("DownloadBanner / AuthCtaBanner component", () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });
  });

  it("renders GitHub advert CTAs and copyable CLI command", () => {
    render(<DownloadBanner />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(siteConfig.authCta.title);
    expect(screen.getByRole("link", { name: new RegExp(siteConfig.authCta.primaryCta.label, "i") })).toBeInTheDocument();
    expect(screen.getByText(siteConfig.authCta.secondaryCta.label)).toBeInTheDocument();
  });

  it("copies CLI installation command", async () => {
    render(<DownloadBanner />);

    const copyBtn = screen.getByRole("button", { name: /copy/i });
    fireEvent.click(copyBtn);
    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(
        expect.stringContaining(siteConfig.authCta.cliQuickInstall.command)
      );
    });
  });
});
