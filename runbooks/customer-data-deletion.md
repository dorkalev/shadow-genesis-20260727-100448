# Customer Data Deletion Runbook (P4.3, C1.2)

How an erasure ("right to be forgotten") request is handled end-to-end.

## Trigger
A verified data subject requests erasure, or a retention window expires
(`policies/data-retention.md`), or an account is closed.

## Procedure
1. **Verify the requester** — the request must present the subject's verification
   secret. `DELETE /subjects/:id` verifies it (`verifyRequester`, app/src/privacy.ts);
   a mismatch/missing credential is **denied (403)** with a reason. No personal data
   is deleted on an unverified request.
2. **Log** — the request and its outcome (fulfilled/denied + reason) are written to
   the `dsar_log` collection (`dsarLogEntry`), for the accounting an auditor tests.
3. **Erase** — on success, `DELETE /subjects/:id` deletes the subject doc, its
   consent, and all `readings` for that subject in a single batch.
4. **Confirm completeness** — a follow-up export must be empty of personal data
   (`isFullyErased`); backups age out per their retention (PITR window + 14-day
   backup retention), after which no copy remains.
5. **Record** — note completion on the request; disclosures already made remain in
   the disclosure log as historical fact (not personal profile data).

## SLA
Acknowledge within 5 business days; complete within 30 days (or the applicable
statutory deadline), per `policies/privacy.md` and the service commitments.

## Related
`app/src/server.ts` (endpoints), `app/src/privacy.ts` (verify + erasure logic),
`policies/data-retention.md`, `policies/privacy.md`, `runbooks/incident-response.md`.
