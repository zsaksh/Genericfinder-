import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { rankMedicineMatches, searchMedicineRecords } from "@/lib/search";

export async function GET(request: Request) {
  const rate = rateLimit(`search:${clientKey(request)}`, 90, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: "Too many search requests" }, { status: 429 });

  const { searchParams } = new URL(request.url);
  const filters = {
    q: searchParams.get("q") || undefined,
    drugClass: searchParams.get("drugClass") || undefined,
    form: searchParams.get("form") || undefined,
    generic: (searchParams.get("generic") as "true" | "false" | "any" | null) || undefined,
    covered: (searchParams.get("covered") as "true" | "false" | "any" | null) || undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
  };
  const results = rankMedicineMatches(searchMedicineRecords(filters), filters.q);
  logger.info("api_search_medicine", { filters, count: results.length });
  return NextResponse.json({ results, freshness: "demo-cache", remaining: rate.remaining });
}
