---
owner: dorkalev
version: 1.0
approved_by: OPEN
approved_at: OPEN
review_by: 2027-07-27
criteria: CC6.1, CC6.2, CC6.3
---
# Access Control Policy

> Draft authored by the shadow. Review and approve by merging; that merge is the approval record. Until approved, this credits as *implemented*, not *verified*.

Logical access requires strong authentication (MFA/SSO) on every system. Provisioning is least-privilege per `role-matrix.md`, authorized by the owner before grant, and enumerated in the onboarding runbook. Deprovisioning is same-day on departure (offboarding runbook), with a before/after grant report as evidence. Access is reviewed quarterly. Service access uses scoped, keyless identities. Physical/endpoint access: see `physical-security.md`.
