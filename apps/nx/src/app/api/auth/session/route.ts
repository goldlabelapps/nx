import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@goldlabelapps/saas/auth/session";
import { firebaseAdminAuth } from "@/lib/firebase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_TTL_MS = 60 * 60 * 24 * 5 * 1000;

export async function GET(request: NextRequest) {
  const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  return NextResponse.json({ authenticated: hasSessionCookie });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { idToken?: string };
    const idToken = body.idToken;

    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken, true);
    const sessionCookie = await firebaseAdminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_TTL_MS,
    });

    // Automatically sync flattened Auth user info to Firestore 'users' collection
    const { syncUserToFirestore } = await import("@/lib/firebase/userSync");
    await syncUserToFirestore(decodedToken.uid);

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Unable to create authenticated session" }, { status: 401 });
  }
}
