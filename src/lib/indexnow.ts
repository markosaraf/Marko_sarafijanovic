const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "4e67e0472eaa4cc0a2963c678efa9d5c";
const SITE_HOST = "marko-sarafijanovic.com";

// All known pages on your site — add new URLs here when you create new pages
const SITE_URLS: string[] = [
  "https://marko-sarafijanovic.com",
  "https://marko-sarafijanovic.com/Why-allow-Tesla-FSD-Supervised",
  // 👆 Add new page URLs here as you create them
];

export async function submitToIndexNow(urls?: string[]): Promise<void> {
  const urlList = urls || SITE_URLS;

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    console.log(
      `[IndexNow] Submitted ${urlList.length} URL(s) — Status: ${response.status}`
    );
  } catch (error) {
    console.error("[IndexNow] Submission failed:", error);
  }
}

// Shortcut: submit a single URL (great for calling from server actions)
export async function submitUrlToIndexNow(url: string): Promise<void> {
  return submitToIndexNow([url]);
}
