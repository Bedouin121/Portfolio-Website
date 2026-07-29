/**
 * Client-side code data loader.
 * Imports the JSON at build time (Vite handles JSON imports natively).
 * No fs, no server — runs entirely in the browser.
 */
import icd10Raw from "./icd10-codes.json";
import hcpcsRaw from "./hcpcs-codes.json";
import type { CodeLookupTable, CodeRecord } from "./types";

function toMap(records: CodeRecord[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const r of records) {
    map.set(r.code.toUpperCase(), r.description);
  }
  return map;
}

// Built once, reused for every validation call.
export const codeLookup: CodeLookupTable = {
  ICD10: toMap(icd10Raw as CodeRecord[]),
  HCPCS: toMap(hcpcsRaw as CodeRecord[]),
};
