import { hasActiveConsent, minimize, assembleExport, isFullyErased, isExpired, Consent } from "../src/privacy";
import assert from "node:assert";
import { test } from "node:test";

const consent: Consent = { subject_id: "a@b.co", purposes: ["service_operation"], notice_version: "2026-07-01", granted_at: "2026-01-01T00:00:00Z" };

test("P2/P3.2 consent is enforced per purpose and withdrawable", () => {
  assert.equal(hasActiveConsent(consent, "service_operation"), true);
  assert.equal(hasActiveConsent(consent, "product_analytics"), false); // not consented
  assert.equal(hasActiveConsent({ ...consent, withdrawn_at: "2026-02-01T00:00:00Z" }, "service_operation"), false);
  assert.equal(hasActiveConsent(null, "service_operation"), false);
});
test("P3.1 data minimization drops non-declared fields", () => {
  const m = minimize({ subject_id: "a@b.co", display_name: "A", ssn: "123", tracking: "x" });
  assert.deepEqual(Object.keys(m).sort(), ["display_name", "subject_id"]);
});
test("P5.1 DSAR export assembles all held data; P4.3 erasure completeness detectable", () => {
  const full = assembleExport("a@b.co", { subject_id: "a@b.co" }, consent, [{ v: 1 }], [], "2026-07-01T00:00:00Z");
  assert.equal(isFullyErased(full), false);
  const erased = assembleExport("a@b.co", null, null, [], [], "2026-07-01T00:00:00Z");
  assert.equal(isFullyErased(erased), true);
});
test("P4.2 retention window expires old records per purpose", () => {
  const now = Date.parse("2026-07-01T00:00:00Z");
  assert.equal(isExpired("2026-06-01T00:00:00Z", "service_operation", now), false); // 30d < 365
  assert.equal(isExpired("2025-01-01T00:00:00Z", "product_analytics", now), true);  // >180d
});
