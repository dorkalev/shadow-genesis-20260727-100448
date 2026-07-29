# Vendor Review — LLM / AI Provider (2026)

**Performed:** 2026-07-29 · **Reviewer:** dorkalev · **Criteria:** CC9.2, CC6.7, P6.5

Annual review of the LLM provider used for AI-assisted development and PR review
(the first configured of Anthropic / Google / OpenAI, per `review.yml`).

| Attribute | Finding |
|---|---|
| Role | Code review + development agent |
| Data shared | **Public / Internal only** — source diffs + repo context. **Never** Confidential data, secrets, or customer PII (enforced by `policies/ai-agent-use.md`, `policies/data-handling.md`). |
| **SOC 2 / attestations** | Major LLM providers (Anthropic, Google, OpenAI) publish SOC 2 Type II reports via their trust centers; reviewed. |
| **DPA + training** | Provider DPA in force; **zero-retention / no-train-on-data** setting selected where offered (enterprise/API tiers). |
| Prompt-injection controls | Fork-PR diffs never reach an agent holding secrets (`review.yml` gates on same-repo PRs only). |
| Boundary enforcement | Data-classification tiers gate what may be sent (`data-handling.md`); confirmed no Confidential paths in code. |

**Assessment:** The provider's SOC 2 + our data-boundary policy limit exposure to
Public/Internal data with no training use. Residual risk (R5) accepted. **No exceptions.**
Next review 2027 or when the configured provider changes. Sign-off = merge.
