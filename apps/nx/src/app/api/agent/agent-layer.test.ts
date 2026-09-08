import { describe, it, expect } from "vitest";
import { GET as knowledgeGet } from "./knowledge/route";
import { POST as executePost } from "./execute/route";
import { templateAgentManifest } from "@/config/agent-layer.config";
import { GET as wellKnownGet } from "../../.well-known/agent-layer.json/route";

describe("Agent Layer Endpoints", () => {
  it("serves agent manifest at GET /.well-known/agent-layer.json", async () => {
    const req = new Request("http://localhost:4500/.well-known/agent-layer.json", {
      method: "GET",
    });
    const res = await wellKnownGet(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe(templateAgentManifest.name);
    expect(body.specVersion).toBe("1.0.0");
    expect(body.capabilities).toBeDefined();
    expect(body.knowledge).toBeDefined();
  });

  it("serves knowledge graph at GET /api/agent/knowledge", async () => {
    const req = new Request("http://localhost:4500/api/agent/knowledge", {
      method: "GET",
    });
    const res = await knowledgeGet(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.domainName).toBeDefined();
    expect(Array.isArray(body.entities)).toBe(true);
    expect(Array.isArray(body.relations)).toBe(true);
    expect(body.entities.some((e: { id: string }) => e.id === "app-identity")).toBe(true);
  });

  it("executes get_site_info action at POST /api/agent/execute", async () => {
    const req = new Request("http://localhost:4500/api/agent/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get_site_info" }),
    });
    const res = await executePost(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.name).toBeDefined();
    expect(body.data.tagline).toBeDefined();
  });

  it("executes get_features action with tag filter", async () => {
    const req = new Request("http://localhost:4500/api/agent/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get_features", input: { tag: "Theming" } }),
    });
    const res = await executePost(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.items.length).toBeGreaterThan(0);
    expect(body.data.items[0].tag).toBe("Theming");
  });
});
