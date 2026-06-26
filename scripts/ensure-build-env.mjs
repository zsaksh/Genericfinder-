import { existsSync, readFileSync, writeFileSync } from "node:fs";

const fallbackDatabaseUrl = "postgresql://genericfinder:genericfinder@localhost:5432/genericfinder?schema=public";
const fallbackSiteUrl = "http://localhost:3000";
const envPath = ".env";
const existing = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
const additions = [];

if (!process.env.DATABASE_URL && !/^DATABASE_URL=/m.test(existing)) {
  additions.push(`DATABASE_URL="${fallbackDatabaseUrl}"`);
}

if (!process.env.NEXT_PUBLIC_SITE_URL && !/^NEXT_PUBLIC_SITE_URL=/m.test(existing)) {
  additions.push(`NEXT_PUBLIC_SITE_URL="${fallbackSiteUrl}"`);
}

if (additions.length) {
  const next = [existing.trim(), ...additions].filter(Boolean).join("\n") + "\n";
  writeFileSync(envPath, next);
  console.warn("GenericFinder build: wrote safe local fallback values to .env for build-time generation. Configure real production variables in Vercel before using live data.");
}
