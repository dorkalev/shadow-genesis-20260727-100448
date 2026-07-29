import { validate, integrityHash, summarize, Reading } from "../src/pi";
import assert from "node:assert";
import { test } from "node:test";

test("PI1.2 rejects incomplete/inaccurate input", () => {
  assert.equal(validate({}).ok, false);
  assert.equal(validate({ device_id: "d1", metric: "temperature", value: "NaN" }).ok, false);
  assert.equal(validate({ device_id: "d1", metric: "humidity", value: 250 }).ok, false); // out of bounds
  assert.equal(validate({ device_id: "d1", metric: "bogus", value: 1 }).ok, false);
});
test("PI1.2 accepts valid input and fills observed_at", () => {
  const v = validate({ device_id: "d1", metric: "temperature", value: 21.5 });
  assert.equal(v.ok, true);
  if (v.ok) assert.ok(v.reading.observed_at);
});
test("PI1.5 integrity hash is deterministic and change-detecting", () => {
  const r: Reading = { device_id: "d1", metric: "pressure", value: 1013, observed_at: "2026-01-01T00:00:00Z" };
  assert.equal(integrityHash(r), integrityHash({ ...r }));
  assert.notEqual(integrityHash(r), integrityHash({ ...r, value: 1014 }));
});
test("PI1.4 summary is accurate and flags integrity mismatch", () => {
  const a: Reading = { device_id: "d1", metric: "temperature", value: 10, observed_at: "2026-01-01T00:00:00Z" };
  const b: Reading = { device_id: "d1", metric: "temperature", value: 20, observed_at: "2026-01-01T01:00:00Z" };
  const good = summarize("d1", [{ reading: a, hash: integrityHash(a) }, { reading: b, hash: integrityHash(b) }]);
  assert.equal(good.count, 2); assert.equal(good.sum, 30); assert.equal(good.avg, 15); assert.equal(good.integrity_ok, true);
  const tampered = summarize("d1", [{ reading: a, hash: "deadbeef" }]);
  assert.equal(tampered.integrity_ok, false); assert.equal(tampered.count, 0);
});
