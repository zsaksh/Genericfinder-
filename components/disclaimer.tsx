import { AlertTriangle } from "lucide-react";

export function MedicalDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="rounded-organic border border-clay/25 bg-apricot/35 p-5 text-sm leading-6 text-graphite">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-clay" aria-hidden />
        <p><strong>Important medical safety note:</strong> GenericFinder is informational only and is not medical advice. Do not start, stop, substitute, or change a prescription without talking with a licensed clinician or pharmacist. {compact ? null : "Coverage, prices, dosing, contraindications, and interaction data can change or be incomplete."}</p>
      </div>
    </aside>
  );
}
