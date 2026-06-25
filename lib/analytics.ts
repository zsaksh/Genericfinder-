import { z } from "zod";

export const analyticsEventSchema = z.object({
  event: z.enum(["search_medicine", "view_medicine", "compare_medicine", "view_plan", "click_affiliate", "apply_plan"]),
  entitySlug: z.string().optional(),
  metadata: z.record(z.unknown()).optional()
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

export async function trackEvent(input: AnalyticsEventInput) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("genericfinder:event", { detail: input }));
  await fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
    keepalive: true
  }).catch(() => undefined);
}
