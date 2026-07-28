# Sub-service Organization Review 2026

The company carves out physical, environmental, and platform controls to two sub-service organizations and relies on their SOC 2 Type II reports (CC6.4 physical, CC9.2 vendor):

- **Cloud provider (Google Cloud / Firebase)** — hosting, datastore, physical/environmental. SOC 2 report obtained from the provider's compliance portal; reviewed annually. Complementary controls the company must operate: IAM least privilege, encryption config, backups.
- **GitHub** — source, CI, access platform. SOC 2 report obtained from GitHub's compliance page; reviewed annually.

> Reliance is documented here; the owner retrieves and files each provider's current report under `evidence/subservice/` and records the review date. Retrieval/date-of-review is the owner's step.
