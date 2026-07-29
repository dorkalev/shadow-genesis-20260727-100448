---
owner: dorkalev
version: 1.1
approved_by: dorkalev
approved_at: 2026-07-29
review_by: 2027-07-29
last_reviewed: 2026-07-29
criteria: CC3.1, CC3.2, CC3.3, CC3.4, CC9.1
---
# Risk Register

Rated likelihood × impact on 1–4. Reviewed at least annually and on significant change (CC3.x, CC9.1).
Fraud risk (R7) is assessed explicitly per CC3.3. Each risk maps to one or more controls in
`controls.md` (the *Controls* column); a risk with no control is an open exposure.

| ID | Risk | L | I | Treatment | Controls | Owner | Notes |
|----|------|---|---|-----------|----------|-------|-------|
| R1 | Key-person: single founder is a bus-factor of one | 3 | 4 | Mitigate | CTRL-04, CTRL-09 | dorkalev | Documented runbooks, IaC, immutable archives so work is reconstructable |
| R2 | Credential / token compromise (GitHub, cloud, LLM) | 2 | 4 | Mitigate | CTRL-05, CTRL-06, CTRL-08, CTRL-14, CTRL-15 | dorkalev | MFA, keyless WIF deploys, scoped tokens, secret scanning + push protection |
| R3 | Dependency or code vulnerability shipped to prod | 2 | 3 | Mitigate | CTRL-02, CTRL-07 | dorkalev | Dependabot, CodeQL, dependency-review, review gate, remediation SLAs |
| R4 | Data loss / corruption of primary datastore | 2 | 4 | Mitigate | CTRL-09, CTRL-10, CTRL-13 | dorkalev | Automated backups + PITR, quarterly restore test |
| R5 | Vendor outage or breach (cloud, GitHub, LLM provider) | 2 | 3 | Transfer/Accept | CTRL-10, CTRL-12, CTRL-13 | dorkalev | Vendor SOC 2 review, DPAs; inherent to SaaS reliance |
| R6 | Unauthorized/unreviewed change reaching production | 2 | 4 | Mitigate | CTRL-01, CTRL-02, CTRL-03, CTRL-04, CTRL-15 | dorkalev | Branch rulesets, deterministic gate, bypass detection |
| R7 | Fraud / insider misuse of access (CC3.3) | 1 | 4 | Mitigate | CTRL-03, CTRL-06, CTRL-14, CTRL-15 | dorkalev | Least privilege, audit trail, no self-approval, code of conduct |
| R8 | Customer-data mishandling / misconfiguration | 2 | 4 | Mitigate | CTRL-06, CTRL-08, CTRL-11 | dorkalev | Data classification, encryption, least privilege, IaC review |
