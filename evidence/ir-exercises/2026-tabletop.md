# Incident Response Tabletop — 2026

**Date:** 2026-07-29 · **Facilitator/Participant:** dorkalev · **Criteria:** CC7.3, CC7.4, CC7.5, P6.6

A tabletop walkthrough validating `runbooks/incident-response.md` against a realistic
scenario. Solo team: the owner walks the runbook end-to-end and records gaps.

## Scenario
"A Dependabot alert reports a high-severity vulnerability in a transitive dependency of the
Cloud Run service, and shortly after, error-rate on `/subjects/:id/export` spikes — a
possible exploitation attempt against personal data."

## Walkthrough vs. runbook
| Step | Runbook action | Would it work? | Gap / note |
|---|---|---|---|
| Detect | Dependabot alert + `app down`/error signals | yes | error-rate alert *policy* on `app_error_count` still to be created (metric exists) |
| Triage severity | classify SEV1–SEV3 | yes | scenario = SEV2 (contained, potential PI exposure) |
| Contain | rotate creds, roll back via hotfix path | yes | keyless WIF limits blast radius; rate limiter caps abuse |
| Remediate | fix dependency through gated PR | yes | dependency-review + CodeQL block re-introduction |
| Notify | customer/regulator per commitments | yes | SEV matrix + notification section present; templates would speed this |
| Restore | PITR / backup if data affected | yes | restore drill performed (`../restore-tests/2026-Q3.md`) |
| Postmortem | within 5 business days | yes | template in incident-response policy |

## Findings
1. Create the `app_error_count` **alert policy** (metric exists) so error-rate detection is automated. *Owner: dorkalev.*
2. Add notification **templates** (customer/regulator) to speed SEV1/SEV2 comms. *Owner: dorkalev.*

No blocking gaps: the runbook is executable end-to-end. Next tabletop 2027 or post-incident.
Approved via merge.
