import { NextResponse } from "next/server";
import { getAllGuides } from "@/lib/markdown";

export async function GET() {
  try {
    const guides = getAllGuides();
    return NextResponse.json({ guides });
  } catch (error) {
    return NextResponse.json({ guides: [], error: String(error) }, { status: 500 });
  }
}
