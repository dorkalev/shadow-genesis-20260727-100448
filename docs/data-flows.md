# Data Flows

Where data enters, rests, and leaves the system — including flows to LLM providers.
Complements `../compliance/data-inventory.yaml` and `../inventory/systems.md`.
_Last reviewed: 2026-08-05 · Owner: dorkalev_

## Primary application flow
```
client ──TLS + Firebase ID token──> Cloud Run (measurements service)
                     │  validate → idempotent write (transaction) → SHA-256 integrity hash
                     ▼
                Firestore (readings, subjects, consent, disclosures, complaints)
                     │  daily backup + PITR
                     ▼
                Firestore backups (GCP, same project)
```
- **In:** public health/docs require no identity; every data route verifies a non-revoked Firebase ID token. Subject routes require token uid/email ownership.
- **At rest:** Firestore and backups use Google-managed encryption. No claim of customer-managed encryption is made.
- **Out (customer):** DSAR export returns only the authenticated subject's data; erasure additionally requires recent authentication.

## Observability flow
```
Cloud Run / Firestore ──> Cloud Audit Logs + log-based metrics ──> alert policies ──> owner
uptime checks ──> alert policy "app down" ──> owner
```

## AI-provider (LLM) flow
```
developer / optional review agent ──> LLM provider API
   payload: source diffs + repo context (Public/Internal only)
   NEVER: customer personal data, secrets, Confidential data
   controls: policies/ai-agent-use.md; zero-retention/no-train setting where offered
```
Model review is disabled by default and is not part of the daily verifier, merge,
deploy, or production runtime. If enabled, the selected vendor is reviewed and
recorded before use. Fork-PR diffs never receive model secrets (`review.yml`).

## CI/CD flow
```
PR to main ──> deterministic gates ──> founder merges ──> keyless digest deploy (WIF) ──> Cloud Run
merge ──> compliance-archives record (tickets, reviewers, checks)
```
The founder may be author and merger; no independent person is claimed. No
long-lived cloud key crosses the boundary; the deploy identity is federated.
