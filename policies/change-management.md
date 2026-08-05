---
owner: dorkalev
version: 1.1
approved_by: dorkalev
approved_at: 2026-08-05
last_reviewed: 2026-08-05
review_by: 2027-08-05
criteria: CC8.1
---
# Change Management Policy

Every normal change has a pre-existing ticket, a short-lived branch from
`main`, and a pull request to `main` containing Summary, Tickets, Changes, and
Test Plan. Required CI, dependency review, and deterministic compliance checks
must succeed before merge. The sole founder's authenticated merge is the
management approval-of-record; the founder may also be the author, and the
company does not claim independent human review.

Optional AI semantic review is advisory and disabled by default. It is never a
person, approver, or required daily expense. Deployment uses a restricted,
keyless GitHub Actions identity and the exact resolved container digest. The
post-merge workflow writes a new evidence record to protected
`compliance-archives`; skipped, neutral, failed, or missing required checks are
recorded as bypasses.

An authorized emergency bypass requires an incident ticket and a remediation
PR to `main` through the normal gates. History is never force-pushed or rewritten
to hide the exception. Full operating procedure: `.shadow/sdlc/SDLC.md` and
`runbooks/hotfix.md`.
