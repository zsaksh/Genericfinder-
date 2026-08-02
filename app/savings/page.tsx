import { PriceTable } from "@/components/price-table";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Prescription savings guide", description: "Learn how GenericFinder models generic savings, cash price estimates, coupon flows, and insurance formulary tradeoffs.", path: "/savings" });
export default function SavingsPage() { return <section className="container-pad py-12"><p className="eyebrow">Savings guide</p><h1 className="mt-3 font-serif text-5xl font-semibold">Prescription savings without the guesswork</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">Compare generic availability, cash-pay estimates, insurance tiers, pharmacy network notes, and potential restrictions before selecting a path. Prices are estimates until verified with a pharmacy or plan.</p><div className="mt-10"><PriceTable medicineSlug="atorvastatin" /></div></section>; }
