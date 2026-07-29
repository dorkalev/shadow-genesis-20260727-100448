# Incident Response Runbook

See `policies/incident-response.md`. Steps: open an `incident`-labeled issue → triage severity → contain → remediate via normal/hotfix change path → notify per commitments → restore if needed → postmortem within 5 business days. Annual tabletop validates this runbook.

## Severity definitions
| Severity | Definition | Response target | Customer / regulator notice |
|---|---|---|---|
| **SEV1** | Confirmed data breach, data loss, or full outage of a customer-facing service | Immediate; owner engaged within 1 hour | Notify affected customers within contractual/legal deadlines (and regulators where a personal-data breach triggers a statutory duty) |
| **SEV2** | Partial outage, degraded integrity/availability, or a security issue with contained blast radius | Same business day | Notify affected customers if service commitments are impacted |
| **SEV3** | Minor issue, no customer impact, workaround exists | Next business day | None unless it escalates |

## Notification
Customer and regulator notification obligations are defined in the service commitments
(`policies/objectives-and-commitments.md`) and privacy notice (`app/PRIVACY-NOTICE.md`).
Breaches of personal data follow the privacy policy's breach-notification path. Notification
decisions and timing are recorded on the incident issue.

## Containment → remediation
Contain (revoke credentials, isolate, roll back), remediate through the normal or hotfix change
path (never an undocumented bypass), then restore from backup/PITR if data was affected
(see `policies/bcdr.md`). File a postmortem within 5 business days; tabletop exercises and
their records accrue under `evidence/ir-exercises/`.
