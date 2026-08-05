# shadow-genesis-20260727-100448

This repo has a machine-enforced change pipeline and readiness scaffolding —
installed by Genesis from the Shadow platform. It is readiness, not a SOC 2
report: a report requires a licensed CPA, and Type II requires evidence from an
elapsed examination period. The operating model contains exactly one human;
AI/CI identities are compensating machine controls, never fictional staff.
Run `./judgment.sh` to re-prove the pipeline and re-test criteria;
`./testimony.sh --since <date>` for the change-management self-assessment.

## Continuous readiness

The daily dashboard is deterministic and makes zero model API calls. Its
schema-v2 JSON ledger separates design readiness, live technical health,
evidence coverage, and operating maturity. Read
[`docs/readiness-ledger.md`](docs/readiness-ledger.md) for the honest path to
100%, the Drata/Vanta/auditor export contract, and the boundary between
readiness and a CPA-issued SOC 2 report.

Run `./judgment.sh --skip-pipeline` for a local snapshot. The legacy semantic
review exists only behind `--deep-llm`; it is never scheduled by default.
