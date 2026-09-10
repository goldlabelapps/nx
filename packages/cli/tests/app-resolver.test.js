import { describe, expect, it } from "vitest";
import { resolveApp } from "../src/commands/dev.js";
import { slugifyAppName } from "../src/commands/create.js";

describe("CLI App Resolver", () => {
  it("creates URL-safe folder slugs from app names", () => {
    expect(slugifyAppName("Acme's Great App!")).toBe("acme-s-great-app");
    expect(slugifyAppName("Cafe Del Mar")).toBe("cafe-del-mar");
  });

  it("resolves exact app keys and aliases", () => {
    expect(resolveApp("www")).toBeNull();
    expect(resolveApp("microsite")).toBeNull();
    expect(resolveApp("goldlabel")).toBeNull();
    expect(resolveApp("gold")).toBeNull();
    expect(resolveApp("gl")).toBeNull();
    expect(resolveApp("nx")?.port).toBe(4500);
    expect(resolveApp("template")?.port).toBe(4500);
    expect(resolveApp("starter")?.port).toBe(4500);
    expect(resolveApp("tpl")?.port).toBe(4500);
    expect(resolveApp("prospects")).toBeNull();
    expect(resolveApp("echopay")).toBeNull();
    expect(resolveApp("storybook")).toBeNull();
    expect(resolveApp("ds")).toBeNull();
    expect(resolveApp("nonexistent")).toBeNull();
  });
});
