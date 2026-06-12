import { medicines, pharmacies, plans } from "@/lib/sample-data";

export function getMedicine(slug: string) {
  return medicines.find((medicine) => medicine.slug === slug);
}

export function getPlan(slug: string) {
  return plans.find((plan) => plan.slug === slug);
}

export function getRelatedMedicines(slugs: string[]) {
  return slugs.map(getMedicine).filter(Boolean) as NonNullable<ReturnType<typeof getMedicine>>[];
}

export function searchMedicines(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return medicines;
  return medicines.filter((medicine) => {
    const haystack = [
      medicine.brandName,
      medicine.genericName,
      medicine.drugClass,
      ...medicine.activeIngredients,
      ...medicine.strengths,
      ...medicine.dosageForms
    ].join(" ").toLowerCase();
    return haystack.includes(normalized) || normalized.includes(medicine.genericName.toLowerCase());
  });
}

export function plansCoveringMedicine(slug: string) {
  return plans
    .map((plan) => ({ plan, rule: plan.formulary[slug] }))
    .filter((entry) => entry.rule?.covered);
}

export function getPharmacyPrices(slug: string) {
  return pharmacies.map((pharmacy) => ({
    name: pharmacy.name,
    type: pharmacy.type,
    note: pharmacy.note,
    price: pharmacy.prices[slug as keyof typeof pharmacy.prices]
  })).filter((row) => typeof row.price === "number");
}

export function savingsForGeneric(slug: string) {
  const medicine = getMedicine(slug);
  if (!medicine) return null;
  const generic = medicines.find((candidate) => candidate.genericName === medicine.genericName && candidate.slug !== medicine.slug) || medicine;
  return {
    brand: medicine,
    generic,
    difference: Math.max(0, medicine.approximateCashPrice - generic.approximateCashPrice)
  };
}
