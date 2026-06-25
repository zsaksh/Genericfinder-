import { medicines, plans } from "@/lib/sample-data";
import type { InsurancePlan, MedicineRecord } from "@/lib/types";

export type MedicineSearchFilters = {
  q?: string;
  drugClass?: string;
  form?: string;
  generic?: "true" | "false" | "any";
  covered?: "true" | "false" | "any";
  maxPrice?: number;
};

export type PlanSearchFilters = {
  q?: string;
  planType?: string;
  medicineSlug?: string;
  maxPremium?: number;
  rxFirst?: boolean;
};

function normalize(value = "") {
  return value.trim().toLowerCase();
}

export function searchMedicineRecords(filters: MedicineSearchFilters) {
  const q = normalize(filters.q);
  return medicines.filter((medicine) => {
    const coverageExists = plans.some((plan) => plan.formulary[medicine.slug]?.covered);
    const haystack = [
      medicine.brandName,
      medicine.genericName,
      medicine.drugClass,
      medicine.manufacturer,
      ...medicine.activeIngredients,
      ...medicine.strengths,
      ...medicine.dosageForms,
      ...(medicine.commonMisspellings || []),
      ...(medicine.symptomCategories || [])
    ].join(" ").toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (filters.drugClass && filters.drugClass !== "all" && medicine.drugClass !== filters.drugClass) return false;
    if (filters.form && filters.form !== "all" && !medicine.dosageForms.includes(filters.form)) return false;
    if (filters.generic && filters.generic !== "any" && String(medicine.genericAvailable) !== filters.generic) return false;
    if (filters.covered && filters.covered !== "any" && String(coverageExists) !== filters.covered) return false;
    if (filters.maxPrice && medicine.approximateCashPrice > filters.maxPrice) return false;
    return true;
  });
}

export function rankMedicineMatches(records: MedicineRecord[], query = "") {
  const q = normalize(query);
  if (!q) return records;
  return [...records].sort((a, b) => score(b, q) - score(a, q));
}

function score(medicine: MedicineRecord, query: string) {
  let total = 0;
  if (medicine.brandName.toLowerCase() === query) total += 100;
  if (medicine.genericName.toLowerCase() === query) total += 90;
  if (medicine.activeIngredients.some((ingredient) => ingredient.toLowerCase().includes(query))) total += 50;
  if (medicine.commonMisspellings?.some((alias) => alias.toLowerCase() === query)) total += 45;
  if (medicine.drugClass.toLowerCase().includes(query)) total += 25;
  return total;
}

export function searchPlanRecords(filters: PlanSearchFilters) {
  const q = normalize(filters.q);
  return plans.filter((plan) => {
    const text = [plan.name, plan.provider, plan.planType, plan.networkNotes, plan.prescriptionNotes].join(" ").toLowerCase();
    if (q && !text.includes(q)) return false;
    if (filters.planType && filters.planType !== "all" && plan.planType !== filters.planType) return false;
    if (filters.maxPremium && plan.monthlyPremium > filters.maxPremium) return false;
    if (filters.medicineSlug && filters.medicineSlug !== "all" && !plan.formulary[filters.medicineSlug]?.covered) return false;
    if (filters.rxFirst && plan.rxDeductible > 250) return false;
    return true;
  });
}

export function coveredAlternatives(medicineSlug: string, plan: InsurancePlan) {
  const medicine = medicines.find((item) => item.slug === medicineSlug);
  if (!medicine) return [];
  const slugs = new Set([...medicine.sameIngredientSlugs, ...medicine.therapeuticAlternativeSlugs]);
  return medicines
    .filter((candidate) => slugs.has(candidate.slug))
    .map((candidate) => ({ medicine: candidate, rule: plan.formulary[candidate.slug] }))
    .filter((entry) => entry.rule?.covered)
    .sort((a, b) => (a.rule?.copay || 999) - (b.rule?.copay || 999));
}
