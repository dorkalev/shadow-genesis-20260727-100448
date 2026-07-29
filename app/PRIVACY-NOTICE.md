# Privacy Notice (v2026-07-01)

**Who we are:** the operator of this measurements service.
**What we collect (P3.1 minimization):** your contact email (`subject_id`), an optional display name, and the device readings you submit. Nothing else.
**Why (purposes, P1/P3):** `service_operation` (running the service) and, only with your explicit consent, `product_analytics`.
**Legal basis / consent (P2):** we process personal data only under an active, per-purpose consent, which you may withdraw at any time (`DELETE /subjects/{id}/consent`).
**Your rights (P5):** access/export (`GET /subjects/{id}/export`), correction (`PUT /subjects/{id}`), and erasure (`DELETE /subjects/{id}`).
**Retention (P4.2):** service_operation data 365 days, analytics 180 days, then deleted; erasure on request is immediate.
**Disclosures (P6):** we log any disclosure of your data; request an accounting via `GET /subjects/{id}/disclosures`. We do not sell personal data.
**Breach (P6.6):** on a personal-data breach we notify affected subjects and regulators per our Incident Response Plan.
**Complaints (P8):** `POST /privacy/complaints`; we track each to resolution.
