import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalDisclaimer } from "@/components/disclaimer";
import { JsonLd } from "@/components/json-ld";
import { PlanCard } from "@/components/plan-card";
import { PriceTable } from "@/components/price-table";
import { getMedicine, getRelatedMedicines, plansCoveringMedicine } from "@/lib/data";
import { medicines } from "@/lib/sample-data";
import { faqJsonLd, siteMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 86400;
export function generateStaticParams() { return medicines.map((medicine) => ({ slug: medicine.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const medicine = getMedicine(params.slug);
  if (!medicine) return {};
  return siteMetadata({ title: `${medicine.brandName} generic, substitutes, prices, and insurance coverage`, description: `Compare ${medicine.brandName}, ${medicine.genericName}, alternatives, cash price estimates, and formulary coverage guidance.`, path: `/medicine/${medicine.slug}` });
}

export default function MedicinePage({ params }: { params: { slug: string } }) {
  const medicine = getMedicine(params.slug);
  if (!medicine) notFound();
  const related = getRelatedMedicines([...medicine.sameIngredientSlugs, ...medicine.therapeuticAlternativeSlugs]);
  const coverage = plansCoveringMedicine(medicine.slug);
  return (
    <article className="container-pad py-10">
      <JsonLd data={faqJsonLd(medicine.faqs)} />
      <Breadcrumbs items={[{ label: "Medicines", href: "/search" }, { label: medicine.brandName }]} />
      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="eyebrow">{medicine.drugClass}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold tracking-tight md:text-6xl">{medicine.brandName} comparison guide</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">{medicine.summary}</p>
        </div>
        <aside className="rounded-organic border border-ink/10 bg-paper p-5 shadow-card">
          <p className="text-sm text-sage">Generic name</p><strong className="text-2xl">{medicine.genericName}</strong>
          <dl className="mt-5 space-y-3 text-sm"><div><dt className="text-sage">Cash estimate</dt><dd className="font-semibold">{formatCurrency(medicine.approximateCashPrice)}</dd></div><div><dt className="text-sage">Freshness</dt><dd>{medicine.freshness} · {medicine.lastUpdated}</dd></div><div><dt className="text-sage">Source</dt><dd><a className="underline" href={medicine.sourceUrl}>{medicine.sourceLabel}</a></dd></div></dl>
        </aside>
      </section>
      <div className="mt-8"><MedicalDisclaimer /></div>
      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-organic bg-paper p-6 shadow-card"><h2 className="font-serif text-3xl font-semibold">Generic equivalent</h2><p className="mt-3 text-graphite">{medicine.genericAvailable ? `${medicine.genericName} may be the generic equivalent when active ingredient, strength, route, and dosage form match.` : "No generic equivalent is marked in the normalized cache."}</p><Link className="mt-4 inline-block font-semibold text-moss" href={`/generic/${medicine.slug}`}>Open generic finder</Link></div>
        <div className="rounded-organic bg-paper p-6 shadow-card"><h2 className="font-serif text-3xl font-semibold">Forms & strengths</h2><p className="mt-3 text-graphite">{medicine.dosageForms.join(", ")} · {medicine.strengths.join(", ")}</p></div>
        <div className="rounded-organic bg-paper p-6 shadow-card"><h2 className="font-serif text-3xl font-semibold">Safety caveat</h2><p className="mt-3 text-graphite">{medicine.safetyNote}</p></div>
      </section>
      <section className="mt-14"><h2 className="font-serif text-4xl font-semibold">Pharmacy cash price comparison</h2><div className="mt-5"><PriceTable medicineSlug={medicine.slug} /></div></section>
      <section className="mt-14"><h2 className="font-serif text-4xl font-semibold">Substitutes and therapeutic alternatives</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{related.map((item) => <Link href={`/medicine/${item.slug}`} key={item.slug} className="rounded-organic border border-ink/10 bg-paper p-5 shadow-card"><strong>{item.brandName}</strong><p className="mt-2 text-sm text-graphite">{item.genericName} · {item.drugClass}</p></Link>)}</div></section>
      <section className="mt-14"><h2 className="font-serif text-4xl font-semibold">Insurance plans that model coverage</h2><div className="mt-5 grid gap-5 lg:grid-cols-3">{coverage.map(({ plan }) => <PlanCard key={plan.slug} plan={plan} medicineSlug={medicine.slug} />)}</div></section>
      <section className="mt-14"><h2 className="font-serif text-4xl font-semibold">FAQs</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{medicine.faqs.map((faq) => <div key={faq.question} className="rounded-organic bg-paper p-5 shadow-card"><h3 className="font-semibold">{faq.question}</h3><p className="mt-2 text-sm leading-6 text-graphite">{faq.answer}</p></div>)}</div></section>
    </article>
  );
}
