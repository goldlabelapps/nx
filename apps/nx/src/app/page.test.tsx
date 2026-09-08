import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  useSearchParams: () => ({ get: () => null }),
  usePathname: () => "/",
}));

vi.mock("@/components/hero/ParticleCanvas", () => ({
  ParticleCanvas: () => <div data-testid="mock-particle-canvas" />,
}));

vi.mock("@goldlabelapps/flash", () => ({
  CleverText: ({ text }: { text: string }) => <span>{text}</span>,
}));

import ExperiencePage from "./experience/page";

describe("HomePage assembly", () => {
  it("renders home page with hero search bar section", () => {
    render(<HomePage />);
    expect(screen.queryByText("Instant Search • 20+ Years Web Development")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search 20\+ years/i)).toBeInTheDocument();
  });

  it("renders static /experience page with ErasTimeline component", () => {
    render(<ExperiencePage />);
    expect(screen.getByText(/every era/i)).toBeInTheDocument();
  });
});
