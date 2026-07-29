---
owner: dorkalev
version: 1.0
approved_by: dorkalev
review_by: 2027-07-28
criteria: CC1.4
---
# Security Training (annual, ~15 min)

1. **Phishing & social engineering** — verify sender, never enter credentials from an email link, report suspected phishing.
2. **Secrets handling** — never commit secrets; push protection will block; rotate on suspected exposure.
3. **Access & MFA** — MFA on every account; least privilege; report lost devices immediately.
4. **AI-tool data rules** — no customer PII or secrets in LLM prompts; treat AI providers as data processors.
5. **Incident reporting** — open an `incident`-labeled issue immediately; do not attempt cleanup that destroys evidence.

**Attestation:** each person records completion (date + "I have read and understood") under `evidence/people/<person>/training-2026.md`.
