import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("renders segmented control with Light, Dark, and System options with Light active by default", () => {
    render(
      <ThemeProvider>
        <ThemeToggle variant="segmented" />
      </ThemeProvider>
    );

    const systemRadio = screen.getByRole("radio", { name: /system/i });
    const lightRadio = screen.getByRole("radio", { name: /light/i });
    const darkRadio = screen.getByRole("radio", { name: /dark/i });

    expect(systemRadio).toBeInTheDocument();
    expect(lightRadio).toBeInTheDocument();
    expect(darkRadio).toBeInTheDocument();

    expect(lightRadio).toHaveAttribute("aria-checked", "true");
    expect(darkRadio).toHaveAttribute("aria-checked", "false");
    expect(systemRadio).toHaveAttribute("aria-checked", "false");
  });

  it("switches theme mode when option is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ThemeProvider>
        <ThemeToggle variant="segmented" onChange={handleChange} />
      </ThemeProvider>
    );

    const darkRadio = screen.getByRole("radio", { name: /dark/i });
    await user.click(darkRadio);

    expect(darkRadio).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(handleChange).toHaveBeenCalledWith("dark");
  });
});

