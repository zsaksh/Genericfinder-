import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalDisclaimer } from "@/components/disclaimer";
import { SavingsChart } from "@/components/savings-chart";
import { getMedicine, savingsForGeneric } from "@/lib/data";
import { medicines } from "@/lib/sample-data";
import { siteMetadata } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 86400;
export function generateStaticParams() { return medicines.map((medicine) => ({ slug: medicine.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const medicine = getMedicine(params.slug);
  return medicine ? siteMetadata({ title: `${medicine.brandName} generic finder`, description: `Compare ${medicine.brandName} with its generic equivalent, active ingredient, forms, and estimated savings.`, path: `/generic/${medicine.slug}` }) : {};
}

export default function GenericPage({ params }: { params: { slug: string } }) {
  const medicine = getMedicine(params.slug);
  if (!medicine) notFound();
  const savings = savingsForGeneric(medicine.slug);
  const generic = savings?.generic || medicine;

  return (
    <section className="container-pad py-10">
      <Breadcrumbs items={[{ label: "Generic finder" }, { label: medicine.brandName }]} />
      <h1 className="mt-8 font-serif text-5xl font-semibold">{medicine.brandName} generic equivalent</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">The normalized record lists <strong>{medicine.genericName}</strong> as the generic name. Equivalence still depends on the exact strength, dosage form, route, manufacturer availability, and regulatory substitution rules.</p>
      <div className="mt-8"><MedicalDisclaimer /></div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="overflow-hidden rounded-organic border border-ink/10 bg-paper shadow-card">
          <table className="data-table w-full text-sm">
            <thead><tr><th>Attribute</th><th>Brand record</th><th>Generic record</th></tr></thead>
            <tbody>
              <tr><td>Medicine</td><td>{medicine.brandName}</td><td>{generic.brandName}</td></tr>
              <tr><td>Generic name</td><td>{medicine.genericName}</td><td>{generic.genericName}</td></tr>
              <tr><td>Active ingredient</td><td>{medicine.activeIngredients.join(", ")}</td><td>{generic.activeIngredients.join(", ")}</td></tr>
              <tr><td>Forms</td><td>{medicine.dosageForms.join(", ")}</td><td>{generic.dosageForms.join(", ")}</td></tr>
              <tr><td>Strengths</td><td>{medicine.strengths.join(", ")}</td><td>{generic.strengths.join(", ")}</td></tr>
              <tr><td>Approx. cash price</td><td>{formatCurrency(medicine.approximateCashPrice)}</td><td>{formatCurrency(generic.approximateCashPrice)}</td></tr>
              <tr><td>Substitution caveat</td><td colSpan={2}>Same active ingredient is not the only requirement. Verify route, dose, release mechanism, allergies, interactions, and prescriber instructions.</td></tr>
            </tbody>
          </table>
        </div>
        <SavingsChart brandSlug={medicine.slug} genericSlug={generic.slug} />
      </div>
      <Link href={`/medicine/${medicine.slug}`} className="mt-8 inline-block font-semibold text-moss">Back to full medicine guide</Link>
    </section>
  );
}
