import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/button";

const nav = [
  ["Medicines", "/search"],
  ["Insurance", "/insurance/clearpath-silver-rx"],
  ["Savings", "/savings"],
  ["Sources", "/sources"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/86 backdrop-blur-xl">
      <div className="container-pad flex h-16 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-moss text-paper shadow-card">Gf</span>
          <span className="font-serif text-2xl font-semibold tracking-tight">GenericFinder</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-graphite md:flex">
          {nav.map(([label, href]) => <Link key={href} href={href} className="hover:text-ink">{label}</Link>)}
        </nav>
        <Button asChild variant="secondary" className="hidden sm:inline-flex">
          <Link href="/search"><Search className="h-4 w-4" /> Find a medicine</Link>
        </Button>
      </div>
    </header>
  );
}
