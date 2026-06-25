export type SourceCapability = "drug-label" | "generic-equivalence" | "rxnorm" | "formulary" | "plan-metadata" | "price-feed";

export type IngestionSource = {
  key: string;
  name: string;
  owner: string;
  url: string;
  capabilities: SourceCapability[];
  license: string;
  refreshCadence: string;
  productionUse: "official" | "licensed" | "partner" | "demo-only";
};

export const ingestionSources: IngestionSource[] = [
  {
    key: "fda-drugs-at-fda",
    name: "FDA Drugs@FDA",
    owner: "U.S. Food and Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/",
    capabilities: ["drug-label"],
    license: "Public government reference; verify terms before automated ingestion.",
    refreshCadence: "Nightly changed-record check",
    productionUse: "official"
  },
  {
    key: "fda-orange-book",
    name: "FDA Orange Book Data Files",
    owner: "U.S. Food and Drug Administration",
    url: "https://www.fda.gov/drugs/drug-approvals-and-databases/orange-book-data-files",
    capabilities: ["generic-equivalence"],
    license: "Public government reference; verify terms before automated ingestion.",
    refreshCadence: "Weekly",
    productionUse: "official"
  },
  {
    key: "rxnorm-rxnav",
    name: "RxNorm / RxNav",
    owner: "U.S. National Library of Medicine",
    url: "https://lhncbc.nlm.nih.gov/RxNav/",
    capabilities: ["rxnorm"],
    license: "NLM API terms apply.",
    refreshCadence: "Monthly release alignment",
    productionUse: "official"
  },
  {
    key: "cms-marketplace-puf",
    name: "CMS Marketplace Public Use Files",
    owner: "Centers for Medicare & Medicaid Services",
    url: "https://www.cms.gov/marketplace/resources/data/public-use-files",
    capabilities: ["plan-metadata"],
    license: "Public government dataset; plan availability must be county/year scoped.",
    refreshCadence: "Annual open enrollment and monthly corrections",
    productionUse: "official"
  },
  {
    key: "licensed-price-partner",
    name: "Licensed pharmacy price partner",
    owner: "Partner API",
    url: "https://example.com/replace-with-price-partner",
    capabilities: ["price-feed"],
    license: "Requires commercial agreement and display compliance.",
    refreshCadence: "Hourly cache with per-market stale labels",
    productionUse: "licensed"
  }
];

export function sourceCapabilities() {
  return ingestionSources.reduce<Record<string, SourceCapability[]>>((acc, source) => {
    acc[source.key] = source.capabilities;
    return acc;
  }, {});
}
