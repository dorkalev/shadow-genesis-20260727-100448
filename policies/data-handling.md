---
owner: dorkalev
version: 1.0
approved_by: dorkalev
approved_at: 2026-07-29
review_by: 2027-07-29
last_reviewed: 2026-07-29
criteria: CC6.5, CC6.7, C1.1, C1.2
---
# Data Handling Policy

How data is handled across its lifecycle, by classification. Complements
`data-classification.md` (what the tiers mean) and `data-retention.md` (how long we keep it).

## Classifications (summary)
- **Public** — may be disclosed freely (marketing, docs, public site).
- **Internal** — non-public operational data; not customer personal data.
- **Confidential** — secrets, credentials, and **customer personal data**.

## Handling rules by tier
| Action | Public | Internal | Confidential |
|---|---|---|---|
| Store in git | yes | yes (no secrets) | never (secrets to secret manager / CI secrets) |
| Send to an LLM vendor | yes | yes | no (see `ai-agent-use.md`) |
| Encryption at rest / transit | yes | yes | required (Google-managed encryption at rest + managed TLS; use CMEK only if separately configured and evidenced) |
| Access | all | team | least-privilege, logged |

## Removable media
**Removable media (USB drives, external disks, memory cards) is prohibited** for storing or
transporting any Internal or Confidential data. The team operates cloud-first; there is no
business need to move data onto removable media. Endpoints are configured to discourage it and
any exception requires the owner's written approval recorded on a ticket.

## Secrets
- Secrets are never committed. GitHub **secret scanning + push protection** is enabled; a
  detected secret blocks the push and is rotated.
- Runtime secrets live in CI secrets / GCP Secret Manager, never in the repo.

## Disposal
- Data past its retention window is deleted per `data-retention.md`.
- Customer erasure requests are handled by the DSAR flow (`runbooks/customer-data-deletion.md`,
  app `DELETE /subjects/:id`), which removes personal data and logs the disposal.

## Change
Changes only through the SDLC PR flow; the merge is the approval record.
