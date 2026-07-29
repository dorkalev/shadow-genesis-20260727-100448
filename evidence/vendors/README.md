# Vendor / sub-processor DPAs & reviews (CC6.7, CC9.2)

Data Processing Agreements and security-posture references for each sub-processor. Reviewed at
least annually with the vendor register (`../../policies/vendor-register.md`). Per-vendor review
memos accrue under `../subservice/` and `reviews/` as they are performed over the period.

| Vendor | Role | DPA | SOC 2 / posture | Data shared |
|---|---|---|---|---|
| Google Cloud | Infra, datastore, logging | Google Cloud DPA (`cloud.google.com/terms/data-processing-addendum`) | SOC 2 Type II, ISO 27001 (public reports) | Customer data (hosted), logs |
| GitHub | Source control, CI/CD | GitHub DPA (`github.com/customer-terms/github-data-protection-agreement`) | SOC 2 Type II (public) | Source code; no customer PII |
| LLM provider (Anthropic / Google / OpenAI) | Code review / agent | Provider DPA; zero-retention / no-train setting where offered | Provider trust center | Public/Internal only — never Confidential |

## Notes
- DPAs above are the standard published agreements accepted on account setup; links are the
  authoritative copies. Signed/countersigned copies (where applicable) are stored with the
  owner's records, referenced here.
- The LLM-provider data boundary is enforced by `../../policies/ai-agent-use.md`
  (Public/Internal only; secrets and customer PII never sent).
- **Not yet performed (accrues over the period):** dated per-vendor review memos for the current
  cycle. Tracked as a recurring control (CTRL-12); this is operating-history, not a design gap.
