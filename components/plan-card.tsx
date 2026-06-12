"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/button";
import { trackEvent } from "@/lib/analytics";
import type { InsurancePlan } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function PlanCard({ plan, medicineSlug }: { plan: InsurancePlan; medicineSlug?: string }) {
  const rule = medicineSlug ? plan.formulary[medicineSlug] : undefined;
  return (
    <article className="relative overflow-hidden rounded-organic border border-ink/10 bg-paper p-5 shadow-card">
      {plan.sponsored ? <span className="absolute right-4 top-4 rounded-full bg-apricot px-3 py-1 text-xs font-semibold text-ink">Sponsored</span> : null}
      <p className="eyebrow">{plan.provider} · {plan.planType}</p>
      <h3 className="mt-2 font-serif text-3xl font-semibold"><Link href={`/insurance/${plan.slug}`}>{plan.name}</Link></h3>
      <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-2xl bg-mist p-3"><span className="block text-xs text-sage">Premium</span><strong>{formatCurrency(plan.monthlyPremium)}</strong></div>
        <div className="rounded-2xl bg-mist p-3"><span className="block text-xs text-sage">Deductible</span><strong>{formatCurrency(plan.deductible)}</strong></div>
        <div className="rounded-2xl bg-mist p-3"><span className="block text-xs text-sage">Rx ded.</span><strong>{formatCurrency(plan.rxDeductible)}</strong></div>
      </div>
      {rule ? <div className="mt-4 rounded-2xl border border-moss/15 bg-blueglass/50 p-4 text-sm"><strong>{rule.tier}</strong><br />Modeled medicine cost: {formatCurrency(rule.copay)} {rule.restriction ? `· ${rule.restriction}` : ""}</div> : null}
      <p className="mt-4 text-sm leading-6 text-graphite">{plan.prescriptionNotes}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-sage">
        {plan.trustBadges.map((badge) => <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1"><ShieldCheck className="h-3.5 w-3.5" />{badge}</span>)}
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button asChild>
          <a href={plan.affiliateUrl} rel="nofollow sponsored" onClick={() => trackEvent({ event: "click_affiliate", entitySlug: plan.slug, metadata: { medicineSlug } })}>View offer <ArrowUpRight className="h-4 w-4" /></a>
        </Button>
        <Button asChild variant="secondary"><Link href={`/insurance/${plan.slug}`}>Plan details</Link></Button>
      </div>
      <p className="mt-3 text-xs text-sage">Affiliate disclosure: we may earn compensation from partner links. Availability and pricing must be verified.</p>
    </article>
  );
}
