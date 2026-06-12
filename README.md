# GenericFinder

GenericFinder is a production-oriented Next.js App Router website for comparing medicines, generic equivalents, pharmacy cash prices, and health insurance prescription coverage with affiliate-ready plan flows.

## What is included

- Next.js App Router, TypeScript, Tailwind CSS, and accessible shadcn-style primitives.
- SEO-first pages for medicines, generic finder pages, substitutes, drug comparisons, insurance plan pages, savings, sources, legal, sitemap, and robots.
- Prisma PostgreSQL schema for users, medicines, ingredients, forms, generic mappings, substitutes, comparisons, plans, benefits, formulary rules, pharmacies, affiliates, analytics, content, sources, and freshness metadata.
- Data adapter interfaces for swapping demo data with official or licensed drug, formulary, plan, and pharmacy feeds.
- Analytics event hooks for `search_medicine`, `view_medicine`, `compare_medicine`, `view_plan`, `click_affiliate`, and `apply_plan`.

## Data policy

The checked-in data is labeled demo seed data and is intentionally small. Production data should be imported from official or licensed sources such as FDA Drugs@FDA, FDA Orange Book, DailyMed SPL, RxNorm/RxNav, public Marketplace/CMS plan metadata, insurer-published formularies, and licensed pharmacy price APIs. Do not infer clinical facts from unverified sources.

## Local setup

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Deployment

1. Create a Vercel project.
2. Add `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, and affiliate/analytics environment variables.
3. Run `npm run build` as the Vercel build command.
4. Use a scheduled ingestion job to refresh normalized data and update freshness metadata.

## Safety and compliance

GenericFinder is informational only and is not medical advice, insurance advice, or a replacement for a licensed clinician, pharmacist, broker, or insurer. All price and coverage data must be verified before a user acts.
