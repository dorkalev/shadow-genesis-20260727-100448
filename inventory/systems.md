# System & Asset Inventory

The systems and information assets in scope for the SOC 2 description, their owner, the data
classification they handle, and where they run. Reviewed at least annually and on significant
change (CC3.2 risk identification, CC6.1 boundaries, A1.1 capacity).

_Last reviewed: 2026-07-29 · Owner: dorkalev_

| Asset | Type | Purpose | Data class | Location / provider | Owner |
|---|---|---|---|---|---|
| `dorkalev/shadow-genesis-20260727-100448` | Source repo | Application + policies + IaC | Internal | GitHub | dorkalev |
| Measurements service | Cloud Run service | Processing-integrity app (readings API) | Confidential (customer data) | GCP Cloud Run, `shadow-dk-246464` | dorkalev |
| Firestore (Native) | Datastore | Readings, subjects, consent, disclosures | Confidential | GCP Firestore, `shadow-dk-246464` | dorkalev |
| Firestore backups + PITR | Backup | Point-in-time recovery + daily backups | Confidential | GCP, `shadow-dk-246464` | dorkalev |
| GitHub Actions CI/CD | Pipeline | Gate, review, archive, keyless deploy | Internal | GitHub-hosted runners | dorkalev |
| Workload Identity Federation pool | Identity | Keyless GCP deploy from CI | Internal | GCP IAM | dorkalev |
| Cloud Audit Logs | Logging | Admin/data-access audit trail | Internal | GCP Logging | dorkalev |
| Uptime checks + alert policies | Monitoring | Availability + error-rate alerting | Internal | GCP Monitoring | dorkalev |
| Developer endpoint | Endpoint | Development workstation | Confidential (at rest) | macOS, FileVault | dorkalev |

## Boundaries
The system boundary is the GitHub repo, the GCP project `shadow-dk-246464`, and the developer
endpoint. Sub-service organizations (GitHub, Google Cloud, LLM providers) are inventoried in
`../policies/vendor-register.md` and reviewed per CC9.2 / CC6.4.

Machine-readable form: `../compliance/data-inventory.yaml`. Device roster: `devices.yaml`.
