import { createHash } from "node:crypto";
import { medicines, plans } from "../lib/sample-data";
import { ingestionSources } from "../lib/ingestion/sources";

function checksum(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

const manifest = {
  generatedAt: new Date().toISOString(),
  sourceCount: ingestionSources.length,
  medicineCount: medicines.length,
  planCount: plans.length,
  checksums: {
    sources: checksum(ingestionSources),
    medicines: checksum(medicines),
    plans: checksum(plans)
  }
};

console.log(JSON.stringify(manifest, null, 2));
