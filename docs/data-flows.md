# Data Flows

Where data enters, rests, and leaves the system — including flows to LLM providers.
Complements `../compliance/data-inventory.yaml` and `../inventory/systems.md`.
_Last reviewed: 2026-07-29 · Owner: dorkalev_

## Primary application flow
```
client ──TLS──> Cloud Run (measurements service)
                     │  validate → idempotent write (transaction) → SHA-256 integrity hash
                     ▼
                Firestore (readings, subjects, consent, disclosures, complaints)
                     │  daily backup + PITR
                     ▼
                Firestore backups (GCP, same project)
```
- **In:** client requests over TLS. Personal data only via the privacy endpoints (subjects).
- **At rest:** Firestore, encrypted (CMEK). Backups encrypted.
- **Out (customer):** DSAR export returns a subject's own data after identity verification.

## Observability flow
```
Cloud Run / Firestore ──> Cloud Audit Logs + log-based metrics ──> alert policies ──> owner
uptime checks ──> alert policy "app down" ──> owner
```

## AI-provider (LLM) flow
```
developer / CI review agent ──> LLM provider API
   payload: source diffs + repo context (Public/Internal only)
   NEVER: customer personal data, secrets, Confidential data
   controls: policies/ai-agent-use.md; zero-retention/no-train setting where offered
```
LLM providers are sub-processors (see `data-inventory.yaml → sub_processors`), covered by DPAs
in `../evidence/vendors/`. Fork-PR diffs never reach an agent holding secrets (`review.yml`).

## CI/CD flow
```
PR ──> gate + reviewer agent ──> human signer merges ──> keyless deploy (WIF) ──> Cloud Run
merge ──> compliance-archives record (tickets, reviewers, checks)
```
No long-lived cloud keys cross this boundary; deploy identity is federated (WIF).
