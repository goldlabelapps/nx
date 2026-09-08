import { NextResponse } from "next/server";
import { sendEmail, sendNewUserNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, user, to, subject, html, text } = body;

    // Handle specific event: user.created
    if (event === "user.created") {
      if (!user || !user.uid) {
        return NextResponse.json(
          { error: "Missing required user object or user.uid for 'user.created' event" },
          { status: 400 }
        );
      }

      const result = await sendNewUserNotification(user);
      if (result.error) {
        return NextResponse.json(
          { error: result.error.message || "Failed to send user creation email via Resend" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, event: "user.created", data: result.data });
    }

    // Generic email sending fallback
    if (!subject) {
      return NextResponse.json(
        { error: "Missing required parameter: subject" },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to: to || "owner@goldlabel.pro",
      subject,
      html,
      text,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message || "Failed to send email via Resend" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error: unknown) {
    console.error("[API /api/notify/send] Error processing email request:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
