# Measurements — Data Definitions & Processing Specification (PI1.1)

**Purpose:** reference service demonstrating processing integrity end to end.

**Data definition (a Reading):** `device_id` (1–64 chars `[A-Za-z0-9_-]`), `metric` (temperature|humidity|pressure), `value` (finite number, within documented plausibility bounds per metric), `observed_at` (ISO-8601 UTC; server-assigned if absent).

**Processing specification:**
- **Input (PI1.2):** every field validated for completeness and accuracy; out-of-range or malformed input is rejected `422` with per-field reasons — no partial write.
- **Processing (PI1.3):** every ingest carries an `Idempotency-Key`; a Firestore transaction guarantees the same key is stored **once** (no double-counting). Errors are caught and returned; nothing is silently dropped.
- **Storage (PI1.5):** each record is stored with a SHA-256 `hash` of its canonical serialization, so tampering or corruption is detectable on read.
- **Output (PI1.4):** the summary recomputes every stored record's hash, reports `count/sum/avg`, and sets `integrity_ok=false` if any record failed its integrity check — output completeness and accuracy are explicit, not assumed.
