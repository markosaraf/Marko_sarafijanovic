import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

const INDEXNOW_SECRET = process.env.INDEXNOW_SECRET || "";

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${INDEXNOW_SECRET}`) return true;

  const url = new URL(request.url);
  if (url.searchParams.get("secret") === INDEXNOW_SECRET) return true;

  return false;
}

export async function POST(request: NextRequest) {
  if (INDEXNOW_SECRET && !isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

export async function GET(request: NextRequest) {
  if (INDEXNOW_SECRET && !isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await submitToIndexNow();
  return NextResponse.json({ message: "All site URLs submitted to IndexNow" });
}
