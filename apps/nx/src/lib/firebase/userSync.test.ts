import { describe, it, expect, vi } from "vitest";

vi.mock("./admin", () => ({
  firebaseAdminAuth: {
    getUser: vi.fn().mockResolvedValue({
      uid: "test-uid-123",
      email: "jane@example.com",
      emailVerified: true,
      displayName: "Jane Doe",
      photoURL: "https://example.com/avatar.jpg",
      phoneNumber: "+15551234567",
      disabled: false,
      providerData: [{ providerId: "google.com" }],
      metadata: {
        creationTime: "Wed, 02 Sep 2026 12:00:00 GMT",
        lastSignInTime: "Wed, 02 Sep 2026 19:00:00 GMT",
      },
    }),
  },
  firebaseAdminFirestore: {
    collection: vi.fn().mockReturnValue({
      doc: vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false }),
        set: vi.fn().mockResolvedValue(true),
      }),
    }),
  },
}));

import { syncUserToFirestore } from "./userSync";

describe("syncUserToFirestore", () => {
  it("flattens Firebase auth user object and syncs to users collection", async () => {
    const result = await syncUserToFirestore("test-uid-123");

    expect(result).not.toBeNull();
    expect(result?.uid).toBe("test-uid-123");
    expect(result?.email).toBe("jane@example.com");
    expect(result?.displayName).toBe("Jane Doe");
    expect(result?.photoURL).toBe("https://example.com/avatar.jpg");
    expect(result?.phoneNumber).toBe("+15551234567");
    expect(result?.providerIds).toEqual(["google.com"]);
    expect(result?.emailVerified).toBe(true);
  });
});
