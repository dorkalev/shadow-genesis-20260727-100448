# DSAR Runbook — Access / Correction / Erasure

## Intake and identity

Requests arrive through the published privacy channel. The data API verifies a
non-revoked Firebase ID token and requires its uid or verified email to match
the requested subject before returning or changing data. Erasure additionally
requires `auth_time` within 15 minutes. Missing/invalid tokens return 401;
authenticated subject mismatches and stale destructive authorization return
403. Never bypass these checks based on an email or reusable shared secret.

Authentication failures are retained in managed request/security logs.
Authorized and subject-mismatch DSAR actions are recorded in `audit_events`;
fulfilled export/erase outcomes are recorded in `dsar_log`.

## Fulfillment

- **Access/export:** `GET /subjects/:id/export` returns subject, consent,
  readings, and disclosures for the authenticated subject.
- **Correction:** `PUT /subjects/:id` permits only minimized declared fields.
- **Erasure:** `DELETE /subjects/:id` removes subject, consent, readings, and
  disclosures after recent reauthentication. Backups age out under the
  retention/deletion policy.

Do not record a fulfilled outcome until the operation succeeds. A partial or
failed operation is an incident/deficiency to investigate and retry safely.

## SLA and escalation

Acknowledge within 5 business days and complete within 30 days or the applicable
statutory deadline. The sole founder owns escalation, denial rationale, legal
exceptions, and communication. Link the request to its log/audit evidence
without copying exported personal data into GitHub.
