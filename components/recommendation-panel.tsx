import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { recommendationsForMedicine, recommendationSummary } from "@/lib/recommendations";
import { formatCurrency } from "@/lib/utils";

export function RecommendationPanel({ medicineSlug }: { medicineSlug: string }) {
  const recommendations = recommendationsForMedicine(medicineSlug).slice(0, 3);
  if (!recommendations.length) return null;
  const best = recommendations[0];

  return (
    <section className="rounded-[2rem] border border-moss/15 bg-paper p-6 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="eyebrow">Affordability intelligence</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">Lowest modeled annual path</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite">{recommendationSummary(best)} This is a planning estimate, not a recommendation to enroll or switch medicines.</p>
        </div>
        <Calculator className="h-9 w-9 text-clay" aria-hidden />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {recommendations.map((item) => (
          <Link key={item.planSlug} href={`/insurance/${item.planSlug}?medicine=${item.medicineSlug}`} className="rounded-3xl border border-ink/10 bg-mist p-4 transition hover:-translate-y-0.5 hover:bg-blueglass/60">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">{item.provider}</span>
            <strong className="mt-2 block text-lg">{item.planName}</strong>
            <span className="mt-3 block text-sm text-graphite">{item.tier}</span>
            <span className="mt-3 block font-semibold">{formatCurrency(item.annualTotal)} / modeled year</span>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-moss">Review plan <ArrowRight className="h-3.5 w-3.5" /></span>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-sage">Annual total combines modeled monthly premium and one modeled monthly medicine fill only. It excludes subsidies, other care, coinsurance, deductible timing, pharmacy network changes, and patient-specific clinical factors.</p>
    </section>
  );
}
