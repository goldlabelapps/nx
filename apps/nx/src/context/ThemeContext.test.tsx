import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme, useSystemTheme } from "./ThemeContext";

function TestConsumer() {
  const { mode, theme, setMode } = useTheme();
  const systemTheme = useSystemTheme();
  return (
    <div>
      <span data-testid="current-mode">{mode}</span>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="system-theme">{systemTheme}</span>
      <button onClick={() => setMode("dark")}>Set Dark</button>
      <button onClick={() => setMode("light")}>Set Light</button>
      <button onClick={() => setMode("system")}>Set System</button>
    </div>
  );
}

describe("ThemeContext & ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("defaults to configured theme mode ('light') and resolves theme accordingly", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-mode").textContent).toBe("light");
    expect(screen.getByTestId("current-theme").textContent).toBe("light");
  });

  it("restores a persisted light mode from localStorage", () => {
    localStorage.setItem("theme", "light");

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-mode").textContent).toBe("light");
    expect(screen.getByTestId("current-theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("swaps between light, dark, and system mode and persists the choice", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-mode").textContent).toBe("light");

    await user.click(screen.getByText("Set Light"));
    expect(screen.getByTestId("current-mode").textContent).toBe("light");
    expect(screen.getByTestId("current-theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");

    await user.click(screen.getByText("Set Dark"));
    expect(screen.getByTestId("current-mode").textContent).toBe("dark");
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    await user.click(screen.getByText("Set System"));
    expect(screen.getByTestId("current-mode").textContent).toBe("system");
    expect(localStorage.getItem("theme")).toBe("system");
  });
});

