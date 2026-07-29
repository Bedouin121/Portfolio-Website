/**
 * ICD-10-CM format: one letter, two digits, optional decimal,
 * then up to four more alphanumeric characters.
 */
export const ICD10_PATTERN = /^[A-Z][0-9]{2}(\.[A-Z0-9]{1,4})?$/i;

/**
 * HCPCS Level II format: one letter A–V followed by four digits.
 */
export const HCPCS_PATTERN = /^[A-V][0-9]{4}$/i;

export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase();
}

export function matchesIcd10Format(code: string): boolean {
  return ICD10_PATTERN.test(code);
}

export function matchesHcpcsFormat(code: string): boolean {
  return HCPCS_PATTERN.test(code);
}
