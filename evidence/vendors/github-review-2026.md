# Vendor Review — GitHub (2026)

**Performed:** 2026-07-29 · **Reviewer:** dorkalev · **Criteria:** CC9.2, CC6.4, P6.4

Annual review of our source-control and CI/CD sub-processor.

| Attribute | Finding |
|---|---|
| Services used | Git hosting, Actions (CI/CD), rulesets, code scanning (CodeQL), Dependabot, secret scanning |
| Data hosted | Source code + policies (Internal). **No customer personal data.** |
| **SOC 2 / attestations** | GitHub maintains **SOC 1/2 Type II** and ISO 27001; reports available under NDA via GitHub. Trust posture reviewed via GitHub Trust Center. |
| **DPA** | GitHub Data Protection Agreement in force (`github.com/customer-terms/github-data-protection-agreement`). |
| Breach notification | Per GitHub DPA terms. |
| Security features in use | Branch rulesets (PR + non-fast-forward + deletion protection), CodeQL default setup, Dependabot alerts + security updates, secret scanning + push protection. |

**Assessment:** GitHub's SOC 2 Type II covers the platform controls we depend on; we layer
our own change-management gate + archive on top. No customer PII flows to GitHub, limiting
exposure. Residual risk (R5) accepted. **No exceptions.** Next review 2027. Sign-off = merge.
