import { NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/analytics";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = analyticsEventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid analytics event" }, { status: 400 });
  console.info("analytics_event", parsed.data);
  return NextResponse.json({ ok: true });
}
