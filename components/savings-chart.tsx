import { getMedicine } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function SavingsChart({ brandSlug, genericSlug }: { brandSlug: string; genericSlug: string }) {
  const brand = getMedicine(brandSlug);
  const generic = getMedicine(genericSlug);
  if (!brand || !generic) return null;
  const max = Math.max(brand.approximateCashPrice, generic.approximateCashPrice, 1);
  const rows = [brand, generic];

  return (
    <div className="rounded-organic bg-paper p-6 shadow-card">
      <h2 className="font-serif text-3xl font-semibold">Estimated cash-price spread</h2>
      <div className="mt-5 space-y-4">
        {rows.map((medicine) => (
          <div key={medicine.slug}>
            <div className="mb-2 flex justify-between text-sm"><span>{medicine.brandName}</span><strong>{formatCurrency(medicine.approximateCashPrice)}</strong></div>
            <div className="h-3 overflow-hidden rounded-full bg-mist"><div className="h-full rounded-full bg-clay" style={{ width: `${Math.max(8, (medicine.approximateCashPrice / max) * 100)}%` }} /></div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-sage">This visualization uses cached estimates only. Quantity, pharmacy network, coupons, insurance, and location can materially change final cost.</p>
    </div>
  );
}
