"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/button";
import { trackEvent } from "@/lib/analytics";

export function MedicineSearch({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await trackEvent({ event: "search_medicine", metadata: { query } });
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className="relative rounded-[2rem] border border-ink/10 bg-paper p-2 shadow-soft">
      <label htmlFor="medicine-search" className="sr-only">Search by brand, generic, ingredient, or class</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 px-4 py-2">
          <Search className="h-5 w-5 text-sage" aria-hidden />
          <input
            id="medicine-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Lipitor, atorvastatin, statin, or cholesterol medicine"
            className="w-full bg-transparent text-base outline-none placeholder:text-sage/75"
          />
        </div>
        <Button type="submit" className="min-h-12">Compare options</Button>
      </div>
    </form>
  );
}
