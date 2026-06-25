import Link from "next/link";
import { BadgeCheck, Pill } from "lucide-react";
import type { MedicineRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function MedicineCard({ medicine }: { medicine: MedicineRecord }) {
  return (
    <article className="rounded-organic border border-ink/10 bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{medicine.drugClass}</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold"><Link href={`/medicine/${medicine.slug}`}>{medicine.brandName}</Link></h3>
          <p className="mt-1 text-sm text-graphite">Generic: <strong>{medicine.genericName}</strong></p>
        </div>
        <Pill className="h-8 w-8 text-clay" />
      </div>
      <p className="mt-4 text-sm leading-6 text-graphite">{medicine.summary}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-mist p-3"><span className="block text-sage">Cash estimate</span><strong>{formatCurrency(medicine.approximateCashPrice)}</strong></div>
        <div className="rounded-2xl bg-blueglass/60 p-3"><span className="block text-sage">Generic exists</span><strong>{medicine.genericAvailable ? "Yes" : "No"}</strong></div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-sage">
        <span className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1"><BadgeCheck className="h-3.5 w-3.5" /> {medicine.freshness}</span>
        <span className="rounded-full bg-mist px-3 py-1">{medicine.confidence} confidence</span>
      </div>
    </article>
  );
}
