import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Terms and medical disclaimer", description: "GenericFinder terms, affiliate disclosure, and medical disclaimer.", path: "/terms" });

export default function TermsPage() {
  return (
    <section className="container-pad py-12">
      <p className="eyebrow">Terms</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">Terms, affiliate disclosure, and medical disclaimer</h1>
      <div className="mt-8 max-w-3xl space-y-6 text-graphite">
        <p>GenericFinder provides informational comparison tools only. It is not medical advice, insurance advice, legal advice, or a substitute for professional judgment.</p>
        <p>Medicine substitutions, therapeutic alternatives, dosing, contraindications, interactions, coverage, network status, premiums, subsidies, and final pharmacy prices must be verified with qualified professionals or official plan/pharmacy documents.</p>
        <p>GenericFinder may receive compensation when users click sponsored insurance or savings links. Sponsored placements should remain labeled and should not alter source transparency or medical safety language.</p>
      </div>
    </section>
  );
}
