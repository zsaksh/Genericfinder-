import { medicines, plans } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

export type AffordabilityRecommendation = {
  medicineSlug: string;
  medicineName: string;
  planSlug: string;
  planName: string;
  provider: string;
  monthlyPremium: number;
  rxDeductible: number;
  modeledCopay: number;
  annualMedicineCost: number;
  annualPremiumCost: number;
  annualTotal: number;
  tier: string;
  caveat: string;
};

export function recommendationsForMedicine(medicineSlug: string): AffordabilityRecommendation[] {
  const medicine = medicines.find((item) => item.slug === medicineSlug);
  if (!medicine) return [];

  return plans
    .map((plan) => {
      const rule = plan.formulary[medicineSlug];
      if (!rule?.covered) return null;
      const annualMedicineCost = rule.copay * 12;
      const annualPremiumCost = plan.monthlyPremium * 12;
      return {
        medicineSlug,
        medicineName: medicine.brandName,
        planSlug: plan.slug,
        planName: plan.name,
        provider: plan.provider,
        monthlyPremium: plan.monthlyPremium,
        rxDeductible: plan.rxDeductible,
        modeledCopay: rule.copay,
        annualMedicineCost,
        annualPremiumCost,
        annualTotal: annualMedicineCost + annualPremiumCost,
        tier: rule.tier,
        caveat: rule.restriction || "No modeled restriction shown"
      } satisfies AffordabilityRecommendation;
    })
    .filter((item): item is AffordabilityRecommendation => Boolean(item))
    .sort((a, b) => a.annualTotal - b.annualTotal);
}

export function recommendationSummary(recommendation: AffordabilityRecommendation) {
  return `${recommendation.planName} models ${recommendation.medicineName} at ${formatCurrency(recommendation.modeledCopay)} per fill with an estimated annual premium-plus-medicine total of ${formatCurrency(recommendation.annualTotal)}.`;
}
