import { ingestionSources } from "@/lib/ingestion/sources";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "How GenericFinder sources data", description: "Our methodology for official drug references, plan metadata, formularies, freshness labels, adapters, and data limitations.", path: "/sources" });

export default function SourcesPage() {
  return (
    <section className="container-pad py-12">
      <p className="eyebrow">Trust & transparency</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">How we source this data</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">GenericFinder is designed around official government datasets, licensed references, partner APIs, and internal normalized caches. Demo records in this repository are intentionally labeled so the application is runnable without pretending to have live clinical, pharmacy, or plan feeds.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Card title="Medicine references" body="The ingestion layer is designed for FDA Drugs@FDA, FDA Orange Book files, DailyMed SPL labeling, RxNorm/RxNav identifiers, and licensed drug reference APIs where available." />
        <Card title="Insurance and formulary data" body="Plan adapters are designed for CMS Marketplace plan metadata, insurer-published formularies, machine-readable files, and licensed plan APIs. County, network, household, and benefit details must be verified." />
        <Card title="Pharmacy prices" body="Cash prices should come from licensed price feeds or prescription savings partners. Cached values are estimates and must carry market, quantity, and freshness labels." />
        <Card title="Freshness labels" body="Records store source labels, timestamps, confidence, and estimated/unavailable markers so stale or incomplete fields are visible instead of hidden." />
      </div>
      <h2 className="mt-14 font-serif text-4xl font-semibold">Production source registry</h2>
      <div className="mt-5 overflow-hidden rounded-organic border border-ink/10 bg-paper shadow-card">
        <table className="data-table w-full text-sm">
          <thead><tr><th>Source</th><th>Capabilities</th><th>Refresh cadence</th><th>Use</th></tr></thead>
          <tbody>{ingestionSources.map((source) => <tr key={source.key}><td><a href={source.url} className="font-semibold text-moss">{source.name}</a><span className="block text-xs text-sage">{source.owner}</span></td><td>{source.capabilities.join(", ")}</td><td>{source.refreshCadence}</td><td>{source.productionUse}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-8 rounded-organic bg-paper p-5 text-sm leading-6 text-graphite shadow-card">When a required external API is unavailable, GenericFinder falls back to adapter interfaces and normalized cached records. The UI must still label estimates, missing interaction data, incomplete formularies, and out-of-date plan information clearly.</p>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return <div className="rounded-organic bg-paper p-6 shadow-card"><h2 className="font-serif text-3xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-graphite">{body}</p></div>;
}
