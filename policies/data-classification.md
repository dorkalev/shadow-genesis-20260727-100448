---
owner: dorkalev
version: 1.0
approved_by: OPEN
approved_at: OPEN
review_by: 2027-07-27
criteria: C1.1, CC6.7
---
# Data Classification & Handling Policy

> Draft authored by the shadow. Review and approve by merging; that merge is the approval record. Until approved, this credits as *implemented*, not *verified*.

Data tiers: **Confidential** (customer data, secrets, credentials), **Internal** (source, configs), **Public** (marketing, docs). Confidential data is encrypted in transit (TLS-only) and at rest, accessible only to least-privilege identities, and never placed in code, tickets, or logs. Handling rules and the confidential-data inventory are maintained here and reviewed annually.
