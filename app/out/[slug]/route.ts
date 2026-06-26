import { NextResponse } from "next/server";
import { getPlan } from "@/lib/data";
import { logger } from "@/lib/logger";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const plan = getPlan(params.slug);
  const { searchParams } = new URL(request.url);
  if (!plan) return NextResponse.redirect(new URL("/insurance", request.url));

  logger.info("click_affiliate", {
    planSlug: plan.slug,
    provider: plan.provider,
    medicineSlug: searchParams.get("medicine"),
    sponsored: plan.sponsored
  });

  return NextResponse.redirect(plan.affiliateUrl, { status: 302 });
}
