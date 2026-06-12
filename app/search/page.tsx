import { MedicineCard } from "@/components/medicine-card";
import { MedicineSearch } from "@/components/medicine-search";
import { MedicalDisclaimer } from "@/components/disclaimer";
import { searchMedicines } from "@/lib/data";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Medicine search", description: "Search by brand, generic, active ingredient, class, dosage form, and coverage hints.", path: "/search" });

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const results = searchMedicines(query);
  return (
    <section className="container-pad py-12">
      <p className="eyebrow">Medicine search</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">Search medicines, generics, and substitutes</h1>
      <div className="sticky top-20 z-30 mt-8"><MedicineSearch defaultValue={query} /></div>
      <div className="mt-8"><MedicalDisclaimer compact /></div>
      <div className="mt-8 flex items-center justify-between text-sm text-sage"><span>{results.length} records</span><span>Filters modeled: generic, class, coverage, form, price</span></div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.map((medicine) => <MedicineCard key={medicine.slug} medicine={medicine} />)}</div>
    </section>
  );
}
