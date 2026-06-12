import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalDisclaimer } from "@/components/disclaimer";
import { getMedicine, getRelatedMedicines } from "@/lib/data";
import { medicines } from "@/lib/sample-data";
import { siteMetadata } from "@/lib/seo";

export function generateStaticParams() { return medicines.map((medicine) => ({ slug: medicine.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const medicine = getMedicine(params.slug);
  return medicine ? siteMetadata({ title: `${medicine.brandName} substitutes and alternatives`, description: `Review same-ingredient medicines and therapeutic alternatives for ${medicine.brandName} with safety caveats.`, path: `/substitutes/${medicine.slug}` }) : {};
}
export default function SubstitutePage({ params }: { params: { slug: string } }) {
  const medicine = getMedicine(params.slug); if (!medicine) notFound();
  const same = getRelatedMedicines(medicine.sameIngredientSlugs); const alternatives = getRelatedMedicines(medicine.therapeuticAlternativeSlugs);
  return <section className="container-pad py-10"><Breadcrumbs items={[{ label: "Substitutes" }, { label: medicine.brandName }]} /><h1 className="mt-8 font-serif text-5xl font-semibold">Substitutes for {medicine.brandName}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">Same active ingredient medicines may be closer substitutions than therapeutic alternatives. Therapeutic alternatives share a treatment class or clinical purpose but are not automatically equivalent.</p><div className="mt-8"><MedicalDisclaimer /></div><h2 className="mt-12 font-serif text-3xl font-semibold">Same active ingredient</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{same.length ? same.map((item) => <Link key={item.slug} href={`/medicine/${item.slug}`} className="rounded-organic bg-paper p-5 shadow-card">{item.brandName}<p className="text-sm text-sage">{item.genericName}</p></Link>) : <p className="text-graphite">No same-ingredient records are available in the demo cache.</p>}</div><h2 className="mt-12 font-serif text-3xl font-semibold">Therapeutic alternatives</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{alternatives.map((item) => <Link key={item.slug} href={`/medicine/${item.slug}`} className="rounded-organic bg-paper p-5 shadow-card">{item.brandName}<p className="text-sm text-sage">{item.genericName} · {item.drugClass}</p></Link>)}</div></section>;
}
