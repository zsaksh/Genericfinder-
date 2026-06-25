import { CoverageMatrix } from "@/components/coverage-matrix";
import { PlanCard } from "@/components/plan-card";
import { MedicineSearch } from "@/components/medicine-search";
import { medicines } from "@/lib/sample-data";
import { searchPlanRecords } from "@/lib/search";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Compare health insurance prescription coverage", description: "Compare premiums, deductibles, Rx deductibles, formularies, network notes, and affiliate offers by medicine.", path: "/insurance" });

export default function InsuranceIndexPage({ searchParams }: { searchParams: { medicine?: string; planType?: string; maxPremium?: string; rxFirst?: string } }) {
  const medicineSlug = searchParams.medicine || "atorvastatin";
  const plans = searchPlanRecords({
    medicineSlug,
    planType: searchParams.planType || "all",
    maxPremium: searchParams.maxPremium ? Number(searchParams.maxPremium) : undefined,
    rxFirst: searchParams.rxFirst === "true"
  });

  return (
    <section className="container-pad py-12">
      <p className="eyebrow">Insurance comparison</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">Compare plans by prescription coverage</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">Choose a medicine and review modeled formulary tiers, prescription deductibles, premiums, network notes, and sponsored affiliate offers. Production deployments should scope plan availability by ZIP code, county, household, and plan year.</p>
      <div className="mt-8 max-w-3xl"><MedicineSearch defaultValue={medicineSlug} /></div>
      <form className="mt-6 rounded-organic bg-paper p-5 shadow-card" action="/insurance">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="text-sm font-medium text-graphite">Medicine
            <select name="medicine" defaultValue={medicineSlug} className="focus-ring mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-3 py-2">
              {medicines.map((medicine) => <option key={medicine.slug} value={medicine.slug}>{medicine.brandName} / {medicine.genericName}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-graphite">Plan type
            <select name="planType" defaultValue={searchParams.planType || "all"} className="focus-ring mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-3 py-2"><option value="all">All</option><option value="PPO">PPO</option><option value="HMO">HMO</option><option value="HDHP">HDHP</option><option value="EPO">EPO</option></select>
          </label>
          <label className="text-sm font-medium text-graphite">Premium cap
            <select name="maxPremium" defaultValue={searchParams.maxPremium || ""} className="focus-ring mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-3 py-2"><option value="">Any</option><option value="350">$350</option><option value="500">$500</option><option value="700">$700</option></select>
          </label>
          <button className="focus-ring self-end rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">Filter plans</button>
        </div>
      </form>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">{plans.map((plan) => <PlanCard key={plan.slug} plan={plan} medicineSlug={medicineSlug} />)}</div>
      <h2 className="mt-14 font-serif text-4xl font-semibold">Coverage matrix</h2>
      <div className="mt-5 overflow-x-auto"><CoverageMatrix medicineSlug={medicineSlug} /></div>
    </section>
  );
}
