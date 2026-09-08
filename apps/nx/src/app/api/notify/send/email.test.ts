import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock resend before importing route/email module
vi.mock("resend", () => {
  return {
    Resend: class {
      emails = {
        send: vi.fn().mockResolvedValue({ data: { id: "resend_mock_id_123" }, error: null }),
      };
    },
  };
});

import { POST } from "./route";
import { sendEmail, sendNewUserNotification } from "@/lib/email";

describe("Email API & Helper", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_mock_key";
    vi.clearAllMocks();
  });

  describe("sendEmail helper", () => {
    it("sends email to default owner address if no recipient provided", async () => {
      const result = await sendEmail({
        subject: "Test Subject",
        text: "Test content",
      });

      expect(result.data).toEqual({ id: "resend_mock_id_123" });
    });

    it("sends new user notification to owner@goldlabel.pro", async () => {
      const result = await sendNewUserNotification({
        uid: "user_abc_123",
        email: "newuser@example.com",
        displayName: "John Doe",
      });

      expect(result.data).toEqual({ id: "resend_mock_id_123" });
    });
  });

  describe("POST /api/notify/send route", () => {
    it("handles user.created event payload", async () => {
      const req = new Request("http://localhost:4500/api/notify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "user.created",
          user: {
            uid: "uid_999",
            email: "testuser@example.com",
            displayName: "Test User",
          },
        }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.event).toBe("user.created");
      expect(json.data.id).toBe("resend_mock_id_123");
    });

    it("returns 400 when missing subject for generic email", async () => {
      const req = new Request("http://localhost:4500/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toContain("Missing required parameter: subject");
    });
  });
});
