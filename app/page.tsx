import Link from "next/link";
import { ArrowRight, Database, HandCoins, ShieldCheck, Stethoscope } from "lucide-react";
import { MedicineCard } from "@/components/medicine-card";
import { MedicineSearch } from "@/components/medicine-search";
import { PlanCard } from "@/components/plan-card";
import { siteMetadata } from "@/lib/seo";
import { medicines, plans } from "@/lib/sample-data";

export const metadata = siteMetadata({ title: "GenericFinder — compare medicines, generics, prices, and insurance", description: "Search a medicine, find generic equivalents and substitutes, compare pharmacy prices, and see insurance plans with prescription coverage intelligence." });

export default function HomePage() {
  return (
    <>
      <section className="container-pad grid gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div>
          <p className="eyebrow">Prescription clarity meets insurance intelligence</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">Find the lower-cost medicine path before you choose a plan.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">GenericFinder connects brand and generic medicines, therapeutic alternatives, pharmacy cash prices, formulary coverage, and affiliate-ready plan offers in one careful, source-labeled workflow.</p>
          <div className="mt-8 max-w-3xl"><MedicineSearch /></div>
          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {["Official-data adapters", "Freshness labels", "Affiliate disclosure", "Medical safety copy"].map((item) => <div key={item} className="rounded-2xl border border-ink/10 bg-paper/80 p-3 text-sage">{item}</div>)}
          </div>
        </div>
        <div className="relative rounded-[2.5rem] border border-ink/10 bg-paper p-5 shadow-soft">
          <div className="rounded-[2rem] bg-mist p-6">
            <p className="eyebrow">Example journey</p>
            <ol className="mt-6 space-y-4">
              {[
                [Stethoscope, "Search Lipitor", "See atorvastatin, same-ingredient records, and statin alternatives."],
                [HandCoins, "Compare price", "Review pharmacy cash estimates and generic savings potential."],
                [ShieldCheck, "Check coverage", "Find plan formulary tiers, restrictions, and prescription-friendly filters."],
                [Database, "Verify sources", "Inspect source labels, timestamps, and unavailable fields before acting."]
              ].map(([Icon, title, body]) => {
                const TypedIcon = Icon as typeof Stethoscope;
                return <li key={title as string} className="flex gap-4 rounded-3xl bg-paper p-4 shadow-card"><TypedIcon className="h-6 w-6 flex-none text-clay" /><div><strong>{title as string}</strong><p className="mt-1 text-sm leading-6 text-graphite">{body as string}</p></div></li>;
              })}
            </ol>
          </div>
        </div>
      </section>
      <section className="container-pad py-10">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="eyebrow">Medicine explorer</p><h2 className="font-serif text-4xl font-semibold">Popular comparison records</h2></div><Link href="/search" className="hidden items-center gap-2 text-sm font-semibold text-moss sm:flex">Browse all <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{medicines.map((medicine) => <MedicineCard key={medicine.slug} medicine={medicine} />)}</div>
      </section>
      <section className="container-pad py-16">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div><p className="eyebrow">Insurance marketplace</p><h2 className="mt-3 font-serif text-4xl font-semibold">Plan cards designed for prescription-heavy decisions.</h2><p className="mt-4 leading-7 text-graphite">Sponsored and organic plans share the same data structure, disclosure language, tracking events, and formulary rule slots.</p></div>
          <div className="grid gap-5 md:grid-cols-2">{plans.slice(0, 2).map((plan) => <PlanCard key={plan.slug} plan={plan} medicineSlug="atorvastatin" />)}</div>
        </div>
      </section>
    </>
  );
}
