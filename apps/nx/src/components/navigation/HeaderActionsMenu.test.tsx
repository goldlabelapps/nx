import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeaderActionsMenu } from "./HeaderActionsMenu";
import { AppProviders } from "@/components/providers/AppProviders";

describe("HeaderActionsMenu", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("closes the settings dialog when the theme mode is switched", async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <HeaderActionsMenu />
      </AppProviders>
    );

    // Open settings dialog
    const settingsButton = screen.getByRole("button", { name: /settings/i });
    await user.click(settingsButton);

    // Verify dialog is open
    expect(screen.getByRole("dialog", { name: /settings/i })).toBeInTheDocument();

    // Click light theme option
    const lightRadio = screen.getByRole("radio", { name: /light/i });
    await user.click(lightRadio);

    // Verify settings dialog is closed
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /settings/i })).not.toBeInTheDocument();
    });
  });
});
