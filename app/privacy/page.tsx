import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Privacy policy", description: "GenericFinder privacy policy.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <section className="container-pad py-12">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">Privacy policy</h1>
      <div className="mt-8 max-w-3xl space-y-6 text-graphite">
        <p>GenericFinder is designed to minimize personal data collection. Search queries, affiliate clicks, and plan lead events can be recorded for analytics, fraud prevention, conversion measurement, and product improvement.</p>
        <p>Production deployments should document analytics vendors, affiliate tracking partners, retention periods, user rights, cookie choices, and any protected-health-information safeguards before launch.</p>
        <p>Do not submit emergency medical information or sensitive clinical details through search or lead forms. Use official insurer, pharmacy, or clinician channels for personal care decisions.</p>
      </div>
    </section>
  );
}
