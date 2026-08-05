---
owner: dorkalev
version: 1.1
approved_by: dorkalev
approved_at: 2026-08-05
last_reviewed: 2026-08-05
review_by: 2027-08-05
criteria: CC6.3
---
# Access Role Matrix


Least-privilege grant sets per role. **Owner/Founder:** GitHub repository admin,
explicit Google Cloud project-administrator roles, and required SaaS
administration — the sole human administrator (disclosed concentration), with no
primitive GCP Owner/Editor grant. **Engineer (future):** write to feature
branches, no admin, no production deploy (deploys are keyless CI only).
**Contractor (future):** scoped repository read/write, time-boxed, no admin.
**CI service identities:** scoped tokens via Workload Identity Federation, no
exported keys, no admin. Access is reviewed quarterly
(`evidence/access-reviews/`).
