import { siteMetadata } from "@/lib/seo";
export const metadata = siteMetadata({ title: "Privacy policy", description: "GenericFinder privacy policy.", path: "/privacy" });
export default function PrivacyPage() { return <section className="container-pad py-12"><h1 className="font-serif text-5xl font-semibold">Privacy</h1><p className="mt-5 max-w-3xl leading-7 text-graphite">GenericFinder is analytics-ready. Production deployments should document analytics vendors, affiliate tracking partners, retention periods, and user rights before launch.</p></section>; }
