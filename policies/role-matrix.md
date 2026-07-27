---
owner: dorkalev
version: 1.0
approved_by: OPEN
approved_at: OPEN
review_by: 2027-07-27
criteria: CC6.3
---
# Access Role Matrix

> Draft authored by the shadow. Review and approve by merging; that merge is the approval record. Until approved, this credits as *implemented*, not *verified*.

Least-privilege grant sets per role. **Owner:** GitHub org admin, cloud IAM admin, all SaaS admin — the sole full-access role (disclosed concentration). **Engineer (future):** write to feature branches, no admin, no production deploy (deploys are keyless CI only). **Contractor (future):** scoped repo read/write, time-boxed, no admin. **CI service identities:** scoped tokens via Workload Identity Federation, no exported keys, no admin. Access is reviewed quarterly (`evidence/access-reviews/`).
