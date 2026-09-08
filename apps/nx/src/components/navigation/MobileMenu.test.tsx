import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "./MobileMenu";
import { siteConfig } from "@/config";

function getFirstDropdownTitle(item: NavItem): string {
  if (!item.dropdown || item.dropdown.length === 0) {
    return "";
  }

  const first = item.dropdown[0] as DropdownItem | DropdownGroup;
  if ("title" in first) {
    return first.title;
  }

  return first.items[0]?.title || "";
}

describe("MobileMenu component", () => {
  it("renders menu trigger button and opens mobile navigation drawer", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    const toggleBtn = screen.getByLabelText(/toggle navigation menu/i);
    expect(toggleBtn).toBeInTheDocument();

    await user.click(toggleBtn);

    const drawer = screen.getByTestId("mobile-menu-drawer");
    expect(drawer).toBeInTheDocument();

    // Should reveal links
    siteConfig.navigation.links.forEach((link) => {
      expect(within(drawer).getAllByText(link.label)[0]).toBeInTheDocument();
    });

    // Expand dropdown accordion if any link has a dropdown
    const firstDropdownNav = siteConfig.navigation.links.find((item) => item.dropdown?.length);
    if (firstDropdownNav) {
      const dropdownTrigger = within(drawer).getByRole("button", { name: firstDropdownNav.label });
      await user.click(dropdownTrigger);

      const firstDropdownTitle = getFirstDropdownTitle(firstDropdownNav);
      expect(screen.getByText(firstDropdownTitle)).toBeInTheDocument();
    }
  });

  it("handles controlled mode with onToggle and onClose callbacks", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();
    const handleClose = vi.fn();

    const { rerender } = render(
      <MobileMenu isOpen={false} onToggle={handleToggle} onClose={handleClose} />
    );

    const toggleBtn = screen.getByLabelText(/toggle navigation menu/i);
    await user.click(toggleBtn);
    expect(handleToggle).toHaveBeenCalledTimes(1);

    // Re-render as open
    rerender(<MobileMenu isOpen={true} onToggle={handleToggle} onClose={handleClose} />);
    expect(screen.getByTestId("mobile-menu-drawer")).toBeInTheDocument();
  });

  it("resets expanded accordion sections when menu is closed", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<MobileMenu isOpen={true} />);

    const drawer = screen.getByTestId("mobile-menu-drawer");
    const dropdownNav = siteConfig.navigation.links.find((item) => item.dropdown?.length);

    if (dropdownNav) {
      const dropdownTrigger = within(drawer).getByRole("button", { name: dropdownNav.label });
      await user.click(dropdownTrigger);

      const firstTitle = getFirstDropdownTitle(dropdownNav);
      expect(screen.getByText(firstTitle)).toBeInTheDocument();

      // Close menu
      rerender(<MobileMenu isOpen={false} />);
      // Re-open menu
      rerender(<MobileMenu isOpen={true} />);

      // Expanded content should be reset (collapsed)
      expect(screen.queryByText(firstTitle)).not.toBeInTheDocument();
    }
  });
});
