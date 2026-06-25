import { MedicineCard } from "@/components/medicine-card";
import { MedicineSearch } from "@/components/medicine-search";
import { MedicalDisclaimer } from "@/components/disclaimer";
import { SearchFilters } from "@/components/search-filters";
import { rankMedicineMatches, searchMedicineRecords } from "@/lib/search";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Medicine search", description: "Search by brand, generic, active ingredient, class, dosage form, and coverage hints.", path: "/search" });

export default function SearchPage({ searchParams }: { searchParams: { q?: string; drugClass?: string; form?: string; generic?: "true" | "false" | "any"; covered?: "true" | "false" | "any"; maxPrice?: string } }) {
  const query = searchParams.q || "";
  const filters = {
    q: query,
    drugClass: searchParams.drugClass || "all",
    form: searchParams.form || "all",
    generic: searchParams.generic || "any",
    covered: searchParams.covered || "any",
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
  };
  const results = rankMedicineMatches(searchMedicineRecords(filters), query);

  return (
    <section className="container-pad py-12">
      <p className="eyebrow">Medicine search</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">Search medicines, generics, and substitutes</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-graphite">Search normalized medicine records by brand, generic, ingredient, drug class, common misspelling, or mapped symptom category. Filters are server-rendered so result pages remain fast and indexable.</p>
      <div className="sticky top-20 z-30 mt-8"><MedicineSearch defaultValue={query} /></div>
      <div className="mt-5"><SearchFilters query={query} selectedClass={filters.drugClass} selectedForm={filters.form} /></div>
      <div className="mt-8"><MedicalDisclaimer compact /></div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-sage"><span>{results.length} records match your criteria</span><span>Includes generic, class, coverage, form, and price filters</span></div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.map((medicine) => <MedicineCard key={medicine.slug} medicine={medicine} />)}</div>
      {!results.length ? <div className="mt-8 rounded-organic bg-paper p-6 shadow-card"><h2 className="font-serif text-3xl font-semibold">No exact matches</h2><p className="mt-2 text-graphite">Try a generic name, active ingredient, or broader drug class. Production search should connect to RxNorm identifiers, synonym dictionaries, and licensed medicine reference APIs.</p></div> : null}
    </section>
  );
}
