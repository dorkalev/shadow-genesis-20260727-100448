---
owner: dorkalev
version: 1.0
approved_by: dorkalev
approved_at: 2026-07-29
review_by: 2027-07-29
criteria: CC3.1, CC3.2, CC3.3, CC3.4, CC5.1, CC5.2, CC5.3
last_reviewed: 2026-07-29
---
# Control Matrix

The central map from **risks** (`risk-register.md`) to the **controls** that mitigate them,
the **Trust Services Criteria** each control addresses, its **control type**, and the
**evidence source** an auditor (or the shadow verifier) inspects to confirm it operates.
Reviewed at least annually and on significant change. This matrix is the single source of
truth CC5.1 (control selection), CC5.2 (control deployment), and CC5.3 (policy) reconcile against.

Control types: **P** = Preventive · **D** = Detective · **C** = Corrective.

| Control | Type | Statement | Mitigates | Criteria | Evidence source |
|---|---|---|---|---|---|
| CTRL-01 | P | Every change is authorized by a ticket, developed on a branch, and opened as a PR to `staging`; direct pushes to protected branches are blocked by ruleset. | R6 | CC8.1, CC6.8 | GitHub ruleset `shadow-main`/`shadow-staging`; `shadow-ci` gate run per PR |
| CTRL-02 | D | A distinct reviewer agent reviews every PR diff and posts findings; the deterministic gate blocks merge on unresolved Critical/Major findings and absent required-reviewer marker. | R3, R6 | CC8.1, CC6.8 | `review.yml` run; `reviewDecision` / reviewer marker on PR |
| CTRL-03 | P | Author cannot self-approve; the human signer merges (approval-of-record) and no bypass path exists without detection. | R6, R7 | CC6.8, CC3.3 | Merge actor ≠ author; `post-merge-archive.yml` bypass-detection record |
| CTRL-04 | D/C | Every merge writes an immutable archive record (tickets, reviewers, checks) to the `compliance-archives` branch; undocumented bypasses are flagged. | R6 | CC8.1, CC7.2 | `compliance-archives` branch records (`pr-<n>-*.json`) |
| CTRL-05 | P | Production is reached only by keyless CI (Workload Identity Federation); no long-lived cloud keys exist. | R2 | CC6.1 | GitHub deploy workflow; GCP WIF pool; no SA keys in IAM |
| CTRL-06 | P | Least-privilege IAM: human and service identities hold only roles required; no broad `owner`/`editor` on runtime SAs. | R2, R7, R8 | CC6.1, CC6.3 | `gcloud projects get-iam-policy shadow-dk-246464` |
| CTRL-07 | D | Dependency and code scanning (Dependabot alerts, CodeQL, dependency-review) run on every PR; findings triaged to remediation SLAs. | R3 | CC7.1 | `code-scanning/analyses`; `dependency-review` workflow; Dependabot config |
| CTRL-08 | P | Data at rest and in transit is encrypted (GCP default CMEK/TLS); secrets are never committed (secret scanning + push protection). | R2, R8 | CC6.1, CC6.7 | GCP encryption defaults; GitHub secret-scanning settings |
| CTRL-09 | C | Firestore automated daily backups + PITR; a restore test is performed quarterly and logged. | R4 | A1.2, A1.3, CC9.1 | `gcloud firestore backups list`; `evidence/restore-tests/` |
| CTRL-10 | D | Uptime checks and log-based metric alerts notify the owner on availability and error-rate breaches. | R4, R5 | A1.1, CC7.2 | GCP uptime checks; `gcloud alpha monitoring policies list` |
| CTRL-11 | P | Data is classified and handled per policy (incl. removable-media prohibition); retention and disposal enforced. | R8 | C1.1, C1.2, CC6.5, CC6.7 | `data-classification.md`, `data-handling.md`, app retention logic |
| CTRL-12 | P/D | Vendors (cloud, GitHub, LLM providers) are inventoried with DPAs and reviewed for SOC 2 / security posture annually. | R5 | CC9.2, CC6.7 | `vendor-register.md`; `evidence/vendors/`; `evidence/subservice/` |
| CTRL-13 | C | Incidents follow the IR runbook with defined severities (SEV1–SEV3), containment, customer/regulator notification, and postmortem; validated by annual tabletop. | R4, R5, R6 | CC7.3, CC7.4, CC7.5 | `runbooks/incident-response.md`; `evidence/ir-exercises/` |
| CTRL-14 | P | Onboarding/offboarding checklists provision and revoke access; access is reviewed quarterly. | R2, R7 | CC6.1, CC6.2, CC6.3 | `onboarding-offboarding.md`; `evidence/access-reviews/` |
| CTRL-15 | P | Agent identities carry scoped, least-privilege credentials; agents cannot approve their own changes; prompts/specs are recorded on the ticket. | R2, R6, R7 | CC6.3, CC8.1 | `ai-agent-use.md`; agent workflow token scopes |

## How this matrix is used

- **CC5.1 — control selection:** each risk in `risk-register.md` maps to ≥1 control row above; unmitigated risks are visible as risks with no `Mitigates` reference.
- **CC5.2 — deployment:** the *Evidence source* column names the exact artifact the shadow verifier tests, so "deployed" is checkable, not asserted.
- **CC5.3 — policy alignment:** every control traces to a policy in this pack; the policy pack and this matrix are re-approved annually (`last_reviewed`).
- **Change:** this file changes only through the SDLC PR flow; the merge is the approval, recorded in `compliance-archives`.
