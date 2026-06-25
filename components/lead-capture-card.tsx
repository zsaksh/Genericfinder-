import { recordPlanLeadAction } from "@/app/actions";
import { Button } from "@/components/button";

export function LeadCaptureCard({ planSlug, medicineSlug }: { planSlug: string; medicineSlug?: string }) {
  return (
    <form action={recordPlanLeadAction} className="rounded-organic border border-ink/10 bg-ink p-5 text-paper shadow-card">
      <input type="hidden" name="planSlug" value={planSlug} />
      {medicineSlug ? <input type="hidden" name="medicineSlug" value={medicineSlug} /> : null}
      <p className="eyebrow text-apricot">Affiliate application flow</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold">Check this plan with the partner</h2>
      <p className="mt-3 text-sm leading-6 text-paper/75">Optional ZIP routing can be connected to licensed plan-availability APIs. The demo flow records intent and redirects through an affiliate-safe outbound route.</p>
      <label className="mt-5 block text-sm font-medium">ZIP code
        <input name="zipCode" inputMode="numeric" pattern="[0-9]{5}" placeholder="12345" className="focus-ring mt-2 w-full rounded-2xl border border-paper/15 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/45" />
      </label>
      <Button className="mt-4 w-full bg-paper text-ink hover:bg-apricot">Continue to partner</Button>
      <p className="mt-3 text-xs text-paper/55">Sponsored or affiliate offer. Verify eligibility, subsidy, network, and drug coverage before applying.</p>
    </form>
  );
}
