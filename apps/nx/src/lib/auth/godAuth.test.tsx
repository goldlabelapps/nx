import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { isGod } from "./godAuth";
import { GodOnly } from "@/components/auth/GodOnly";

const mockUser = { uid: "Rgwri060rDaylB5wVQ0YgutYAu62" };
let currentAuthState: { uid: string } | null = mockUser;

vi.mock("@/lib/firebase/client", () => ({
  getFirebaseClientAuth: () => ({}),
}));

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (_auth: unknown, callback: (user: unknown) => void) => {
    callback(currentAuthState);
    return () => {};
  },
}));

describe("Superuser (isGod) Utilities", () => {
  const originalEnv = process.env.NEXT_PUBLIC_GOD;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_GOD = "Rgwri060rDaylB5wVQ0YgutYAu62";
    currentAuthState = mockUser;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_GOD = originalEnv;
  });

  describe("isGod function", () => {
    it("returns true for matching UID string", () => {
      expect(isGod("Rgwri060rDaylB5wVQ0YgutYAu62")).toBe(true);
    });

    it("returns true for user object with matching uid property", () => {
      expect(isGod({ uid: "Rgwri060rDaylB5wVQ0YgutYAu62" })).toBe(true);
    });

    it("returns false for non-matching UID", () => {
      expect(isGod("regular-user-uid-123")).toBe(false);
      expect(isGod({ uid: "regular-user-uid-123" })).toBe(false);
    });

    it("returns false for null, undefined, or empty values", () => {
      expect(isGod(null)).toBe(false);
      expect(isGod(undefined)).toBe(false);
      expect(isGod("")).toBe(false);
    });

    it("returns false if NEXT_PUBLIC_GOD is empty or not set", () => {
      process.env.NEXT_PUBLIC_GOD = "";
      expect(isGod("Rgwri060rDaylB5wVQ0YgutYAu62")).toBe(false);
    });
  });

  describe("GodOnly component", () => {
    it("renders children when authenticated user is God", () => {
      currentAuthState = { uid: "Rgwri060rDaylB5wVQ0YgutYAu62" };

      render(
        <GodOnly fallback={<div>Access Denied</div>}>
          <div>Superuser Secret Controls</div>
        </GodOnly>
      );

      expect(screen.getByText("Superuser Secret Controls")).toBeInTheDocument();
      expect(screen.queryByText("Access Denied")).not.toBeInTheDocument();
    });

    it("renders fallback when user is a normal user", () => {
      currentAuthState = { uid: "normal-user-uid-999" };

      render(
        <GodOnly fallback={<div>Access Denied</div>}>
          <div>Superuser Secret Controls</div>
        </GodOnly>
      );

      expect(screen.queryByText("Superuser Secret Controls")).not.toBeInTheDocument();
      expect(screen.getByText("Access Denied")).toBeInTheDocument();
    });

    it("renders fallback when user is unauthenticated (null)", () => {
      currentAuthState = null;

      render(
        <GodOnly fallback={<div>Please Sign In</div>}>
          <div>Superuser Secret Controls</div>
        </GodOnly>
      );

      expect(screen.queryByText("Superuser Secret Controls")).not.toBeInTheDocument();
      expect(screen.getByText("Please Sign In")).toBeInTheDocument();
    });
  });

  describe("useGod hook", () => {
    it("exports useGod and useIsGod hooks", async () => {
      const { useGod } = await import("@/hooks/useGod");
      const { useIsGod } = await import("@/hooks/useIsGod");
      expect(useGod).toBe(useIsGod);
    });
  });
});

