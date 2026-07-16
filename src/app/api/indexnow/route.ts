import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls array required" }, { status: 400 });
    }

    await submitToIndexNow(urls);
    return NextResponse.json({ submitted: urls });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

export async function GET() {
  await submitToIndexNow();
  return NextResponse.json({ message: "All site URLs submitted to IndexNow" });
}
