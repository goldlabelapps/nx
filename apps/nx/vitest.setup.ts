import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// Mock HTMLCanvasElement offsetWidth, offsetHeight and 2D context
Object.defineProperty(HTMLCanvasElement.prototype, "offsetWidth", {
  get() {
    return 1200;
  },
});

Object.defineProperty(HTMLCanvasElement.prototype, "offsetHeight", {
  get() {
    return 800;
  },
});

HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => {
  return {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fillStyle: "#fff",
    strokeStyle: "#fff",
    globalAlpha: 1,
    lineWidth: 1,
    shadowBlur: 0,
    shadowColor: "",
  };
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Mock Clipboard API on Navigator prototype
const writeTextMock = vi.fn().mockResolvedValue(undefined);
const readTextMock = vi.fn().mockResolvedValue("");

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: writeTextMock,
    readText: readTextMock,
  },
  writable: true,
  configurable: true,
});

// Mock window.scrollTo
window.scrollTo = vi.fn();
