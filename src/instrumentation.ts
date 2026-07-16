export async function register() {
  // Only run on Vercel, only in production
  if (process.env.VERCEL === "1" && process.env.NODE_ENV === "production") {
    // Wait 10 seconds for the site to be fully live
    setTimeout(async () => {
      try {
        await fetch("https://marko-sarafijanovic.com/api/indexnow");
        console.log("[IndexNow] Auto-submitted all URLs after deploy");
      } catch (error) {
        console.error("[IndexNow] Auto-submit after deploy failed:", error);
      }
    }, 10000);
  }
}
