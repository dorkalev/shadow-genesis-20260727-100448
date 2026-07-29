# DSAR Runbook — Access / Correction / Erasure (P5.1, P5.2, P4.3, P6.7)

How a data-subject-access request (access/export, correction, erasure) is handled, with
identity verification, SLAs, and the denial path.

## Intake
Requests arrive via the channel published in `app/PRIVACY-NOTICE.md`. Log the request date.

## 1. Verify the requester (mandatory, before any data is released)
The requester must present the subject's verification secret (`x-verification-token`).
`app/src/privacy.ts:verifyRequester` compares it constant-time and **denies by default**:
- missing secret → `missing_credential`
- no secret on file → `no_verification_on_file`
- mismatch → `credential_mismatch`
A failed verification returns **403 + reason** and is written to the `dsar_log` (denied).
**Never release or delete personal data on an unverified request.**

## 2. Fulfill
- **Access/export:** `GET /subjects/:id/export` → assembles subject + consent + readings + disclosures.
- **Correction:** `PUT /subjects/:id` → minimized fields updated (P5.2).
- **Erasure:** `DELETE /subjects/:id` → hard-deletes subject + consent + readings; verify with
  `isFullyErased`; backups age out per retention (see `runbooks/customer-data-deletion.md`).

## 3. Log & account
Every request (fulfilled or denied) is recorded in `dsar_log` with outcome + reason. Disclosures
are accounted in `compliance/disclosure-log.md` and per-subject via `GET /subjects/:id/disclosures`.

## SLA
Acknowledge within **5 business days**; complete within **30 days** (or the applicable statutory
deadline). Denials state the reason and how to re-verify. Escalation: the owner.

## Related
`policies/privacy.md`, `policies/data-retention.md`, `runbooks/customer-data-deletion.md`,
`app/src/privacy.ts`, `app/src/server.ts`.
