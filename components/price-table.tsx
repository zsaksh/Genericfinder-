import { getPharmacyPrices } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function PriceTable({ medicineSlug }: { medicineSlug: string }) {
  const prices = getPharmacyPrices(medicineSlug);
  return (
    <div className="overflow-hidden rounded-organic border border-ink/10 bg-paper shadow-card">
      <table className="data-table w-full text-sm">
        <caption className="sr-only">Pharmacy cash price estimates</caption>
        <thead><tr><th>Pharmacy</th><th>Type</th><th>Estimate</th><th>Freshness note</th></tr></thead>
        <tbody>
          {prices.map((row) => <tr key={row.name}><td className="font-semibold">{row.name}</td><td>{row.type}</td><td>{formatCurrency(row.price)}</td><td>{row.note}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
