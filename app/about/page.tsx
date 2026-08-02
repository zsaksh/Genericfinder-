import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "About GenericFinder", description: "A medicine and health insurance comparison platform focused on clarity, safety, and savings.", path: "/about" });

export default function AboutPage() {
  return (
    <section className="container-pad py-12">
      <p className="eyebrow">About</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold">A comparison-first way to understand prescription affordability</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">GenericFinder brings medicine reference data, generic equivalence, pharmacy price estimates, plan formularies, and insurance marketplace decision points into a single transparent workflow.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Card title="Clarity" body="We turn fragmented drug, pharmacy, and plan information into readable comparison pages with source and freshness labels." />
        <Card title="Safety" body="We avoid automatic switching claims and repeatedly point users back to clinicians, pharmacists, insurers, and official plan documents." />
        <Card title="Savings" body="We help users compare cash prices, generic options, Rx deductibles, tiers, and covered alternatives before clicking an affiliate offer." />
      </div>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return <div className="rounded-organic bg-paper p-6 shadow-card"><h2 className="font-serif text-3xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-graphite">{body}</p></div>;
}
