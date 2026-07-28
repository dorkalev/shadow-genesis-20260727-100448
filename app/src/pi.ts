// Processing-integrity core. Pure functions — every PI control lives here so it
// is deterministic and unit-tested. server.ts is the thin I/O wiring around it.
import { createHash } from "crypto";

// PI1.1 — data definition: the canonical shape of a reading.
export interface Reading {
  device_id: string;
  metric: "temperature" | "humidity" | "pressure";
  value: number;
  observed_at: string; // ISO-8601 UTC
}
export const METRICS = ["temperature", "humidity", "pressure"] as const;
// documented plausibility bounds per metric (PI1.2 accuracy)
export const BOUNDS: Record<string, [number, number]> = {
  temperature: [-90, 60],
  humidity: [0, 100],
  pressure: [800, 1100],
};

export type ValidationResult =
  | { ok: true; reading: Reading }
  | { ok: false; errors: string[] };

// PI1.2 — input completeness + accuracy: reject anything incomplete/out-of-spec.
export function validate(input: unknown): ValidationResult {
  const errors: string[] = [];
  const o = (input ?? {}) as Record<string, unknown>;
  if (typeof o.device_id !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(o.device_id))
    errors.push("device_id: required, 1-64 chars [A-Za-z0-9_-]");
  if (typeof o.metric !== "string" || !METRICS.includes(o.metric as any))
    errors.push(`metric: required, one of ${METRICS.join("|")}`);
  if (typeof o.value !== "number" || !Number.isFinite(o.value))
    errors.push("value: required, finite number");
  else if (typeof o.metric === "string" && BOUNDS[o.metric] &&
           (o.value < BOUNDS[o.metric][0] || o.value > BOUNDS[o.metric][1]))
    errors.push(`value: out of plausible range for ${o.metric} ${JSON.stringify(BOUNDS[o.metric as string])}`);
  if (o.observed_at !== undefined &&
      (typeof o.observed_at !== "string" || Number.isNaN(Date.parse(o.observed_at))))
    errors.push("observed_at: if present, must be ISO-8601");
  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    reading: {
      device_id: o.device_id as string,
      metric: o.metric as Reading["metric"],
      value: o.value as number,
      observed_at: (o.observed_at as string) ?? new Date().toISOString(),
    },
  };
}

// PI1.5 — storage integrity: a canonical serialization + hash so any later read
// can prove the record was not silently altered.
export function canonical(r: Reading): string {
  return JSON.stringify({ device_id: r.device_id, metric: r.metric, value: r.value, observed_at: r.observed_at });
}
export function integrityHash(r: Reading): string {
  return createHash("sha256").update(canonical(r)).digest("hex");
}

// PI1.4 — output completeness/accuracy: a summary with an explicit completeness flag.
export interface Summary {
  device_id: string;
  count: number;
  sum: number;
  avg: number | null;
  integrity_ok: boolean; // every record's stored hash recomputed and matched
}
export function summarize(device_id: string, rows: { reading: Reading; hash: string }[]): Summary {
  const valid = rows.filter((x) => integrityHash(x.reading) === x.hash);
  const sum = valid.reduce((a, x) => a + x.reading.value, 0);
  return {
    device_id,
    count: valid.length,
    sum,
    avg: valid.length ? sum / valid.length : null,
    integrity_ok: valid.length === rows.length, // false if any stored hash failed to recompute
  };
}
