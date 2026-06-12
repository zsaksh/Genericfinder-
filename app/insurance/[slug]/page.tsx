import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PlanCard } from "@/components/plan-card";
import { getPlan } from "@/lib/data";
import { medicines, plans } from "@/lib/sample-data";
import { siteMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 43200;
export function generateStaticParams() { return plans.map((plan) => ({ slug: plan.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const plan = getPlan(params.slug);
  return plan ? siteMetadata({ title: `${plan.name} prescription coverage and affiliate offer`, description: `Compare ${plan.provider} premiums, deductible, network notes, and modeled formulary coverage.`, path: `/insurance/${plan.slug}` }) : {};
}
export default function InsurancePage({ params }: { params: { slug: string } }) {
  const plan = getPlan(params.slug); if (!plan) notFound();
  return <section className="container-pad py-10"><Breadcrumbs items={[{ label: "Insurance" }, { label: plan.name }]} /><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]"><div><p className="eyebrow">{plan.provider} · {plan.planType}</p><h1 className="mt-3 font-serif text-5xl font-semibold">{plan.name}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">{plan.networkNotes} {plan.prescriptionNotes}</p></div><PlanCard plan={plan} /></div><div className="mt-12 grid gap-4 md:grid-cols-4"><div className="rounded-organic bg-paper p-5 shadow-card"><span className="text-sage">Premium</span><strong className="block text-2xl">{formatCurrency(plan.monthlyPremium)}</strong></div><div className="rounded-organic bg-paper p-5 shadow-card"><span className="text-sage">Deductible</span><strong className="block text-2xl">{formatCurrency(plan.deductible)}</strong></div><div className="rounded-organic bg-paper p-5 shadow-card"><span className="text-sage">Out-of-pocket max</span><strong className="block text-2xl">{formatCurrency(plan.oopMax)}</strong></div><div className="rounded-organic bg-paper p-5 shadow-card"><span className="text-sage">Rx deductible</span><strong className="block text-2xl">{formatCurrency(plan.rxDeductible)}</strong></div></div><h2 className="mt-14 font-serif text-4xl font-semibold">Modeled formulary search</h2><div className="mt-5 overflow-hidden rounded-organic border border-ink/10 bg-paper shadow-card"><table className="data-table w-full text-sm"><thead><tr><th>Medicine</th><th>Coverage</th><th>Tier</th><th>Modeled cost</th><th>Restriction</th></tr></thead><tbody>{medicines.map((medicine) => { const rule = plan.formulary[medicine.slug]; return <tr key={medicine.slug}><td>{medicine.brandName}</td><td>{rule?.covered ? "Covered" : "Not preferred / unavailable"}</td><td>{rule?.tier || "Unavailable"}</td><td>{formatCurrency(rule?.copay)}</td><td>{rule?.restriction || "None shown"}</td></tr>; })}</tbody></table></div><p className="mt-5 text-sm text-sage">Source label: {plan.sourceLabel}. Last updated {plan.lastUpdated}. Verify plan availability, metal level, county, network, and formulary before applying.</p></section>;
}
