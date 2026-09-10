import { describe, expect, it } from "vitest";
import { checkEnv } from "../src/env.js";

describe("CLI Environment Validator", () => {
  it("detects current node version and system environment", () => {
    const env = checkEnv();
    expect(env.node.major).toBeGreaterThanOrEqual(18);
    expect(env.node.supported).toBe(true);
    expect(env.os.platform).toBeDefined();
    expect(env.packageManagers.preferred).toBeDefined();
  });
});
