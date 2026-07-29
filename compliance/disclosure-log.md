# Disclosure Log (P6.2, P6.7)

Accounting of disclosures of personal data to third parties. The application also records
disclosures at runtime (`disclosures` Firestore collection, `GET /subjects/:id/disclosures`);
this file is the version-controlled, human-readable register reviewed with the data inventory.

_Last reviewed: 2026-07-29 · Owner: dorkalev_

| Date | Subject scope | Recipient | Purpose | Lawful basis | Notes |
|---|---|---|---|---|---|
| — | none | — | — | — | No disclosures of personal data to third parties this period. |

## Standing (recurring) data flows
These are documented in `compliance/data-inventory.yaml → sub_processors` and reviewed
annually (`evidence/vendors/`):
- **Google Cloud** — processor hosting all personal data (DPA in force).
- **GitHub** — source control; **no** customer personal data.
- **LLM provider** — Public/Internal only; **no** personal data (`policies/ai-agent-use.md`).

No sale of personal data occurs. Subject-specific disclosures, if any, are also queryable
per subject via the app endpoint. Reviewed quarterly with the risk review.
