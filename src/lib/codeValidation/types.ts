export type CodeSystem = "ICD10" | "HCPCS";

export type CodeStatus = "valid" | "unknown" | "malformed";

export interface CodeRecord {
  code: string;
  description: string;
}

export interface CodeLookupTable {
  ICD10: Map<string, string>;
  HCPCS: Map<string, string>;
}

export interface ValidationResult {
  input: string;
  normalizedCode: string;
  system: CodeSystem;
  status: CodeStatus;
  description: string | null;
  reason: string | null;
}

export interface BatchValidationSummary {
  total: number;
  valid: number;
  unknown: number;
  malformed: number;
  results: ValidationResult[];
}
