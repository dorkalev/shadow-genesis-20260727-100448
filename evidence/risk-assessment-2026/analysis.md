# Risk Assessment 2026 — Analysis (drafted 2026-07-28, pending owner ratification)

> This is the documented risk analysis, drafted by the shadow from the actual system context for the owner to ratify. It is an analytical artifact, not minutes of a meeting that did not occur.

**Objectives at risk:** confidentiality, availability, and processing integrity of customer data (see `policies/objectives-and-commitments.md`).

**Method:** each risk to the objectives is rated likelihood × impact (1–4) with a treatment and owner. The full living register is `policies/risk-register.md` (8 risks: key-person, credential compromise, dependency vuln, data loss, vendor outage/breach, unauthorized change, **fraud/insider misuse (CC3.3)**, data mishandling).

**Fraud consideration (CC3.3):** insider misuse of the owner's concentrated access and payment/credential fraud were explicitly assessed (register R7). No human segregation is claimed. Mitigations are least privilege, required machine gates, complete authenticated audit trails, protected archives, periodic reconciliation, and external CPA scrutiny; residual single-person risk is accepted.

**Change-driven reassessment (CC3.4):** adopting a new vendor, a new data type, or an architecture change triggers re-analysis before the change ships.

**Ratification:** owner reviews and accepts this analysis; ratification is recorded in the quarterly oversight review.
