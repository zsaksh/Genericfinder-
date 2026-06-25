import Link from "next/link";
import { medicines, plans } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

export function CoverageMatrix({ medicineSlug }: { medicineSlug?: string }) {
  const visibleMedicines = medicineSlug ? medicines.filter((medicine) => medicine.slug === medicineSlug) : medicines;

  return (
    <div className="overflow-hidden rounded-organic border border-ink/10 bg-paper shadow-card">
      <table className="data-table w-full min-w-[760px] text-sm">
        <caption className="sr-only">Insurance formulary coverage matrix</caption>
        <thead>
          <tr>
            <th>Plan</th>
            {visibleMedicines.map((medicine) => <th key={medicine.slug}>{medicine.brandName}</th>)}
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.slug}>
              <td>
                <Link href={`/insurance/${plan.slug}`} className="font-semibold text-moss">{plan.name}</Link>
                <span className="block text-xs text-sage">{plan.provider} · {plan.metalLevel || plan.planType}</span>
              </td>
              {visibleMedicines.map((medicine) => {
                const rule = plan.formulary[medicine.slug];
                return (
                  <td key={medicine.slug}>
                    <span className={rule?.covered ? "font-semibold text-moss" : "font-semibold text-clay"}>{rule?.covered ? "Covered" : "Not preferred"}</span>
                    <span className="block text-xs text-sage">{rule?.tier || "Unavailable"}</span>
                    <span className="block text-xs text-graphite">{formatCurrency(rule?.copay)} modeled cost</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
