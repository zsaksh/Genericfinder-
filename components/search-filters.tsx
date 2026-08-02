import { medicines, plans } from "@/lib/sample-data";

export function SearchFilters({ query = "", selectedClass = "all", selectedForm = "all" }: { query?: string; selectedClass?: string; selectedForm?: string }) {
  const classes = Array.from(new Set(medicines.map((medicine) => medicine.drugClass))).sort();
  const forms = Array.from(new Set(medicines.flatMap((medicine) => medicine.dosageForms))).sort();

  return (
    <form action="/search" className="rounded-organic border border-ink/10 bg-paper p-4 shadow-card" aria-label="Medicine filters">
      <input type="hidden" name="q" value={query} />
      <div className="grid gap-3 md:grid-cols-5">
        <label className="text-sm font-medium text-graphite">
          Drug class
          <select name="drugClass" defaultValue={selectedClass} className="focus-ring mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-3 py-2 text-ink">
            <option value="all">All classes</option>
            {classes.map((drugClass) => <option key={drugClass} value={drugClass}>{drugClass}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-graphite">
          Dosage form
          <select name="form" defaultValue={selectedForm} className="focus-ring mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-3 py-2 text-ink">
            <option value="all">All forms</option>
            {forms.map((form) => <option key={form} value={form}>{form}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-graphite">
          Generic
          <select name="generic" defaultValue="any" className="focus-ring mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-3 py-2 text-ink">
            <option value="any">Any</option>
            <option value="true">Generic available</option>
            <option value="false">No generic marked</option>
          </select>
        </label>
        <label className="text-sm font-medium text-graphite">
          Plan coverage
          <select name="covered" defaultValue="any" className="focus-ring mt-2 w-full rounded-2xl border border-ink/10 bg-mist px-3 py-2 text-ink">
            <option value="any">Any</option>
            <option value="true">Covered by a modeled plan</option>
            <option value="false">No modeled coverage</option>
          </select>
        </label>
        <button className="focus-ring self-end rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-moss">Apply filters</button>
      </div>
      <p className="mt-3 text-xs text-sage">Coverage filter checks {plans.length} modeled plan records and should be replaced by county/year scoped formulary data in production.</p>
    </form>
  );
}
