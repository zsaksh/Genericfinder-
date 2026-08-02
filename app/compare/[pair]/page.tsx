import { notFound } from "next/navigation";
import Link from "next/link";
import { MedicalDisclaimer } from "@/components/disclaimer";
import { getMedicine } from "@/lib/data";
import { medicines } from "@/lib/sample-data";
import { siteMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() { return [{ pair: "lipitor-vs-crestor" }, { pair: "lipitor-vs-zocor" }, { pair: "atorvastatin-vs-crestor" }]; }
export function generateMetadata({ params }: { params: { pair: string } }) {
  const [a, b] = params.pair.split("-vs-").map(getMedicine);
  return a && b ? siteMetadata({ title: `${a.brandName} vs ${b.brandName}`, description: `Compare ingredients, class, prices, generic status, and coverage guidance for ${a.brandName} and ${b.brandName}.`, path: `/compare/${params.pair}` }) : {};
}
export default function ComparePage({ params }: { params: { pair: string } }) {
  const [leftSlug, rightSlug] = params.pair.split("-vs-"); const left = getMedicine(leftSlug); const right = getMedicine(rightSlug); if (!left || !right) notFound();
  return <section className="container-pad py-10"><p className="eyebrow">Medicine comparison</p><h1 className="mt-3 font-serif text-5xl font-semibold">{left.brandName} vs {right.brandName}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">Side-by-side reference for generic status, ingredients, classes, prices, and source freshness. This is not a recommendation to switch.</p><div className="mt-8"><MedicalDisclaimer /></div><div className="mt-10 overflow-hidden rounded-organic border border-ink/10 bg-paper shadow-card"><table className="data-table w-full text-sm"><thead><tr><th>Field</th><th>{left.brandName}</th><th>{right.brandName}</th></tr></thead><tbody><tr><td>Generic</td><td>{left.genericName}</td><td>{right.genericName}</td></tr><tr><td>Active ingredient</td><td>{left.activeIngredients.join(", ")}</td><td>{right.activeIngredients.join(", ")}</td></tr><tr><td>Drug class</td><td>{left.drugClass}</td><td>{right.drugClass}</td></tr><tr><td>Strengths</td><td>{left.strengths.join(", ")}</td><td>{right.strengths.join(", ")}</td></tr><tr><td>Cash estimate</td><td>{formatCurrency(left.approximateCashPrice)}</td><td>{formatCurrency(right.approximateCashPrice)}</td></tr><tr><td>Freshness</td><td>{left.freshness}</td><td>{right.freshness}</td></tr></tbody></table></div><div className="mt-8 flex gap-4"><Link href={`/medicine/${left.slug}`} className="font-semibold text-moss">View {left.brandName}</Link><Link href={`/medicine/${right.slug}`} className="font-semibold text-moss">View {right.brandName}</Link></div></section>;
}
