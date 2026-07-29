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

// P5.1 — requester identity verification: a DSAR (export/erase) must prove the
// requester is the data subject before any personal data is returned or deleted.
// The subject holds a per-subject verification secret (set at consent time); the
// requester presents it. Mismatch, missing, or no-secret-on-file all DENY with a
// machine-readable reason (the denial path an auditor looks for). Pure + testable.
export interface VerifyResult { ok: boolean; reason: string; }
export function verifyRequester(
  provided: string | undefined, expected: string | undefined,
): VerifyResult {
  if (!expected) return { ok: false, reason: "no_verification_on_file" };
  if (!provided) return { ok: false, reason: "missing_credential" };
  // constant-time-ish compare: equal length + char accumulation (avoid early-exit leak)
  if (provided.length !== expected.length) return { ok: false, reason: "credential_mismatch" };
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0 ? { ok: true, reason: "verified" } : { ok: false, reason: "credential_mismatch" };
}

// P5.1 — a DSAR log entry: every access/erasure request is recorded with its
// outcome (fulfilled/denied) and reason, for the accounting an auditor tests.
export interface DsarLogEntry {
  subject_id: string; action: "export" | "erase"; outcome: "fulfilled" | "denied";
  reason: string; at: string;
}
export function dsarLogEntry(
  subject_id: string, action: "export" | "erase", v: VerifyResult, at: string,
): DsarLogEntry {
  return { subject_id, action, outcome: v.ok ? "fulfilled" : "denied", reason: v.reason, at };
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
