---
owner: dorkalev
version: 1.0
approved_by: dorkalev
approved_at: 2026-07-29
last_reviewed: 2026-07-29
review_by: 2027-07-27
criteria: CC6.1, CC6.2, CC6.3
---
# Access Control Policy


Logical access requires strong authentication (MFA/SSO) on every system. Provisioning is least-privilege per `role-matrix.md`, authorized by the owner before grant, and enumerated in the onboarding runbook. Deprovisioning is same-day on departure (offboarding runbook), with a before/after grant report as evidence. Access is reviewed quarterly. Service access uses scoped, keyless identities. Physical/endpoint access: see `physical-security.md`.
