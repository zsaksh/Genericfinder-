export type Freshness = "Current" | "Recently verified" | "Needs review" | "Estimated";

export type MedicineRecord = {
  slug: string;
  brandName: string;
  genericName: string;
  activeIngredients: string[];
  drugClass: string;
  strengths: string[];
  dosageForms: string[];
  manufacturer: string;
  genericAvailable: boolean;
  substituteSlugs: string[];
  sameIngredientSlugs: string[];
  therapeuticAlternativeSlugs: string[];
  approximateCashPrice: number;
  sourceLabel: string;
  sourceUrl: string;
  lastUpdated: string;
  freshness: Freshness;
  confidence: "High" | "Medium" | "Low";
  summary: string;
  safetyNote: string;
  faqs: { question: string; answer: string }[];
};

export type InsurancePlan = {
  slug: string;
  name: string;
  provider: string;
  planType: "PPO" | "HMO" | "EPO" | "HDHP";
  monthlyPremium: number;
  deductible: number;
  oopMax: number;
  rxDeductible: number;
  networkNotes: string;
  prescriptionNotes: string;
  sponsored: boolean;
  affiliateUrl: string;
  trustBadges: string[];
  sourceLabel: string;
  lastUpdated: string;
  coveredMedicineSlugs: string[];
  formulary: Record<string, { tier: string; copay: number; restriction?: string; covered: boolean }>;
};
