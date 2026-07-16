import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "4e67e0472eaa4cc0a2963c678efa9d5c";
const SITE_HOST = "marko-sarafijanovic.com";

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls array required" }, { status: 400 });
    }

    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    return NextResponse.json({
      status: response.status,
      submitted: urls,
      message:
        response.status === 200
          ? "URLs submitted successfully"
          : response.status === 202
          ? "URLs accepted for processing"
          : `IndexNow returned ${response.status}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
