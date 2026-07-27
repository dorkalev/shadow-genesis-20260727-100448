---
owner: dorkalev
version: 1.0
review_by: 2027-07-27
---
# Risk Register

Rated likelihood × impact on 1–4. Reviewed at least annually and on significant change (CC3.x, CC9.1).

| ID | Risk | L | I | Treatment | Owner | Notes |
|----|------|---|---|-----------|-------|-------|
| R1 | Key-person: single founder is a bus-factor of one | 3 | 4 | Mitigate | dorkalev | Documented runbooks, IaC, immutable archives so work is reconstructable |
| R2 | Credential / token compromise (GitHub, cloud, LLM) | 2 | 4 | Mitigate | dorkalev | MFA, keyless WIF deploys, scoped tokens, secret scanning + push protection |
| R3 | Dependency or code vulnerability shipped to prod | 2 | 3 | Mitigate | dorkalev | Dependabot, CodeQL, review gate, remediation SLAs |
| R4 | Data loss / corruption of primary datastore | 2 | 4 | Mitigate | dorkalev | Automated backups + PITR, quarterly restore test |
| R5 | Vendor outage or breach (cloud, GitHub, LLM provider) | 2 | 3 | Transfer/Accept | dorkalev | Vendor SOC 2 review, DPAs; inherent to SaaS reliance |
| R6 | Unauthorized/unreviewed change reaching production | 2 | 4 | Mitigate | dorkalev | Branch rulesets, deterministic gate, bypass detection |
| R7 | Fraud / insider misuse of access (CC3.3) | 1 | 4 | Mitigate | dorkalev | Least privilege, audit trail, no self-approval, code of conduct |
| R8 | Customer-data mishandling / misconfiguration | 2 | 4 | Mitigate | dorkalev | Data classification, encryption, least privilege, IaC review |
