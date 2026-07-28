// Privacy core — pure functions for consent, DSAR, retention, redaction.
// Personal data here = a Subject (contact email) that device readings attach to.
export const NOTICE_VERSION = "2026-07-01";
export const PURPOSES = ["service_operation", "product_analytics"] as const;
export type Purpose = (typeof PURPOSES)[number];

export interface Consent {
  subject_id: string;          // e.g. an email
  purposes: Purpose[];         // P2/P3.2 — explicit, per-purpose
  notice_version: string;      // which notice they consented to (P1.1)
  granted_at: string;          // ISO-8601
  withdrawn_at?: string;       // P2 — consent is withdrawable
}

// P2/P3.2 — collection/processing requires an active consent for the purpose.
export function hasActiveConsent(c: Consent | null, purpose: Purpose): boolean {
  return !!c && !c.withdrawn_at && c.purposes.includes(purpose);
}

// P3.1 — data minimization: only these fields are ever collected for a subject.
export const SUBJECT_FIELDS = ["subject_id", "display_name"] as const;
export function minimize(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of SUBJECT_FIELDS) if (input[f] !== undefined) out[f] = input[f];
  return out;
}

// P5.1 — access: assemble EVERYTHING held about a subject (DSAR export).
export interface DsarExport {
  subject_id: string;
  generated_at: string;
  subject: Record<string, unknown> | null;
  consent: Consent | null;
  readings: unknown[];
  disclosures: unknown[];
}
export function assembleExport(
  subject_id: string, subject: Record<string, unknown> | null,
  consent: Consent | null, readings: unknown[], disclosures: unknown[], now: string,
): DsarExport {
  return { subject_id, generated_at: now, subject, consent, readings, disclosures };
}

// P4.2 — retention: a record is expired if older than its purpose's retention window.
export const RETENTION_DAYS: Record<Purpose, number> = { service_operation: 365, product_analytics: 180 };
export function isExpired(recordIso: string, purpose: Purpose, nowMs: number): boolean {
  const ageDays = (nowMs - Date.parse(recordIso)) / 86_400_000;
  return ageDays > RETENTION_DAYS[purpose];
}

// P4.3 — erasure completeness: after delete, an export must be empty of personal data.
export function isFullyErased(e: DsarExport): boolean {
  return e.subject === null && e.consent === null && e.readings.length === 0;
}
