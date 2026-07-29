---
owner: dorkalev
version: 1.0
approved_by: dorkalev
approved_at: 2026-07-29
last_reviewed: 2026-07-29
review_by: 2027-07-27
criteria: CC7.3, CC7.4, CC7.5, CC2.2
---
# Incident Response Plan


**Detect:** alerts, scanner findings, bypass-merge notifications, external reports (`.well-known/security.txt`). **Evaluate:** the owner triages whether an event is a security incident and assigns severity. **Respond:** open an incident issue (label `incident`), contain, remediate through the normal or hotfix change path, and communicate to affected customers/regulators per commitments. **Recover:** restore from backups (tested via the restore-test workflow) and confirm service. **Learn:** file a postmortem within 5 business days; an annual tabletop exercise validates this plan. Records: `evidence/security-events/`, `evidence/ir-exercises/`.
