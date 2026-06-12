import { NextResponse } from "next/server";
import { searchMedicines } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return NextResponse.json({ results: searchMedicines(searchParams.get("q") || "") });
}
