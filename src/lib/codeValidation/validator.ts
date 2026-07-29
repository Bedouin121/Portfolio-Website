import {
  normalizeCode,
  matchesIcd10Format,
  matchesHcpcsFormat,
} from "./patterns";
import type {
  CodeLookupTable,
  CodeSystem,
  ValidationResult,
  BatchValidationSummary,
} from "./types";

export function validateCode(
  rawInput: string,
  system: CodeSystem,
  lookup: CodeLookupTable
): ValidationResult {
  const normalizedCode = normalizeCode(rawInput);

  const formatOk =
    system === "ICD10"
      ? matchesIcd10Format(normalizedCode)
      : matchesHcpcsFormat(normalizedCode);

  if (!formatOk) {
    return {
      input: rawInput,
      normalizedCode,
      system,
      status: "malformed",
      description: null,
      reason:
        system === "ICD10"
          ? "Does not match ICD-10-CM structure (letter + two digits + optional decimal + up to four alphanumeric)."
          : "Does not match HCPCS Level II structure (one letter A–V followed by four digits).",
    };
  }

  const table = lookup[system];
  const description = table.get(normalizedCode);

  if (description === undefined) {
    return {
      input: rawInput,
      normalizedCode,
      system,
      status: "unknown",
      description: null,
      reason: "Correctly formatted but not found in the current code list.",
    };
  }

  return {
    input: rawInput,
    normalizedCode,
    system,
    status: "valid",
    description,
    reason: null,
  };
}

export function validateBatch(
  rawInputs: string[],
  system: CodeSystem,
  lookup: CodeLookupTable
): BatchValidationSummary {
  const results = rawInputs
    .map((r) => r.trim())
    .filter((r) => r.length > 0)
    .map((r) => validateCode(r, system, lookup));

  return {
    total: results.length,
    valid: results.filter((r) => r.status === "valid").length,
    unknown: results.filter((r) => r.status === "unknown").length,
    malformed: results.filter((r) => r.status === "malformed").length,
    results,
  };
}
