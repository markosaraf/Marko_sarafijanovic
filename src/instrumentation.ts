import { submitToIndexNow } from "@/lib/indexnow";

export async function register() {
  if (process.env.VERCEL === "1" && process.env.NODE_ENV === "production") {
    try {
      await submitToIndexNow();
      console.log("[IndexNow] Auto-submitted all URLs after deploy");
    } catch (error) {
      console.error("[IndexNow] Auto-submit after deploy failed:", error);
    }
  }
}
