import type { InsurancePlan, MedicineRecord } from "@/lib/types";
import { medicines, plans } from "@/lib/sample-data";

export interface MedicineDataAdapter {
  sourceName: string;
  searchMedicines(query: string): Promise<MedicineRecord[]>;
  getMedicine(slug: string): Promise<MedicineRecord | null>;
}

export interface InsuranceDataAdapter {
  sourceName: string;
  searchPlansByMedicine(medicineSlug: string): Promise<InsurancePlan[]>;
  getPlan(slug: string): Promise<InsurancePlan | null>;
}

export class DemoMedicineAdapter implements MedicineDataAdapter {
  sourceName = "Local normalized demo cache";
  async searchMedicines(query: string) {
    const q = query.toLowerCase();
    return medicines.filter((medicine) => [medicine.brandName, medicine.genericName, medicine.drugClass, ...medicine.activeIngredients].join(" ").toLowerCase().includes(q));
  }
  async getMedicine(slug: string) {
    return medicines.find((medicine) => medicine.slug === slug) ?? null;
  }
}

export class DemoInsuranceAdapter implements InsuranceDataAdapter {
  sourceName = "Local insurer/formulary demo cache";
  async searchPlansByMedicine(medicineSlug: string) {
    return plans.filter((plan) => Boolean(plan.formulary[medicineSlug]));
  }
  async getPlan(slug: string) {
    return plans.find((plan) => plan.slug === slug) ?? null;
  }
}

export const medicineAdapter = new DemoMedicineAdapter();
export const insuranceAdapter = new DemoInsuranceAdapter();
