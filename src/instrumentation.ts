export async function register() {
  if (process.env.VERCEL === "1" && process.env.NODE_ENV === "production") {
    setTimeout(async () => {
      try {
        await fetch(
          `https://marko-sarafijanovic.com/api/indexnow?secret=${process.env.INDEXNOW_SECRET || ""}`
        );
        console.log("[IndexNow] Auto-submitted all URLs after deploy");
      } catch (error) {
        console.error("[IndexNow] Auto-submit after deploy failed:", error);
      }
    }, 10000);
  }
}
