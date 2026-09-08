import { describe, it, expect, vi, afterEach } from "vitest";
import { cn, detectUserOS } from "./utils";

describe("cn utility function", () => {
  it("merges class names cleanly and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "bg-blue-500")).toBe("px-2 py-1 bg-blue-500");
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", undefined, null, false, "text-blue-500")).toBe("text-blue-500");
  });
});

describe("detectUserOS utility", () => {
  const originalUserAgent = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      value: originalUserAgent,
      configurable: true,
      writable: true,
    });
    vi.restoreAllMocks();
  });

  it("detects macOS Apple Silicon by default or MacIntel with touch support", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, "maxTouchPoints", {
      value: 5,
      configurable: true,
      writable: true,
    });

    expect(detectUserOS()).toBe("macos-silicon");
  });

  it("detects Windows OS from userAgent", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, "maxTouchPoints", {
      value: 0,
      configurable: true,
      writable: true,
    });

    expect(detectUserOS()).toBe("windows");
  });

  it("detects Linux OS from userAgent", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (X11; Linux x86_64)",
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, "maxTouchPoints", {
      value: 0,
      configurable: true,
      writable: true,
    });

    expect(detectUserOS()).toBe("linux");
  });
});
