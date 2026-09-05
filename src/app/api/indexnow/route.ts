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

function isVercelCron(request: NextRequest): boolean {
  // Vercel Cron invocations carry the x-vercel-cron header (scheduled
  // runs) or x-vercel-cron-preview (manual "Run" from the dashboard).
  // Checked by PRESENCE, not exact value — the header's value has varied
  // across Vercel versions ("true", "1", the schedule string), and an
  // exact match like === "true" can silently 401 the cron.
  const cronHeader =
    request.headers.get("x-vercel-cron") ??
    request.headers.get("x-vercel-cron-preview");
  return Boolean(cronHeader);
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
  // Vercel Cron passes via its header; everyone else needs the secret
  // (if one is configured).
  if (!isVercelCron(request) && INDEXNOW_SECRET && !isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await submitToIndexNow();
  return NextResponse.json({ message: "All site URLs submitted to IndexNow" });
}
