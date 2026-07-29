# SOC 2 Readiness Self-Assessment — 2026

**Date:** 2026-07-29 · **Assessor:** dorkalev (owner) · **Criteria:** CC4.1

An internal self-assessment of the control environment against the AICPA Trust Services
Criteria, performed with the shadow verifier against live GitHub + GCP state. This is the
management self-assessment CC4.1 expects; it is **not** a CPA examination.

## Method
For each in-scope criterion, the verifier executed its automated checks against the real
repo (default branch `main`) and cloud project, recording pass/fail/unknown with evidence.
Results render on the readiness board and drive the gauge.

## Result (as of assessment date)
- **Documents written: 100%** — full policy pack + control matrix + inventories present and current.
- **Documents approved: 100%** — every policy carries `approved_by` (owner sign-off via gated merge).
- **Controls configured (Type I): ~79%** — technical controls in place and exercised.
- Type II (operating over a period) is near-zero by construction: controls have operated for
  days, not the 3–12 months an examination period requires. No tool can fast-forward that.

## Known gaps (honest)
1. **Enforced independent approval** — `required_approving_review_count = 0`. An independent
   reviewer *does* run per PR (gate + reviewer), but an *approving* identity is pending
   (native Copilot code review is advisory/comment-only; a second approving identity or the
   reviewer App would close the enforced count). Documented, accepted interim.
2. **Operating history (Type II)** — restore test, tabletop, and periodic reviews have each
   been performed once this quarter (see `evidence/`); a full period has not yet elapsed.
3. **People evidence** — background check / training completion / policy acknowledgment for
   the sole operator are tracked in `evidence/people/`.

## Conclusion
Design and implementation (Type I) are substantially complete. The path to a Type II report
is elapsed time with the controls operating, plus a CPA examination. Reviewed and owned by
the founder; next self-assessment 2027 or on significant change.
