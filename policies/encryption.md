---
owner: dorkalev
version: 1.0
approved_by: OPEN
approved_at: OPEN
review_by: 2027-07-27
criteria: CC6.1, CC6.7
---
# Encryption & Key Management Policy

> Draft authored by the shadow. Review and approve by merging; that merge is the approval record. Until approved, this credits as *implemented*, not *verified*.

TLS everywhere in transit; encryption at rest on all datastores and endpoints. Secrets live in a managed secret store or CI secrets — never in code (enforced by push protection). No long-lived cloud keys: deploys use Workload Identity Federation. Keys/tokens are scoped and rotated at least annually or on suspected compromise.
