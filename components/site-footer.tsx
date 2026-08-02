import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="container-pad grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl">GenericFinder</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-paper/70">Medicine and insurance comparison built around transparent sources, freshness labels, and careful medical safety language.</p>
          <p className="mt-4 text-xs text-paper/55">Informational only. Not medical advice. Affiliate links may generate compensation.</p>
        </div>
        <div className="grid gap-2 text-sm text-paper/75">
          <Link href="/sources">How we source data</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <div className="rounded-organic border border-paper/10 bg-paper/5 p-5 text-sm text-paper/75">
          Always confirm medicine substitutions, formulary rules, and prices with your prescriber, pharmacist, insurer, or pharmacy before making care decisions.
        </div>
      </div>
    </footer>
  );
}
