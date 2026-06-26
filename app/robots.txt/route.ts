import { absoluteUrl } from "@/lib/utils";

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`, { headers: { "content-type": "text/plain" } });
}
