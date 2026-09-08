import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FreshVisitorBanner } from "./FreshVisitorBanner";

const mockReplace = vi.fn();
let mockResetParam: string | null = null;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "reset" ? mockResetParam : null),
  }),
  usePathname: () => "/",
}));

describe("FreshVisitorBanner Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockResetParam = null;
  });

  it("does not render when reset query param is not true", () => {
    render(<FreshVisitorBanner />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders welcome message banner when reset=true", () => {
    mockResetParam = "true";
    render(<FreshVisitorBanner />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/brand new visitor/i)).toBeInTheDocument();
  });

  it("dismisses message when close button is clicked", async () => {
    mockResetParam = "true";
    const user = userEvent.setup();
    render(<FreshVisitorBanner />);

    const dismissBtn = screen.getByRole("button", { name: /dismiss message/i });
    await user.click(dismissBtn);

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
        expect(mockReplace).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
