---
owner: dorkalev
version: 1.0
approved_by: OPEN
approved_at: OPEN
review_by: 2027-07-27
criteria: C1.2, CC6.5
---
# Data Retention & Disposal Policy

> Draft authored by the shadow. Review and approve by merging; that merge is the approval record. Until approved, this credits as *implemented*, not *verified*.

Retention by type: customer data per contract then deleted; logs/audit ≥ 90 days; compliance evidence ≥ the audit window + 1 year; backups per the BC/DR schedule. Disposal is deliberate and logged: datastore deletion is protection-gated; endpoint/media disposal is crypto-erased and recorded in `evidence/endpoints/wipes/`. A 'none this period' entry is a valid record when nothing was disposed.
