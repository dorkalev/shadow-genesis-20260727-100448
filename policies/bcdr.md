---
owner: dorkalev
version: 1.0
approved_by: dorkalev
approved_at: 2026-07-29
last_reviewed: 2026-07-29
review_by: 2027-07-27
criteria: CC9.1, A1.2, A1.3, CC7.5
---
# Business Continuity & Disaster Recovery Policy


Customer data is protected by automated backups with point-in-time recovery on the primary datastore (cloud runtime). Recovery objectives: RPO ≤ 24h, RTO ≤ 8h for a total-loss scenario. Restore capability is proven by the quarterly automated restore test (`restore-test.yml`), with evidence filed under `evidence/restore-tests/`. Key-person and vendor-outage risks are in the risk register with mitigations.
