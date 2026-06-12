import { medicines, plans } from "@/lib/sample-data";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 86400;
export async function GET() {
  const staticPaths = ["", "/search", "/savings", "/sources", "/about", "/privacy", "/terms"];
  const urls = [
    ...staticPaths,
    ...medicines.flatMap((medicine) => [`/medicine/${medicine.slug}`, `/generic/${medicine.slug}`, `/substitutes/${medicine.slug}`]),
    ...plans.map((plan) => `/insurance/${plan.slug}`),
    "/compare/lipitor-vs-crestor",
    "/compare/lipitor-vs-zocor"
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${absoluteUrl(path)}</loc><changefreq>weekly</changefreq><priority>${path === "" ? "1.0" : "0.7"}</priority></url>`).join("")}</urlset>`;
  return new Response(xml, { headers: { "content-type": "application/xml" } });
}
