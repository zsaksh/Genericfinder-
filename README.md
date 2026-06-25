# GenericFinder

GenericFinder is a production-oriented Next.js App Router website for comparing medicines, generic equivalents, substitutes, pharmacy cash prices, and health insurance prescription coverage with affiliate-ready plan flows.

## Product surface

- Search medicines by brand, generic, active ingredient, drug class, common misspelling, and mapped symptom category.
- View SEO-first medicine pages with generic equivalence, substitutes, therapeutic alternatives, price tables, formulary guidance, FAQs, source labels, freshness labels, and medical safety disclaimers.
- Compare insurance plans by premium, deductible, Rx deductible, metal level, service area, formulary tier, modeled copay, and cheaper covered alternatives.
- Route affiliate clicks through an internal `/out/[slug]` endpoint for clean disclosure, logging, and future conversion tracking.
- Maintain trust pages for methodology, sources, privacy, terms, and medical/affiliate disclaimers.

## Technical stack

- Next.js App Router + TypeScript
- Tailwind CSS + accessible component primitives
- Prisma + PostgreSQL schema for production data modeling
- Server-rendered pages, static params, ISR-style `revalidate`, sitemap, robots, canonical/OpenGraph/Twitter metadata, and FAQ JSON-LD
- Server actions for search routing and plan lead capture
- API routes for search, coverage lookup, affiliate redirects, and analytics events
- Adapter interfaces for official/licensed medicine, plan, formulary, and pharmacy-price feeds

## Data policy

The checked-in records are small, labeled demo data. Production data should be imported from official or licensed sources such as FDA Drugs@FDA, FDA Orange Book, DailyMed SPL, RxNorm/RxNav, CMS Marketplace public-use files, insurer-published formularies, and licensed pharmacy price APIs. Do not infer clinical facts from unverified sources.

## Local setup

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

If a sandbox blocks package installation, continue source development without running install/typecheck. Vercel deployments with normal npm access should run the full build pipeline.

## Deployment

1. Create a Vercel project.
2. Add `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, and affiliate/analytics environment variables.
3. Run `npm run build` as the Vercel build command.
4. Run Prisma migrations against the production PostgreSQL database.
5. Schedule ingestion refresh jobs to update normalized data, source references, and freshness metadata.

## Safety and compliance

GenericFinder is informational only and is not medical advice, insurance advice, or a replacement for a licensed clinician, pharmacist, broker, or insurer. All price and coverage data must be verified before a user acts. Sponsored and affiliate placements must remain clearly labeled.
