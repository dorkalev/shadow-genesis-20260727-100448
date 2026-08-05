# Vendor Review — Google Cloud Platform (2026)

**Performed:** 2026-07-29 · **Reviewer:** dorkalev · **Criteria:** CC9.2, CC6.4, P6.4, P6.5

Annual review of our primary sub-processor (infrastructure, datastore, logging, monitoring).

| Attribute | Finding |
|---|---|
| Services used | Firestore (Native), Cloud Run, Cloud Logging, Cloud Monitoring, IAM/WIF, Artifact Registry |
| Data hosted | Confidential (customer readings, subjects/consent) |
| **SOC 2 / attestations** | Google Cloud maintains **SOC 1/2/3, ISO 27001/27017/27018, PCI DSS**; reports available via the Google Cloud compliance reports manager. Public SOC 3 reviewed. |
| **DPA** | Google Cloud Data Processing Addendum in force (`cloud.google.com/terms/data-processing-addendum`). |
| Breach notification | Per Google Cloud DPA — Google notifies without undue delay on a personal-data breach. |
| Sub-processors | Google publishes its sub-processor list; no additional action required. |
| Encryption | Google-managed encryption at rest and managed HTTPS in transit. No customer-managed key is claimed for this demo. |
| Region / residency | Configured in `provision/`. |

**Assessment:** Google Cloud's independent attestations cover the controls we rely on
(availability, confidentiality, security). Residual risk (R5 vendor outage/breach) is
mitigated by their SOC 2 + our backups/PITR, and accepted as inherent to SaaS reliance.
**No exceptions.** Next review 2027 or on significant change. Sign-off = merge.
