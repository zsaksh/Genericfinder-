import type { MedicineRecord } from "@/lib/types";

export function SourcePanel({ medicine }: { medicine: MedicineRecord }) {
  return (
    <aside className="rounded-organic border border-ink/10 bg-paper p-5 shadow-card">
      <p className="eyebrow">Data transparency</p>
      <dl className="mt-4 space-y-4 text-sm">
        <div><dt className="font-semibold">Primary source label</dt><dd className="mt-1 text-graphite"><a className="underline" href={medicine.sourceUrl}>{medicine.sourceLabel}</a></dd></div>
        <div><dt className="font-semibold">Last updated</dt><dd className="mt-1 text-graphite">{medicine.lastUpdated} · {medicine.freshness}</dd></div>
        <div><dt className="font-semibold">Estimated fields</dt><dd className="mt-1 text-graphite">{medicine.estimatedFields?.join(", ") || "None marked"}</dd></div>
        <div><dt className="font-semibold">Unavailable fields</dt><dd className="mt-1 text-graphite">{medicine.unavailableFields?.join(", ") || "None marked"}</dd></div>
        <div><dt className="font-semibold">Interaction data</dt><dd className="mt-1 text-graphite">{medicine.interactionDataAvailable ? "Available" : "Not available in this record; consult a pharmacist or prescriber."}</dd></div>
      </dl>
    </aside>
  );
}
