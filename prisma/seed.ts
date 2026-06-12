import { PrismaClient, FreshnessStatus } from "@prisma/client";
import { medicines, plans } from "../lib/sample-data";

const prisma = new PrismaClient();
const freshnessMap = {
  "Current": FreshnessStatus.CURRENT,
  "Recently verified": FreshnessStatus.RECENTLY_VERIFIED,
  "Needs review": FreshnessStatus.NEEDS_REVIEW,
  "Estimated": FreshnessStatus.ESTIMATED
} as const;

async function main() {
  for (const medicine of medicines) {
    const created = await prisma.medicine.upsert({
      where: { slug: medicine.slug },
      update: {},
      create: {
        slug: medicine.slug,
        brandName: medicine.brandName,
        genericName: medicine.genericName,
        drugClass: medicine.drugClass,
        manufacturer: medicine.manufacturer,
        genericAvailable: medicine.genericAvailable,
        approximateCashPrice: medicine.approximateCashPrice,
        confidence: medicine.confidence,
        summary: medicine.summary,
        safetyNote: medicine.safetyNote,
        lastUpdated: new Date(medicine.lastUpdated),
        freshness: freshnessMap[medicine.freshness],
        forms: { create: medicine.strengths.flatMap((strength) => medicine.dosageForms.map((form) => ({ form, strength }))) },
        sourceReferences: { create: { label: medicine.sourceLabel, url: medicine.sourceUrl, retrievedAt: new Date(medicine.lastUpdated) } },
        freshnessMetadata: { create: { status: freshnessMap[medicine.freshness], checkedAt: new Date(medicine.lastUpdated), staleAfter: new Date("2026-12-31"), unavailableFields: [], estimatedFields: ["approximateCashPrice"] } }
      }
    });

    for (const ingredientName of medicine.activeIngredients) {
      const ingredient = await prisma.ingredient.upsert({ where: { name: ingredientName }, update: {}, create: { name: ingredientName } });
      await prisma.medicineIngredient.upsert({ where: { medicineId_ingredientId: { medicineId: created.id, ingredientId: ingredient.id } }, update: {}, create: { medicineId: created.id, ingredientId: ingredient.id } });
    }
  }

  for (const plan of plans) {
    const created = await prisma.insurancePlan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: {
        slug: plan.slug,
        name: plan.name,
        provider: plan.provider,
        planType: plan.planType,
        monthlyPremium: plan.monthlyPremium,
        deductible: plan.deductible,
        oopMax: plan.oopMax,
        rxDeductible: plan.rxDeductible,
        networkNotes: plan.networkNotes,
        sponsored: plan.sponsored,
        lastUpdated: new Date(plan.lastUpdated),
        benefits: { create: [{ label: "Prescription notes", value: plan.prescriptionNotes }, { label: "Network", value: plan.networkNotes }] },
        affiliateLinks: { create: { url: plan.affiliateUrl, label: "View offer", sponsored: plan.sponsored } },
        sourceReferences: { create: { label: plan.sourceLabel, url: "https://www.healthcare.gov/see-plans/", retrievedAt: new Date(plan.lastUpdated) } }
      }
    });

    for (const [medicineSlug, rule] of Object.entries(plan.formulary)) {
      const medicine = await prisma.medicine.findUnique({ where: { slug: medicineSlug } });
      if (!medicine) continue;
      await prisma.formularyRule.create({
        data: {
          planId: created.id,
          medicineId: medicine.id,
          tier: rule.tier,
          copay: rule.copay,
          covered: rule.covered,
          priorAuthorization: Boolean(rule.restriction?.toLowerCase().includes("prior")),
          stepTherapy: Boolean(rule.restriction?.toLowerCase().includes("step"))
        }
      });
    }
  }
}

main().finally(async () => prisma.$disconnect());
