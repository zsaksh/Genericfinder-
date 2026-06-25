import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadCaptureCard } from "@/components/lead-capture-card";
import { PlanCard } from "@/components/plan-card";
import { getPlan } from "@/lib/data";
import { medicines, plans } from "@/lib/sample-data";
import { coveredAlternatives } from "@/lib/search";
import { siteMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 43200;
export function generateStaticParams() { return plans.map((plan) => ({ slug: plan.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const plan = getPlan(params.slug);
  return plan ? siteMetadata({ title: `${plan.name} prescription coverage and affiliate offer`, description: `Compare ${plan.provider} premiums, deductible, network notes, and modeled formulary coverage.`, path: `/insurance/${plan.slug}` }) : {};
}

export default function InsurancePage({ params, searchParams }: { params: { slug: string }; searchParams: { medicine?: string } }) {
  const plan = getPlan(params.slug);
  if (!plan) notFound();
  const focusedMedicine = searchParams.medicine || "atorvastatin";
  const alternatives = coveredAlternatives(focusedMedicine, plan);

  return (
    <section className="container-pad py-10">
      <Breadcrumbs items={[{ label: "Insurance", href: "/insurance" }, { label: plan.name }]} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="eyebrow">{plan.provider} · {plan.planType} {plan.metalLevel ? `· ${plan.metalLevel}` : ""}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">{plan.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">{plan.networkNotes} {plan.prescriptionNotes}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-paper p-4 shadow-card"><span className="text-xs text-sage">Service area</span><strong className="block">{plan.serviceArea || "Verify by ZIP"}</strong></div>
            <div className="rounded-2xl bg-paper p-4 shadow-card"><span className="text-xs text-sage">Quality rating</span><strong className="block">{plan.qualityRating ? `${plan.qualityRating}/5` : "Unavailable"}</strong></div>
            <div className="rounded-2xl bg-paper p-4 shadow-card"><span className="text-xs text-sage">Rx estimate</span><strong className="block">{formatCurrency(plan.estimatedAnnualDrugCost)}</strong></div>
          </div>
        </div>
        <div className="space-y-5"><PlanCard plan={plan} medicineSlug={focusedMedicine} /><LeadCaptureCard planSlug={plan.slug} medicineSlug={focusedMedicine} /></div>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-4">
        <Metric label="Premium" value={formatCurrency(plan.monthlyPremium)} />
        <Metric label="Deductible" value={formatCurrency(plan.deductible)} />
        <Metric label="Out-of-pocket max" value={formatCurrency(plan.oopMax)} />
        <Metric label="Rx deductible" value={formatCurrency(plan.rxDeductible)} />
      </div>
      <h2 className="mt-14 font-serif text-4xl font-semibold">Modeled formulary search</h2>
      <div className="mt-5 overflow-hidden rounded-organic border border-ink/10 bg-paper shadow-card">
        <table className="data-table w-full text-sm">
          <thead><tr><th>Medicine</th><th>Coverage</th><th>Tier</th><th>Modeled cost</th><th>Restriction</th><th>Guide</th></tr></thead>
          <tbody>{medicines.map((medicine) => { const rule = plan.formulary[medicine.slug]; return <tr key={medicine.slug}><td>{medicine.brandName}<span className="block text-xs text-sage">{medicine.genericName}</span></td><td>{rule?.covered ? "Covered" : "Not preferred / unavailable"}</td><td>{rule?.tier || "Unavailable"}</td><td>{formatCurrency(rule?.copay)}</td><td>{rule?.restriction || "None shown"}</td><td><Link className="font-semibold text-moss" href={`/medicine/${medicine.slug}`}>Open</Link></td></tr>; })}</tbody>
        </table>
      </div>
      <h2 className="mt-14 font-serif text-4xl font-semibold">Cheaper covered alternatives for {focusedMedicine}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {alternatives.length ? alternatives.map(({ medicine, rule }) => <Link href={`/medicine/${medicine.slug}`} key={medicine.slug} className="rounded-organic bg-paper p-5 shadow-card"><strong>{medicine.brandName}</strong><p className="mt-2 text-sm text-graphite">{medicine.genericName} · {rule?.tier} · {formatCurrency(rule?.copay)}</p><p className="mt-2 text-xs text-sage">Requires prescriber/pharmacist review before any switch.</p></Link>) : <p className="text-graphite">No covered alternatives are modeled for this plan and medicine pair.</p>}
      </div>
      <p className="mt-8 text-sm text-sage">Source label: {plan.sourceLabel}. Last updated {plan.lastUpdated}. Verify plan availability, metal level, county, network, and formulary before applying.</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-organic bg-paper p-5 shadow-card"><span className="text-sage">{label}</span><strong className="block text-2xl">{value}</strong></div>;
}
