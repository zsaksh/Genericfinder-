"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { logger } from "@/lib/logger";

const medicineSearchActionSchema = z.object({
  q: z.string().trim().max(120).default(""),
  drugClass: z.string().optional(),
  form: z.string().optional(),
  generic: z.string().optional(),
  covered: z.string().optional()
});

export async function searchMedicineAction(formData: FormData) {
  const parsed = medicineSearchActionSchema.parse({
    q: formData.get("q")?.toString() || "",
    drugClass: formData.get("drugClass")?.toString(),
    form: formData.get("form")?.toString(),
    generic: formData.get("generic")?.toString(),
    covered: formData.get("covered")?.toString()
  });

  logger.info("search_medicine_action", { query: parsed.q, filters: parsed });
  const params = new URLSearchParams();
  Object.entries(parsed).forEach(([key, value]) => {
    if (value && value !== "all" && value !== "any") params.set(key, value);
  });
  redirect(`/search?${params.toString()}`);
}

const planLeadSchema = z.object({
  planSlug: z.string().min(1),
  medicineSlug: z.string().optional(),
  zipCode: z.string().regex(/^\d{5}$/).optional()
});

export async function recordPlanLeadAction(formData: FormData) {
  const lead = planLeadSchema.parse({
    planSlug: formData.get("planSlug")?.toString(),
    medicineSlug: formData.get("medicineSlug")?.toString() || undefined,
    zipCode: formData.get("zipCode")?.toString() || undefined
  });

  logger.info("apply_plan", lead);
  redirect(`/out/${lead.planSlug}${lead.medicineSlug ? `?medicine=${encodeURIComponent(lead.medicineSlug)}` : ""}`);
}
