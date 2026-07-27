---
owner: dorkalev
version: 1.0
approved_by: OPEN
approved_at: OPEN
review_by: 2027-07-27
criteria: CC8.1
---
# Change Management Policy

> Draft authored by the shadow. Review and approve by merging; that merge is the approval record. Until approved, this credits as *implemented*, not *verified*.

Every change is authorized by a ticket, developed on a branch, opened as a PR to `staging`, independently reviewed, tested, gated by the deterministic compliance check, merged, and archived — enforced by branch rulesets and `shadow-ci`. Production is reached only by fast-forward from `staging` via keyless CI. Emergencies use the documented hotfix procedure (incident ticket + backport PR); undocumented bypasses are detected and recorded. Full SDLC: `sdlc/SDLC.md`.
